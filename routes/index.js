const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const saltRounds = 10


router.get('/', (req, res)=>{
    
    res.render("index", {user: req.session.username})
})

router.post('/register', (req,res)=>{
    let username = req.body.username
    let password = req.body.password 
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
                    if(req.session){
                        req.session.username = {username:username}
                    }
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

router.get('/logout', (req,res)=>{
    req.session.destroy(e=>{
        console.log(e)
      })
    res.redirect('/')
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

