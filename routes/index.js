const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const saltRounds = 10

router.get('/', (req, res)=>{
    res.render("index")
})

router.post('/register', (req,res)=>{
    let username = req.body.username
    let password = req.body.password 
<<<<<<< HEAD

    bcrypt.hash(password, saltRounds).then(function(hash) {
        models.User.create({
            username: username,
            password: hash,
            status: "active"
        })
        res.redirect('/register')
    }).catch(e=>console.log(e))
=======
    models.User.findOne({
        where: {
            username: username
        }
    }).then(user=>{
            if(user){
                res.render("index", {message: "User already exists"})
            }else{
                bcrypt.hash(password, saltRounds).then(function(hash) {
                    models.User.create({
                        username: username,
                        password: hash,
                        status: "active"
                    })
                    res.redirect("/account")
                })
            }
        }).catch(e=>console.log(e))
>>>>>>> master
})



router.post('/login', (req,res)=>{
    let username = req.body.username
    let password = req.body.password
    
    models.User.findOne({
        where: {
            username: username
        },
        attributes:['password']
    }).then(user =>{
        if(user){
            bcrypt.compare(password, user.get('password')).then(function(response) {
                if(response){
                    res.redirect('/account')
                }else{
                    res.render('index', {message: "wrong username or password"})
                }
            })
        }else{
            res.render('/', {message: "username or password does not exist"})
        }
    })
    .catch(e=>console.log(e))
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

