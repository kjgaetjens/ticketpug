const express = require('express')
const router = express.Router()
const models = require('../models')

router.get('/', (req,res)=>{
    let user_id = req.session.userid
    models.User.findByPk(user_id)
    .then((user) => {

    res.render("settings", {username: req.session.username})
})
})

router.get('/payment', (req,res)=>{
    user_id = req.session.userid
    models.PaymentInfo.findAll({
        where:{
            user_id: user_id,
        }
    }).then((payments) => {
        let paymentInfo = [];
        payments.forEach(payment => {
            paymentInfo.push({
                full_name: payment.full_name,
                exp_month: payment.exp_month,
                exp_year: payment.exp_year,

            })
        })


    res.render('payment', {payments: paymentInfo, username: req.session.username})    
    });


    
})




router.get('/history', async(req, res)=> {
    user_id = req.session.userid
    models.Order.findAll({
        where: {
            user_id: user_id,
            order_status: 'processed'
        },
        include:[
            {model: models.Ticket,
            as: 'Ticket'}
            ]
    }).then(orders => {
        // create array for view
        let ordersView = [];
        
        // loop through each order and create new view item
        orders.forEach(order => {
            ordersView.push({
                total: order.post_tax_total,
                id: order.id,
                eventName: order.Ticket[0].artist_name,
                ticketCount: order.Ticket.length,
                eventDate: order.Ticket[0].event_date,
                newDate: Date.parse(order.Ticket[0].event_date),
                //event_date_format: (order.Ticket[0].event_date).substring(0,10),
                purchased_date: order.processed_date,
                

            })
            //console.log((order.Ticket[0].event_date).substring(0,10))
        });

        let currentDate = new Date()
        currentDate = Date.parse(currentDate)


        let pastTickets = ordersView.filter(function(orders){
            return (orders.newDate < currentDate);
        })

        let currentOrders = ordersView.filter(function(orders){
            return (currentDate < orders.newDate);
        })


        //ordersView.filter(order => order.eventDate <= order.today);
        //console.log(pastTickets)
    res.render('history', {orders: currentOrders, pastOrders: pastTickets, username: req.session.username})
    })
    
    })





router.get('/favorites', async(req, res) => {
    user_id = req.session.userid
    models.Favorite.findAll({

        where:{
            user_id: user_id,
        }
    }).then(favorites => {
        let favoritesView = []

        favorites.forEach(favorite => {
            favoritesView.push({
                event_id: favorite.event_id,
                event_name: favorite.event_name,
                event_date: favorite.event_date,
                venue_name: favorite.venue_name
            
            })
        });
        //console.log(favorite.event_date)
        
        res.render('favorites', {favorites: favoritesView, username: req.session.username})
    })
})
                
router.post('/delete-favorite', async(req, res) => {
    user_id = req.session.userid
    event_id = req.body.event_id
    models.Favorite.destroy({
        where: {
            user_id: user_id,
            event_id: event_id
        }

    }).then(result => console.log(result))

    res.redirect('back') 
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
// router.post('/add-payment', async (req, res) => {
// 	let full_name = req.body.full_name
// 	let card_number = parseInt(req.body.card_mumber)
// 	let cvv = parseInt(req.body.cvv)
// 	let exp_month = parseInt(req.body.exp_month)
// 	let exp_year = parseInt(req.body.exp_year)
//     let address1 = req.body.address1
//     let address2 = req.body.address2
// 	let city = req.body.city
// 	let state = req.body.state
// 	let zipcode = parseInt(req.body.zipcode)
//     let user_id = req.session.userid
//     let country = req.body.country

// 	let payment = models.Payment.build({
// 		full_name: full_name, 
//         card_number: card_number,
//         cvv: cvv,
//         exp_month: exp_month,
//         exp_year: exp_year,
//         address1: address1,
//         address2: address2,
//         city: city,
//         state: state,
//         zipcode: zipcode,
//         country: country,
//         user_id: user_id

// }) 
//     let persistedpayment =  await payment.save()
// 		if(persistedpayment != null) {
//             res.render({message: "Saved"})
//     } else {
//         res.render({message: "Unable to verify information"})
//     }

// })


module.exports = router