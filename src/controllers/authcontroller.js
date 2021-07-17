const {User,Name } = require('../models/usermodel');
const jwt = require('jsonwebtoken')

// handle errors
const handleErrors = (err) => {
    console.log(err.message, err.code);
    let errors = { email: '', password: '' };
    
    // incorrect email
    if(err.message === "incorrect email"){
        errors.email ='that email is not registered';
    }
    // incorrect password
    if(err.message === "incorrect password"){
        errors.password ='that password is incorrect';
    }

   

    // duplicate error code 
    if (err.code === 11000){
        errors.email = "The email already exist";
        return errors;

    }

    // validation errors
    if (err.message.includes('user validation failed')){
        Object.values(err.errors).forEach(({ properties }) => {
            console.log(errors.properties);
        errors[properties.path] = properties.message;
            
        });
    }

    return errors;
}
const maxAge = 3 * 24 * 60 * 60
const createToken = (id) => {
    return jwt.sign({id},'zuri linkedin secret', {
        expiresIn: maxAge
    })
}


module.exports.signup_get = (req,res) => {
    res.render('signup');
}
module.exports.signup2_get = (req,res) => {
    res.render('signup2');
}

module.exports.login_get = (req,res) => {
    res.render('signin');
}

module.exports.signup_post = async (req,res) => {
    
const {email, password} = req.body;
try{
 const user = await User.create ({email, password});
 const token = createToken(user._id);
 res.cookie('jwt',token,{ maxAge : maxAge * 1000, secure:true} );
 res.status(200).json({user: user._id});
}
catch(err){
   const errors = handleErrors(err);
  res.status(400).json({errors});
}
}

module.exports.signup2_post = async (req,res) => {
const {firstname, lastname} = req.body;

  	
try{
 const user = await Name.create ({firstname, lastname});
 const token = createToken(user._id);
 res.cookie('jwt',token,{ maxAge : maxAge * 1000, secure:true} );
 res.status(200).json({user: user._id});
}
catch(err){
   const errors = handleErrors(err);
    res.status(400).json({errors});
}
}

module.exports.login_post = async (req,res) => {

    const {email, password} = req.body;
    try{
       const user = await User.signin(email, password);
       const token = createToken(user._id);
       res.cookie('jwt',token,{ maxAge : maxAge * 1000, secure:true} );
       res.status(200).json({user: user._id});
    }
    catch(err){
        const errors = handleErrors(err);
        res.status(400).json({errors});
    }
}

module.exports.logout_get = async (req,res) => {
    res.cookie('jwt','',{maxAge:1});
    res.redirect('/');
}