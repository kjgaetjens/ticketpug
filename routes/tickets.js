const express = require('express')
const router = express.Router()
const axios = require('axios')

router.get('/genre/:genreid', (req,res)=>{
    res.render('genre')
})

router.get('/artist/:artistid', (req,res)=>{
    res.render("artists", {artist: "testing"} )
})

router.get('/artist/:artistid/bio', (req,res)=>{
    res.render("artistbio")
})

router.get('/eventinfo/:eventid', (req,res)=>{
    res.render("event")
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
    res.render("billing")
})

///eventinfo/:eventid/seatgroup/:seatgroupid/:quantity/checkout
router.post('/eventinfo/:eventid/seatgroup/:seatgroupid/:quantity/checkout/billing', async (req, res) => {
    /*
    need to add await here that takes payment info and resolves payment before actually generating the order and ticket db rows I think. once that's done, do the stuff below
    */
    let eventId = req.params.eventid
    let seatGroupId = req.params.seatgroupid
    let ticketQuantity = req.params.quantity
    let eventApiObject = await axios.get(`https://app.ticketmaster.com/discovery/v2/events/${eventId}?apikey=GgkMBDROaaG6jddcy0k07d6GGEyYG4gE`)
    let eventName = eventApiObject.data.name
    let eventDate = eventApiObject.data.dates.start.dateTime
    let eventTimeZone = eventApiObject.data.dates.timezone
    let artistName = eventApiObject.data._embedded.attractions[0].name
    let venueName = eventApiObject.data._embedded.venues[0].name
    /*
    pull user from session
    */
    /*
    current page should have paymentinfo id somehow
    */
    /*
    calc:
    min price / max price (may need product id and another api call) * (1.seatgroup) (but what if seat groups go above 10?)
    pre-tax individual price
    pre-tax total
    post-tax total
    */
    //create order row 
    res.send('test')
})

router.get('/eventinfo/:eventid/seatgroup/:seatgroupid/:quantity/checkout/confirmation', (req,res)=>{
    res.send("confirmation")
})




module.exports = router

