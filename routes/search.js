const express = require('express')
const router = express.Router()
const models = require('../models')
const apikey = 'GgkMBDROaaG6jddcy0k07d6GGEyYG4gE'
const queryString= require('querystring')
const axios = require('axios')


router.get('/', async (req,res)=>{
    let search= req.query.eventSearch
    

    axios.get(`https://app.ticketmaster.com/discovery/v2/events?apikey=${apikey}&keyword=${search}&locale=*&classificationName=music`)
    .then(response =>{
       let eventinfo =response.data._embedded.events

    //    eventinfo.map(event=>{
    //     return{
    //                 eventid: event.id,
    //                 eventname: event.name,
    //                 musician: event._embedded.attractions ? event._embedded.attractions[0].name : "N/A",
    //                 musicianid: event._embedded.attractions ? event._embedded.attractions[0].id : "N/A",
    //                 date: event.dates.start.dateTime,
    //                 venue: event._embedded.venues[0].name,
    //                 venuecity: event._embedded.venues[0].city.name
    //             }
    //         })
       console.log(eventinfo)
       
       res.render('search', {event: eventinfo, result: search})
    })

    })




module.exports = router