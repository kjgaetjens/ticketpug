const express = require('express')
const router = express.Router()

router.get('/:venueid/tickets', (req, res)=>{
    res.send("testing venuetickets")
})

router.get('/:venueid/seating-chart', (req,res)=>{
    res.send("testing seating chart")
})

module.exports = router

