const express = require('express')
const router = express.Router()
const axios = require('axios')
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
    //Event API
    axios.get(`https://app.ticketmaster.com/discovery/v2/events.json?classificationName=music&preferredCountry=us&id=${eventid}&apikey=GgkMBDROaaG6jddcy0k07d6GGEyYG4gE`)
        .then(response => {
            let eventinfo = response.data._embedded.events.map(event => {
                return {
                    eventid: event.id,
                    eventname: event.name,
                    musician: event._embedded.attractions ? event._embedded.attractions[0].name : "N/A",
                    musicianid: event._embedded.attractions ? event._embedded.attractions[0].id : "N/A",
                    date: event.dates.start.dateTime,
                    venue: event._embedded.venues[0].name,
                    // venuecity: event._embedded.venues[0].city.name,
                    // venuestate: event._embedded.venues[0].state.stateCode,
                    venueaddress: event._embedded.venues[0].address.line1,
                    venueid: event._embedded.venues[0].id,
                    seatmap: event.seatmap ? event.seatmap.staticUrl : "N/A",
                    genre: event.classifications[0].genre ? event.classifications[0].genre.name : "N/A",
                    genreid: event.classifications[0].genre ? event.classifications[0].genre.id : "N/A",
                    nimprice: event.priceRanges ? event.priceRanges[0].min : "N/A",
                    maxprice: event.priceRanges ? event.priceRanges[0].max : "N/A"
                }
            })
            res.render("event", {
                eventinfo:eventinfo
            })
        })
        .catch(error => {
            console.log(error)
        })
            //res.render("event")
        })

router.get('/eventinfo/:eventid/seatgroup', (req,res)=>{
    res.render("seat")
})

router.post('/eventinfo/:eventid/seatgroup/:seatgroupid/:quantity', (req,res)=>{
    res.redirect('./checkout') //will this actually work?
})

router.get('/eventinfo/:eventid/seatgroup/:seatgroupid/:quantity/checkout', (req,res)=>{
    res.render("checkout")
})

router.get('/eventinfo/:eventid/seatgroup/:seatgroupid/:quantity/checkout/billing', (req,res)=>{
    //need to generate the cost info and send it client side somehow
    res.sendFile(rootdir + '/views/payment.html')
})

//concert-tickets/eventinfo/:eventid/seatgroup/:seatgroupid/:quantity/checkout
router.post('/eventinfo/:eventid/seatgroup/:seatgroupid/:quantity/checkout/billing', async (req, res) => {
    let userId = req.session.userid
    let eventId = req.params.eventid
    let seatGroupId = req.params.seatgroupid
    let ticketQuantity = Number(req.params.quantity)
    let paymentinfoId = 2
    let eventApiObj = await axios.get(`https://app.ticketmaster.com/discovery/v2/events/${eventId}?apikey=GgkMBDROaaG6jddcy0k07d6GGEyYG4gE`)
    let eventName = eventApiObj.data.name
    let eventTime = eventApiObj.data.dates.start.localTime
    let eventDate = eventApiObj.data.dates.start.localDate
    let eventDateTime = (new Date(eventDate + ':' + eventTime)).toLocaleString()
    let artistName = eventApiObj.data._embedded.attractions[0].name
    let venueName = eventApiObj.data._embedded.venues[0].name
    let randomTicketPrice = Math.floor((Math.random()*250)+50)
    let preTaxIndividual = randomTicketPrice
    let preTaxTotal = randomTicketPrice * ticketQuantity
    //add in tax caclulation if we have time
    let postTaxTotal = preTaxTotal

    //create order row 
    let orderObj = await models.Order.create({
        order_status: "processing",
        quantity_total: ticketQuantity,
        pre_tax_total: preTaxTotal,
        post_tax_total: postTaxTotal,
        user_id: userId,
        payment_info_id: paymentinfoId 
    })

    let createdOrderObjId = await orderObj.dataValues.id

    for(let i = 1; i <= ticketQuantity; i++) {
        //generate url
        let uniqueId = uuidv1()
        let qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${uniqueId}`
        //this seat isn't real either
        let seat = seatGroupId+(i.toString())

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
            seat_group: seatGroupId,
            seat: seat,
            pre_tax: preTaxIndividual,
            ticket_status: 'purchased',
            order_id: createdOrderObjId,
            qr_code_id: createdQrObjId
        })
    }

    //update order row
    let processedOrder = await models.Order.update(
        {
            order_status: 'processed'
        },
        {
            where: {id: createdOrderObjId} 
        }
    )
    //send an email if time
    res.redirect(`/concert-tickets/${createdOrderObjId}/confirmation`)
})

router.get('/:createdOrderObjId/confirmation', async (req,res)=>{
    let orderId = req.params.createdOrderObjId
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
        username: req.session.username,
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