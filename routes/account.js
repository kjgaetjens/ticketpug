const express = require('express')
const router = express.Router()
const models = require('../models')

router.get('/', (req,res)=>{

    res.render("settings", {username: 'Welcome Username!'})
})

router.get('/payment', (req,res)=>{
    user_id = 3
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


    res.render('payment', {payments: paymentInfo})    
    });


    
})



// router.get('/history', async (req,res)=>{

//     let orders = await models.Order.findAll({
        
        
//         where: {
//             user_id: 3
//         }
//     })
//     if(orders = {}){
//         res.render("history", {orders: 'There are no orders to display'})
//     }else{
    
//     res.render("history", {orders})
//     }     

// })

router.get('/history', async(req, res)=> {
    user_id = 3
    models.Order.findAll({
        where: {
            user_id: user_id,
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
                eventName: order.Ticket[0].event_name,
                ticketCount: order.Ticket.length,
                eventDate: order.Ticket[0].event_date,
            })
        });

        //res.render('history', {orders: ordersView,})

        let pastTickets = ordersView.filter(function(orders){
            return (orders.eventDate < new Date());
        })
        console.log(new Date())
        //ordersView.filter(order => order.eventDate <= order.today);
        console.log(pastTickets)
        res.render('history', {
            orders: ordersView,
            //pastOrders: pastTickets
        })
    })
})

                
         
            
        
        
    
        



// router.get('/orderhistory', (req, res)=> {
//     models.User.findAll({
//         //where: {user_id: 3},
//         include:[
//             {model: models.Order,
//             as: 'Order',
//             include:[
//                 {model: models.Ticket,
//                 as: 'Ticket'}

//             ]
//             }
//         ]
//         }).then(users => {
//         const resObj = users.map(user => {
//             //tidy user data
//             return Object.assign(
//                 {},
//                 {
//                     user_id: user.id,
//                     username: user.username,
//                     orders: user.Order.map(order => {
                        
//                         //clean up order data
//                         return Object.assign(
//                             {},
//                             {
//                                 user_id: order.user_id,
//                                 order_id: order.id,
//                                 order_total: order.post_tax_total,
//                                 tickets: order.Ticket.map(ticket => {

//                                     //clean up ticket data
//                                     return Object.assign(
//                                         {},
//                                         {
//                                             order_id: ticket.order_id,
//                                             event_name: ticket.event_name,
//                                             seat_number: ticket.seat,
//                                             event_date: ticket.event_date,
//                                         }
//                                     )
//                                 })
//                             }
//                         )
//                     }
//                         )
//                 }
//             )
//         })
//         res.json(resObj)
//         }) 
        
//     })

// let tickets = models.Ticket.findAll({
//     where: {
//         order_id: 7,
//     }
// }).then((ticket) => console.log(ticket))




// let qrcode = models.QRCode.build({
//     url: 'https://randomqr.com/'
// })
// qrcode.save()


// let ticket = models.Ticket.build({
//     event_id: '123456',
//     event_name: 'The Rolling Stones',
//     event_date: '06-30-2019',
//     artist_name: 'Beyonce',
//     venue_name: 'NRG',
//     seat_group: '1',
//     seat: '11',
//     class: '2',
//     pre_tax: 50.04,
//     ticket_status: 'Complete',
//     qr_code_id: 1,
//     order_id: 22,
// })
// ticket.save()


// let order = models.Order.build({
//     order_status: 'Complete',
//     processed_date: '2019-06-23 00:14:16.334+00',
//     quantity_total: 1,
//     pre_tax_total: 50.05,
//     post_tax_total: 75,
//     payment_info_id: 2,
//     user_id: 3,
// })
// order.save()

// let payment = models.PaymentInfo.build({
//     favorite: true,
//     full_name: "John Doe",
//     card_number: "12345",
//     exp_month: 04,
//     exp_year: 2023,
//     cvv: 444,
//     country: "USA",
//     address1: '1234 Main St',
//     address2: 'Apt 4',
//     city: 'Houston',
//     state: 'TX',
//     zipcode: 77014,
//     user_id: 3
// })
// payment.save()


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