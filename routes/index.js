const express = require('express')
const router = express.Router()

router.get('/', (req, res)=>{
    res.render("index")
})

router.get('/about', (req,res)=>{
    res.render("about")
})

router.get('/contactus', (req,res)=>{
    res.render("contact")
})

router.get('/sitemap', (req,res)=>{
    res.render("sitemap")
})

module.exports = router

