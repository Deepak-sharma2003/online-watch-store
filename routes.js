const express=require("express");
var jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');
const multer = require('multer');
const svgCaptcha = require('svg-captcha');
const session = require('express-session');

// Configure image upload directory
const uploadDir = path.join(__dirname, './public/css/images');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}

// Configure multer storage
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadDir);
    },
    filename: function (req, file, cb) {
        const customImageName = req.body.imageName || 'default_image_name';
        const uniqueSuffix = Date.now() + path.extname(file.originalname);
        cb(null, customImageName + uniqueSuffix);
    }
});

const upload = multer({ storage: storage });

const server=express.Router();



//middleware to check if user is authenticated or not ?
async function isauthentitacted(req,res,next){
    try{
        const token = req.cookies.Token;
        const user = await jwt.verify(token,'shhhhh');
        req.user = user;
        next();
    }
    catch(err){
        console.log("err : ",err);
        res.redirect('/login');
    }
}

//middleware to authenticate admin
async function isAdminauthentitacted(req,res,next){
    try{
        const token = req.cookies.Token;
        if(req.cookies.key)
        {
            const user = await jwt.verify(token,'shhhhh');
            req.user = user;
            next();
        }  
        else{
            res.end("Access denied!!");
        }
    }
    catch(err){
        console.log("err : ",err);
        res.redirect('/login');
    }
}

//middleware that prevents one login at a time.
async function checkiflogin(req,res,next){
    if(req.cookies.name)
    {
        return res.redirect('/page/userpage')
    }
    return next();
}

//All the function That executes on Specific " Route "
const {mainpage}=require('./contollers/mainpage');
const {admin_homepage} = require('./contollers/admin_homepage')
const {shoppage} = require('./contollers/shoppage')
const {signuppage} = require('./contollers/signup')
const {cartpage} = require('./contollers/cartpage')
const {loginpage} = require('./contollers/login')
const {verifyuser} = require('./contollers/verifyuser')
const {logoutpage} = require('./contollers/logout')
const {contactuspage} = require('./contollers/contactus')
const {createcustomer} = require('./contollers/createcustomer')
const {otpverify} = require('./contollers/otpverify')
const {getwatchbyid} = require('./contollers/getwatchbyid')
const {getwatch}=require('./contollers/getwatch')
const {support} = require('./contollers/support')
const {buyproduct} = require('./contollers/buyproduct')
const {buyproduct1} = require('./contollers/buyproduct1')
const {searchpage} = require('./contollers/searchpage')
const {removeitem} = require('./contollers/removeitem')
const {updateqty} = require('./contollers/updateqty')
const {makepayment} = require('./contollers/makepayment')
const {cancelpayment} = require('./contollers/cancelpayment')
const {userpage} = require('./contollers/userpage')
const {searchitem} = require('./contollers/searchitem')
const {add_watch} = require('./contollers/add_watch')
const {add_new_watch} = require('./contollers/add_new_watch')
const {forgot_password} = require('./contollers/forgot_password') //it render forgot password page. that ask email.
const {resetpassword} = require('./contollers/verify_user') //it validates eamil and send otp. also render otppage.
const {otpverifyforpass} = require('./contollers/otpverification') //it validates entered otp . and render new password page.
const {confirmpass} = require('./contollers/confirmpassword') //it update password and render login page.

//All routes that performs Specific Tasks.
server.post('/add_my_watch',isAdminauthentitacted,upload.single('image'),add_new_watch)
server.get('/',mainpage)
server.get('/home',isAdminauthentitacted,admin_homepage)
server.get('/add_product',isAdminauthentitacted,add_watch)
server.get('/support',support)
server.get('/shop',shoppage)
server.get('/login',checkiflogin,loginpage)
server.get('/logout',logoutpage)
server.get('/signup',signuppage)
server.get('/userpage',isauthentitacted,userpage)
server.get('/cart',isauthentitacted,cartpage)
server.get('/contact',contactuspage)
server.get('/otpverify',otpverify)
server.post('/verifyuser',verifyuser)
server.get('/create-id',createcustomer)
server.get('/watch/:id',getwatchbyid)
server.get('/watches/:id',getwatch)
server.get('/addhomewatch/:id',isauthentitacted,buyproduct1)
server.get('/addwatch/:id',isauthentitacted,buyproduct)
server.get('/search',searchpage)
server.get('/searchitem',searchitem)
server.post('/remove',removeitem)
server.post('/updateqty',updateqty)
server.get('/payment',makepayment)
server.get('/cancel',cancelpayment)
server.get('/forgot_pass',forgot_password)
server.post('/reset_password',resetpassword) //route to check that if user exist or not for updating new password.
server.post('/otpverification',otpverifyforpass)
server.post('/confirm_password',confirmpass)

// Route to serve CAPTCHA image
server.get('/captcha', (req, res) => {
    const captcha = svgCaptcha.create();
    
    // Store the CAPTCHA text in the session
    req.session.captcha = captcha.text;

    // Send the CAPTCHA SVG image
    res.type('svg');
    res.send(captcha.data);
});

module.exports = server;