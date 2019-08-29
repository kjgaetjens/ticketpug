const express = require('express')
const router = express.Router()
const axios = require('axios')
const apikey = '7elxdku9GGG5k8j0Xm8KWdANDgecHMV0'

router.get('/', (req,res)=>{
    axios.get(`https://app.ticketmaster.com/discovery/v2/venues?apikey=${apikey}&locale=*&countryCode=US`)
    .then(response=>{
        let venues = response.data._embedded.venues
        console.log(venues)
        res.render('venueindex', {venues:venues})
    })
})

router.get('/:venueid/details', (req, res)=>{
    let venueId = req.params.venueid
    axios.get(`https://app.ticketmaster.com/discovery/v2/venues/${venueId}?apikey=GgkMBDROaaG6jddcy0k07d6GGEyYG4gE`)
    .then(response => {
        let venueInfo = response.data
        console.log(venueInfo)
        res.render('venues',{venue: venueInfo})
    })
    .catch(e=>console.log(e))
})


router.get('/:venueid/events', (req,res)=>{
    let venueId = req.params.venueid
    axios.get(`https://app.ticketmaster.com/discovery/v2/events?apikey=GgkMBDROaaG6jddcy0k07d6GGEyYG4gE&venueId=${venueId}&locale=*&classificationName=music`)
        .then(response =>{
            let eventInfo = response.data._embedded.events
            let venue = eventInfo[0]._embedded.venues[0]
            console.log(venue)
            console.log(eventInfo)
            res.render("venueevents", {event: eventInfo, venue: venue})
            }).catch(e=>res.render('venueevents'))
        })
module.exports = router

