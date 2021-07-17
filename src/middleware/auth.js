const jwt = require('jsonwebtoken');
const {User,Name} = require('../models/usermodel');


const requireAuth = (req,res,next)=>{
    const token = req.cookies.jwt;

    // check json web token exists &  is verified

    if(token){
        jwt.verify(token, 'zuri linkedin secret',(err,decodedToken)=>{
        if(err){
            console.log(err.message);
            res.redirect('/signin');
        }else{
            console.log(decodedToken);
            next();
        }
        })
    }
    else{
        res.render('/signin');
    }
}
// check current user 
const checkUser =(req, res, next) =>{
    const token = req.cookies.jwt;
    if(token){
        jwt.verify(token, 'zuri linkedin secret',async (err,decodedToken)=>{
            if(err){
                console.log(err.message);
                res.locals.user = null;
                next();
            }else{
                console.log(decodedToken);
                let user = await User.findById(decodedToken.id);
                res.locals.user = user;
                next();
            }
            })
    }
    else{
        res.locals.user = null;
        next();
    }
}

module.exports = {requireAuth ,checkUser}