const express = require('express')
const router = express.Router()


router.get('/:eventid', (req,res)=>{
    res.render("checkout")
})


router.get('/:eventid/confirmation', (req,res)=>{
    res.send("confirmation")
})

module.exports = router
