const express = require('express')
const router = express.Router()

router.get('/:venueid/tickets', (req, res)=>{
    res.render("venues")
})

router.get('/:venueid/seating-chart', (req,res)=>{
    res.render("seatingchart")
})

module.exports = router

