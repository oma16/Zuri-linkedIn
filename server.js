const express = require('express');
const connectDB = require('./src/database');
require('dotenv').config()  // Allow us to use the environmental variables in dotenv 
const {PORT}= process.env;
const authroute =require('./src/routes/authroute');
const cookieParser = require('cookie-parser');
const { requireAuth, checkUser } = require('./src/middleware/auth')
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
app.use(cookieParser());

// view engine
 app.set('view engine', 'ejs');
//routes
app.get("*",checkUser);
app.get("/", (req, res) => {
    res.render("index")
})
app.get("/dashboard",requireAuth, (req, res) => 
    res.render("dashboard"))
 


//Port
const port = process.env.PORT || PORT;

//Listen to connection
app.listen(port,()=>console.log(`App is running on port ${port}`));

