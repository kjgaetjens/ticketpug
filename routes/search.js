const express = require('express')
const router = express.Router()
const models = require('../models')
const apikey = 'GgkMBDROaaG6jddcy0k07d6GGEyYG4gE'
const queryString= require('querystring')
const axios = require('axios')


router.get('/', async (req,res)=>{
    let search= req.query.eventSearch
    

    axios.get(`https://app.ticketmaster.com/discovery/v2/events?apikey=${apikey}&keyword=${search}&locale=*&classificationName=music&countryCode=US`)
    .then(response =>{
       let eventinfo =response.data._embedded.events
       console.log(eventinfo)
       
       res.render('search', {event: eventinfo, result: search})
    }).catch(e=>res.render("search", {message: "No upcoming events in the U.S.", name: search}))

    })




module.exports = router