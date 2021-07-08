/** create a connection function
  *start a local mongodb server connection */

 const mongoose = require('mongoose');
 require('dotenv').config();
 const MONGO_URI = process.env.MONGO_URI
 

 
 // create the connection function
 // async mongoose connection

 const connectDB = () =>{
     
          mongoose.connect(MONGO_URI,{
             useNewUrlParser:true,
             useCreateIndex: true,
             useUnifiedTopology:true,
             useFindAndModify:false
         })
         .then(() => {
            console.log("MongoDB connected");

            //send data
         })
          .catch((err) => {
             console.error(err.message);

             //exit with failure
             process.exit(1);
         
 })
}
 
 module.exports = connectDB