const express = require('express')
const account = require('./routes/account')
const tickets = require('./routes/tickets')
const index = require('./routes/index')
const checkout = require('./routes/checkout')
const venues = require('./routes/venues')
const app = express()
const PORT = 3000

app.use('/', index)
app.use('/account', account)
app.use('/concert-tickets', tickets)
app.use('/checkout', checkout)
app.use('/venues', venues)


app.set('view engine', 'pug')



app.listen(PORT, ()=>{
    console.log('running')
})