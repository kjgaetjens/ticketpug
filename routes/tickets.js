const express = require('express')
const router = express.Router()
const axios = require('axios')


router.get('/genre/:genreid', (req,res)=>{
    let genreid = req.params.genreid
    //Genre API
    axios.get(`https://app.ticketmaster.com/discovery/v2/events.json?classificationName=music&preferredCountry=us&genreid=${genreid}&apikey=GgkMBDROaaG6jddcy0k07d6GGEyYG4gE`)
        .then(response => {
            let genreinfo = response.data._embedded.events.map(event => {
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
                    nimprice: event.priceRanges ? event.priceRanges[0].min : "N/A",
                    maxprice: event.priceRanges ? event.priceRanges[0].max : "N/A"
                }
            })
        })
        .catch(error => {
            console.log(error)
        })
    res.render('genre')
})

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
        })
        .catch(error => {
            console.log(error)
        })
    res.render("artists", {artist: "testing"} )
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
                    venuecity: event._embedded.venues[0].city.name,
                    venuestate: event._embedded.venues[0].state.stateCode,
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

module.exports = router

