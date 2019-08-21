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

    bcrypt.hash(password, saltRounds).then(function(hash) {
        models.User.create({
            username: username,
            password: hash,
            status: "active"
        })
    }).catch(e=>console.log(e))
})


//For login: make modal on index.pug 
//insert message object onto pug.pug
router.post('/login', (req,res)=>{
    let username = req.body.username
    let password = req.body.password

    models.User.findOne({
        include: [
            {
                model: models.User
            }
        ],
        where: {
            username: username
        }
    }).then(user =>{
        if(user){
            bcrypt.compare(password, hash).then(function(res) {
                if(res){
                    res.redirect('/account')
                }else{
                    res.render('/', {message: "wrong username or password"})
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

