const express = require('express')
const router = express.Router()


router.get('/', (req,res)=>{
    res.render("checkout")
})

router.get('/billing', (req,res)=>{
    res.render("billing")
})

///eventinfo/:eventid/seatgroup/:seatgroupid/:quantity/checkout
router.post('/billing', (req, res)=>{
    /*
    need to add await here that takes payment info and resolves payment before actually generating the order and ticket db rows I think. once that's done, do the stuff below
    */
    let eventId = req.params.eventid
    let seatGroupId = req.params.seatgroupid
    let ticketQuantity = req.params.quantity
    /*
    use api to pull some info like venue id or do/should i need to pass those through params? may be just remove those columns fom the tickets table and use the event_id to get the relevant info for the ticket generation
    */
    /*
    calc:
    pre-tax individual price
    pre-tax total
    post-tax total
    */
    //create order row 
    res.send('test')
})

router.get('/confirmation', (req,res)=>{
    res.send("confirmation")
})

//assign random seats
//assign randomish pre tax price
//determin sums and post tax price

module.exports = router
