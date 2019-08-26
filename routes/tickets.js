const express = require('express')
const router = express.Router()
const axios = require('axios')
const apikey= 'GgkMBDROaaG6jddcy0k07d6GGEyYG4gE'
const authenticate = require('../utils/authenticate.js')

router.get('/artist/:artistid', (req,res)=>{
    let artistid = req.params.artistid
    //Artist API
    axios.get(`https://app.ticketmaster.com/discovery/v2/events.json?classificationName=music&preferredCountry=us&attractionId=${artistid}&apikey=GgkMBDROaaG6jddcy0k07d6GGEyYG4gE`)
        .then(response => {
            let artistinfo = response.data._embedded.events.map(event => {
                return {
                    eventid: event.id,
                    eventname: event.name,
                    musician: event._embedded.attractions ? event._embedded.attractions[0].name : "N/A",
                    musicianid: event._embedded.attractions ? event._embedded.attractions[0].id : "N/A",
                    date: event.dates.start.dateTime,
                    venue: event._embedded.venues[0].name,
                    venuecity: event._embedded.venues[0].city.name,
                    venuestate: event._embedded.venues[0].state.stateCode,
                    venueaddress: event._embedded.venues[0].address.line1,
                    venueid: event._embedded.venues[0].id,
                    seatmap: event.seatmap ? event.seatmap.staticUrl : "N/A",
                    genre: event.classifications[0].genre ? event.classifications[0].genre.name : "N/A",
                    genreid: event.classifications[0].genre ? event.classifications[0].genre.id : "N/A",
                    minprice: event.priceRanges ? event.priceRanges[0].min : "N/A",
                    maxprice: event.priceRanges ? event.priceRanges[0].max : "N/A",
                }
            })
            res.render("artists", {
                artistinfo:artistinfo
        })
        .catch(error => {
            console.log(error)
        })
    //res.render("artists", {artist: "testing"} )
})
})

router.get('/artist/:artistid/bio', (req,res)=>{
    res.render("artistbio")
})


router.get('/eventinfo/:eventid', (req,res)=>{
    let eventid = req.params.eventid
    axios.get(`https://app.ticketmaster.com/discovery/v2/events/${eventid}?apikey=${apikey}&locale=en-us`)
        .then(response=>{
            
            const price=(min, max)=>{
                return Math.round(((Math.random() * (max-min) + min)*100)/100)
            }
            let eventinfo = response.data
            let randomPrices = []
            if (!response.data.priceRanges){
                let min = 50.3
                let max = 300.6
                for(let i= 0; i<21; i++){
                    randomPrices.push(price(min, max))
             }
            }else{
                let min = response.data.priceRanges[0].min
                let max = response.data.priceRanges[0].max
                for(let i= 0; i<21; i++){
                    randomPrices.push(price(min, max))
                }
            }
            res.render('event', {event:eventinfo, prices: randomPrices})
        }).catch(e=>console.log(e))
})

router.post('/eventinfo/:eventid/checkout/:price', (req,res) => {
    let price = req.params.price
    let quantity = req.body.ticketQuantity
    res.redirect(`./${price}/${quantity}`)
})

