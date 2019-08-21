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

module.exports = router

