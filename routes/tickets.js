const express = require('express')
const router = express.Router()


router.get('/genre/:genreid', (req,res)=>{
    res.render('genre')
})

router.get('/artist/:artistid', (req,res)=>{
    res.render("artists", {artist: "testing"} )
})

router.get('/artist/:artistid/bio', (req,res)=>{
    res.render("artistbio")
})

router.get('/eventinfo/:eventid', (req,res)=>{
    res.render("event")
})

router.get('/eventinfo/:eventid/seatgroup', (req,res)=>{
    res.render("seat")
})

router.post('/eventinfo/:eventid/seatgroup/:seatgroupid/:quantity', (req,res)=>{
    res.redirect('./checkout') //will this actually work?
})

module.exports = router

