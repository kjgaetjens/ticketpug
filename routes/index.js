const express = require('express')
const router = express.Router()

router.get('/', (req, res)=>{
    res.render("index")
})

router.get('/about', (req,res)=>{
    res.send("testing")
})

router.get('/contactus', (req,res)=>{

})

router.get('/sitemap', (req,res)=>{

})

module.exports = router

