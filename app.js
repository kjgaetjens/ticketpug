const express = require('express')
const account = require('./routes/account')
const tickets = require('./routes/tickets')
const index = require('./routes/index')
const checkout = require('./routes/checkout')
const venues = require('./routes/venues')
const models = require('./models')
const app = express()
const path = require('path')
const PORT = process.env.PORT || 8080





app.use(express.urlencoded())
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')


app.use('/', index)
app.use('/account', account)
app.use('/concert-tickets', tickets)
app.use('/checkout', checkout)
app.use('/venues', venues)

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