router.get('/eventinfo/:eventid/checkout/:price/:quantity', async (req,res)=>{
    let userId = req.session.userid
    let eventId = req.params.eventid
    let ticketQuantity = req.params.quantity
    let preTaxIndividual = req.params.price
    let preTaxTotal = preTaxIndividual * ticketQuantity
    //add in tax caclulation if we have time
    let postTaxTotal = preTaxTotal

    let eventApiObj = await axios.get(`https://app.ticketmaster.com/discovery/v2/events/${eventId}?apikey=GgkMBDROaaG6jddcy0k07d6GGEyYG4gE`)
    let eventName = eventApiObj.data.name
    let eventTime = eventApiObj.data.dates.start.localTime
    let eventDate = eventApiObj.data.dates.start.localDate
    let eventDateTime = (new Date(eventDate + ':' + eventTime)).toLocaleString()
    let artistName = eventApiObj.data._embedded.attractions[0].name
    let venueName = eventApiObj.data._embedded.venues[0].name
    let seatGroupChoices = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    let seatGroupRandom = Math.floor(Math.random()*26)
    let seatGroup = seatGroupChoices.substring(seatGroupRandom, seatGroupRandom+1)

    //create payment row
    let paymentinfoObj = await models.PaymentInfo.create({
        user_id: userId
    })

    let createdPaymentinfoObjId = await paymentinfoObj.dataValues.id

    //create order row 
    let orderObj = await models.Order.create({
        order_status: "created",
        quantity_total: ticketQuantity,
        pre_tax_total: preTaxTotal,
        post_tax_total: postTaxTotal,
        user_id: userId,
        payment_info_id: createdPaymentinfoObjId 
    })

    let createdOrderObjId = await orderObj.dataValues.id

    for(let i = 1; i <= ticketQuantity; i++) {
        //generate url
        let uniqueId = uuidv1()
        let qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${uniqueId}`
        //this seat isn't real
        let seat = seatGroup+(i.toString())

        //create qrcode rows
        let qrObj = await models.QRCode.create({
            url: qrCodeUrl
        })

        let createdQrObjId = await qrObj.dataValues.id
        
        //create ticket rows
        let ticketObj = await models.Ticket.create({
            event_id: eventId,
            event_name: eventName,
            event_date: eventDateTime,
            artist_name: artistName,
            venue_name: venueName,
            seat_group: seatGroup,
            seat: seat,
            pre_tax: preTaxIndividual,
            ticket_status: 'created',
            order_id: createdOrderObjId,
            qr_code_id: createdQrObjId
        })
    }

    res.redirect(`./${ticketQuantity}/${createdOrderObjId}/billing`)
})

router.get('/eventinfo/:eventid/checkout/:price/:quantity/:orderId/billing', async (req,res)=>{
    res.sendFile(rootdir + '/views/payment.html')
})

router.get('/eventinfo/:eventid/checkout/:price/:quantity/:orderId/billing/getorder', async (req,res)=>{
    let orderId = req.params.orderId
    let username = req.session.username
    let ticketQuantity = req.params.quantity
    let orderObj = await models.Order.findOne({
        where: {
            id: orderId
        },
        include:[
            {model: models.Ticket,
            as: 'Ticket'}
        ]
    })

    let checkoutObj = {
        username: username,
        ticket_price: orderObj.Ticket[0].pre_tax,
        ticket_qty: ticketQuantity,
        pre_tax_total: orderObj.dataValues.pre_tax_total,
        post_tax_total: orderObj.dataValues.post_tax_total,
        tax: orderObj.dataValues.post_tax_total - orderObj.dataValues.pre_tax_total,
        seat_group: orderObj.Ticket[0].seat_group,
        event_name: orderObj.Ticket[0].event_name,
        event_date: orderObj.Ticket[0].event_date,
        event_location: orderObj.Ticket[0].venue_name,
    }
    res.json(checkoutObj)
})

router.post('/eventinfo/:eventid/checkout/:price/:quantity/:orderId/billing', async (req, res) => {
    let userId = req.session.userid
    let orderId = req.params.orderId
    //make sure I can actually pull these
    let orderEmail = req.body.emailInput
    let orderPhone = req.body.phoneInput

    let orderObj = await models.Order.findOne({
        where: {
            id: orderId
        }
    })

    //update order row
    let processOrder = await models.Order.update(
        {
            order_status: 'processing',
            order_email: orderEmail,
            order_phone: orderPhone
        },
        {
            where: {id: orderId} 
        }
    )

    //update ticket rows
    let processTickets = await models.Ticket.update(
        {
            ticket_status: 'purchased'
        },
        {
            where: {order_id: orderId} 
        }
    )

    //update order row
    let processedOrder = await models.Order.update(
        {
            order_status: 'processed'
        },
        {
            where: {id: orderId} 
        }
    )
    //send an email if time
    res.redirect(`./confirmation`)
})

router.get('/eventinfo/:eventid/checkout/:price/:quantity/:orderId/confirmation', async (req,res)=>{
    let orderId = req.params.orderId
    let orderObj = await models.Order.findOne({
        where: {
            id: orderId
        },
        include:[
            {model: models.Ticket,
            as: 'Ticket'}
        ]
    })
    let confirmationObj = {
        email: orderObj.order_email,
        id: orderObj.id,
        status: orderObj.order_status,
        event_name: orderObj.Ticket[0].event_name,
        ticket_qty: orderObj.quantity_total,
        ticket_price: orderObj.Ticket[0].pre_tax,
        pre_tax_total: orderObj.pre_tax_total,
        post_tax_total: orderObj.post_tax_total,
        event_date: orderObj.Ticket[0].event_date,
        venue_name: orderObj.Ticket[0].venue_name,
        artist_name: orderObj.Ticket[0].artist_name
    }
    res.render("confirmation", {confirmation: confirmationObj})
})


router.post('/like', authenticate, (req, res) => {
    models.Favorite.findAll({
        where: {
            user_id: req.session.userid,
            event_id: req.body.event_id
        }
    }).then(favorites => {
        if (favorites.length == 0){
            const like = models.Favorite.build({
            event_id: req.body.event_id,
            event_name: req.body.event_name,
            venue_name: req.body.venue_name,
            event_date: req.body.event_date,
            user_id: req.session.userid
            })
            like.save().then(function(like){
            //console.log(like)  
            })  
        }else{
            models.Favorite.destroy({
                where: {
                    user_id: req.session.userid,
                    event_id: req.body.event_id
                }
            }).then(result => console.log(result))
        }

    })

    
    res.redirect('back')    
    })





    

module.exports = router