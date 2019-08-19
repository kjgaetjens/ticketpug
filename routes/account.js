const express = require('express')
const router = express.Router()

router.get('/', (req,res)=>{
    res.send("ACCOUNT")
})

router.get('/settings', (req,res)=>{
    res.send("testing settings")
})

router.get('/tickets', (req,res)=>{
    res.send("testing tickets")
})

router.get('/history', (req,res)=>{
    res.send("history")
})
router.get('/payment', (req,res)=>{
    res.send("payment")
})

module.exports = router