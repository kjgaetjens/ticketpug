function authenticate(req,res,next){
    if (req.session){
        if (req.session.username){
            next()
        }else{
            res.redirect('/')
        }
    }
}

module.exports = authenticate