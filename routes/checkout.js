const express = require('express')
const router = express.Router()


router.get('/:eventid', (req,res)=>{
    res.send("testing")
})


router.get('/:eventid/confirmation/', (req,res)=>{
    res.send("confirmation")
})

module.exports = router
