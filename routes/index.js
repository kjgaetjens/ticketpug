const express = require('express')
const router = express.Router()

router.get('/', (req, res)=>{
    res.render("index")
})

router.post('/register', (req,res)=>{
    let username = req.body.username
    let password = req.body.password 
    
    let user = models.Trip.build({
        username: username,
        password: password,
        status: "active"
    })
    user.save().then(savedUser => console.log(savedUser)).catch(e=>console.log(e))
})

router.post('/login', (req,res){
    let username = req.body.username
    let password = req.body.password
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

