const express = require('express')
const account = require('./routes/account')
const tickets = require('./routes/tickets')
const index = require('./routes/index')
const venues = require('./routes/venues')
const search = require('./routes/search')
global.models = require('./models')
const app = express()
const path = require('path')
const axios = require('axios')
//const PORT = process.env.PORT || 3000
const session = require('express-session')
global.uuidv1 = require('uuid/v1')
const authenticate = require('./utils/authenticate.js')
global.rootdir = __dirname

app.use('/public',express.static('public'))

app.use(express.json())

//added authenticate to own folder
// function authenticate(req,res,next){
//     if (req.session){
//         if (req.session.username){
//             next()
//         }else{
//             res.redirect('/')
//         }
//     }
// }
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false
  }))

app.use(express.static('static'))


app.use(express.urlencoded())
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')


app.use('/', index)
app.use('/account', authenticate, account)
app.use('/concert-tickets/eventinfo/:eventid/checkout/:price/:quantity', authenticate, tickets)
app.use('/concert-tickets', tickets)
app.use('/venues', venues)
app.use('/search', search)

//app.all('/account/*', authenticate)

// All concert API
axios.get('https://app.ticketmaster.com/discovery/v2/events.json?classificationName=music&preferredCountry=us&apikey=GgkMBDROaaG6jddcy0k07d6GGEyYG4gE')
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
                minprice: event.priceRanges ? event.priceRanges[0].min : "N/A",
                maxprice: event.priceRanges ? event.priceRanges[0].max: "N/A",
            }
        })
        //console.log(eventinfo)
    })
    .catch(error => {
        console.log(error)
    })


app.listen(3000, ()=>{
    console.log('running')
})