const express = require('express')
const router = express.Router()

router.get('/', (req,res)=>{
<<<<<<< HEAD
    res.render("settings")
=======
    res.render("account")
>>>>>>> master
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

router.get('/history', async (req,res)=>{

    let orders = await models.Order.findAll({
        where: {
            userId: req.session.username.id
        }
    })
    
    res.render("history", {orders: orders})


})

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