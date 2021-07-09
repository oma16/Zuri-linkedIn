const express = require('express');
const connectDB = require('./src/database');
require('dotenv').config()  // Allow us to use the environmental variables in dotenv 
const {PORT}= process.env;
const authroute =require('./src/routes/authroute');
// connect to db

connectDB();


// create a basic express route

//const userRoutes = require('./routes/userRoute');

//initialize express
const app = express();

//initialize express middleware

app.use(express.json({extended:false}));
app.use(express.static(__dirname + '/public'));
app.use(authroute);

// view engine
 app.set('view engine', 'ejs');

app.get("/", (req, res) => {
    res.render("index")
})

//app.use(userRoutes);

//Port
const port = process.env.PORT || PORT;

//Listen to connection
app.listen(port,()=>console.log(`App is running on port ${port}`));

