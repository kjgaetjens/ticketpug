const express = require('express')
const account = require('./routes/account')
const tickets = require('./routes/tickets')
const index = require('./routes/index')
const checkout = require('./routes/checkout')
const venues = require('./routes/venues')
const models = require('./models')
const app = express()
const path = require('path')
const axios = require('axios')
const PORT = process.env.PORT || 8080





app.use(express.urlencoded())
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')


app.use('/', index)
app.use('/account', account)
app.use('/concert-tickets', tickets)
app.use('/checkout', checkout)
app.use('/venues', venues)


//All concert API
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
        console.log(eventinfo)
    })
    .catch(error => {
        console.log(error)
    })

//Genre API
axios.get('')
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
        console.log(genreinfo)
    })
    .catch(error => {
        console.log(error)
    })

//Artist API
axios.get('')
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
        console.log(artistinfo)
    })
    .catch(error => {
        console.log(error)
    })

const user = models.User.build({
    username: 'testusername',
    password: 'testpassword',
    status: 'active'
})

const paymentinfo = models.PaymentInfo.build({
    exp_year: 2000,
    cvv: 222,
    user_id: 1
})

console.log('now finding the payment info')
models.PaymentInfo.findOne({
    include: [
        {
            model: models.User,
            as : 'User'
        }
    ]
}).then(function(PaymentInfo){
    console.log(PaymentInfo.User)
})

app.listen(PORT, ()=>{
    console.log('running')
})