const mongoose = require('mongoose');
const { isEmail } = require('validator');
const bcrypt = require('bcrypt');
const { ObjectId } = mongoose.Schema.Types;

const nameSchema = new mongoose.Schema({
    
    firstname:{
        type:String,
        required: [true, 'Please enter your firstname']
    },
    lastname:{
        type:String,
        required: [true, 'Please enter your lastname']
    },
    user:[{ type: ObjectId, ref: 'User' }]
        

});

const userSchema = new mongoose.Schema({
   
    email:{
        type:String,
        required: [true, 'Please enter an email'],
        unique:true,
        lowercase:true,
        validate:[isEmail, 'Please enter a valid email']
    },
    password:{
        type:String,
        required: [true, 'Please enter a password'],
        minlength:[6, 'Minimum password lenght is 6 character']
    },
    names:[{ type: ObjectId, ref: 'Name' }]
        
    
});



// fire function before doc saved to db

userSchema.pre('save', async function(next){
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash (this.password, salt);
    next();
})

// static method to login user
userSchema.statics.signin = async function (email, password){
    const user = await this.findOne({email}).populate('name');
    if(user){
       const auth = await bcrypt.compare(password,user.password);
       if(auth){
           return user;
       }
       throw Error('incorrect password');
    }
    throw Error('incorrect email');
}

const User = mongoose.model('user', userSchema );
const Name = mongoose.model('name', nameSchema );
module.exports = { User, Name };
