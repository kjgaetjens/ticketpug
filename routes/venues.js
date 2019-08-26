const express = require('express')
const router = express.Router()
const axios = require('axios')



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
            let eventInfo = response.data._embedded.events.map(event=>{
                return {
                eventid: event.id,
                eventname: event.name,
                musician: event._embedded.attractions ? event._embedded.attractions[0].name : "N/A",
                musicianid: event._embedded.attractions ? event._embedded.attractions[0].id : "N/A",
                date: event.dates.start.localDate,
                time: event.dates.start.localTime,
                venue: event._embedded.venues[0].name,
                venuecity: event._embedded.venues[0].city.name,
                venuestate: event._embedded.venues[0].state.stateCode,
                venueaddress: event._embedded.venues[0].address.line1,
                venueid: event._embedded.venues[0].id,
                seatmap: event.seatmap ? event.seatmap.staticUrl : "N/A"
                }
            
            })
            let venue = eventInfo[0].venue
            console.log(venue)
            res.render("venueevents", {event: eventInfo, venueInfo: venue})
        }).catch(e=>console.log(e))
})

module.exports = router

