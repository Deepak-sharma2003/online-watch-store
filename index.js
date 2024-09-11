const express=require('express');
const app=express();
const path=require("path");
const routers = require('./routes');
const {databaseconnection}=require("./databse.js");
const cookieParser = require('cookie-parser');
const session = require('express-session');


app.listen(3000,()=> console.log("Server started!!"));

//middlewares..
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.set('view engine','ejs');
app.use(express.static(path.join(__dirname,'public')));
app.use(express.json());
app.use(session({
    secret: 'sjfshfb',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));

//routes..
app.use("/",routers);
app.use("/page",routers);

//database connection
databaseconnection();