const express = require('express')
const router = express.Router()
const pgp = require('pg-promise')();
const connectionString = 'DB URL!!!' 
//                      ^^^^^^^^^^^^INSERT DATABASE
global.db = pgp(connectionString)

router.get('/genre/:genreid', (req,res)=>{
    res.render('genre')
})

router.get('/artist/:artistid', (req,res)=>{
    res.send("artist")
})

router.get('/eventinfo/:eventid', (req,res)=>{
    res.send("event info")
})

module.exports = router

