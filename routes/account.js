const express = require('express')
const router = express.Router()
const models = require('../models')

router.get('/', (req,res)=>{
    res.render("settings", {username: 'Welcome Username!'})
})

router.get('/payment', (req,res)=>{
    res.render('payment')
})

router.get('/tickets', (req,res)=>{
    res.send("testing tickets")
})


router.get('/tickets/:ticketid', (req,res)=>{
    res.send("testing")
})
/*
router.get('/history', async (req,res)=>{

    let orders = await models.Order.findAll({
        
        
        where: {
            userId: req.session.user.id
        }


    })
    if(orders = {}){
        res.render("history", {orders: 'There are no orders to display'})
    }else{
    
    res.render("history", {orders})
    }     

})
*/

// let qrcode = models.QRCode.build({
//     url: 'https://randomqr.com/'
// })
// qrcode.save()


// let ticket = models.Ticket.build({
//     event_id: '123456',
//     event_name: 'Pitbull',
//     event_date: '08-31-2019',
//     artist_name: 'Pitbull',
//     venue_name: 'LA Place',
//     seat_group: '1',
//     seat: '3',
//     class: '2',
//     pre_tax: 50.04,
//     ticket_status: 'Complete',
//     qr_code_id: 1,
//     order_id: 1,
// })
// ticket.save().then((persistedTicket) => {
//     console.log(persistedTicket)
// })
// let order = models.Order.build({
//     order_status: 'Complete',
//     processed_date: '2019-08-22 00:14:16.334+00',
//     quantity_total: 1,
//     pre_tax_total: 50.05,
//     post_tax_total: 75
// })
// order.save()

// favorite: DataTypes.BOOLEAN,
// full_name: DataTypes.STRING,
// card_number: DataTypes.INTEGER,
// exp_month: DataTypes.INTEGER,
// exp_year: DataTypes.INTEGER,
// cvv: DataTypes.INTEGER,
// country: DataTypes.STRING,
// address1: DataTypes.STRING,
// address2: DataTypes.STRING,
// city: DataTypes.STRING,
// state: DataTypes.STRING,
// zipcode: DataTypes.STRING



router.post('/delete-payment', (req, res) => {
    let paymentId = parseInt(req.body.paymentInfo)

    models.PaymentInfo.destroy({
        where: {
            id: paymentId 
        }
    })
    res.redirect('/payment')
})


//NO ENCRYPTION IMPLEMENTED
router.post('/add-payment', async (req, res) => {
	let full_name = req.body.full_name
	let card_number = parseInt(req.body.card_mumber)
	let cvv = parseInt(req.body.cvv)
	let exp_month = parseInt(req.body.exp_month)
	let exp_year = parseInt(req.body.exp_year)
    let address1 = req.body.address1
    let address2 = req.body.address2
	let city = req.body.city
	let state = req.body.state
	let zipcode = parseInt(req.body.zipcode)
    let user_id = req.session.user.userid
    let country = req.body.country

	let payment = models.Payment.build({
		full_name: full_name, 
        card_number: card_number,
        cvv: cvv,
        exp_month: exp_month,
        exp_year: exp_year,
        address1: address1,
        address2: address2,
        city: city,
        state: state,
        zipcode: zipcode,
        country: country,
        user_id: user_id

}) 
    let persistedpayment =  await payment.save()
		if(persistedpayment != null) {
            res.render({message: "Saved"})
    } else {
        res.render({message: "Unable to verify information"})
    }

})


module.exports = router