const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const saltRounds = 10
const axios = require('axios')


router.get('/', (req, res)=>{
    axios.get('https://app.ticketmaster.com/discovery/v2/events.json?classificationName=music&preferredCountry=us&apikey=GgkMBDROaaG6jddcy0k07d6GGEyYG4gE')
    .then(response => {
        let eventinfo = response.data._embedded.events.map(event => {
            return {
                eventid: event.id,
                eventname: event.name,
                musician: event._embedded.attractions ? event._embedded.attractions[0].name : "N/A",
                musicianid: event._embedded.attractions ? event._embedded.attractions[0].id : "N/A",
                date: event.dates.start.dateTime,
                venue: event._embedded.venues[0].name,
                venuecity: event._embedded.venues[0].city.name,
                venuestate: event._embedded.venues[0].state.stateCode,
                venueaddress: event._embedded.venues[0].address.line1,
                venueid: event._embedded.venues[0].id,
                seatmap: event.seatmap ? event.seatmap.staticUrl : "N/A",
                genre: event.classifications[0].genre ? event.classifications[0].genre.name : "N/A",
                genreid: event.classifications[0].genre ? event.classifications[0].genre.id : "N/A",
                // minprice: event.priceRanges ? event.priceRanges[0].min : "N/A",
                // maxprice: event.priceRanges ? event.priceRanges[0].max: "N/A",
            }
        })
        res.render('index', {user: req.session.username, event: eventinfo})
        

    })
   
    
})
    
    

router.post('/register', async (req,res)=>{
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
                    }).then(function() {
                        models.User.findOne({
                            where: {username: username},
                            attributes:['id']
                        }).then(user=>{
                            let userId = user.get('id')
                            req.session.userid = userId
                            res.redirect("/account")
                        }).catch(e=>console.log(e))
                    })
                    
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
        attributes:['id','password']
    }).then(user =>{
        let userId = user.get('id')
        if(user){
            bcrypt.compare(password, user.get('password')).then((response) => {
                if(response){
                    console.log(response)
                    if(req.session){
                        req.session.username = username
                        req.session.userid = userId
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

