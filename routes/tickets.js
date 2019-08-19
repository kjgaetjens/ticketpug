const express = require('express')
const router = express.Router()

router.get('/genre/:genreid', (req,res)=>{
    let genre = req.params.genre
    res.send(genre)
})

router.get('/artist/:artistid', (req,res)=>{
    res.send("artist")
})

router.get('/eventinfo/:eventid', (req,res)=>{
    res.send("event info")
})

module.exports = router

