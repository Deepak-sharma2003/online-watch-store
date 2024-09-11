const {con} = require("../databse.js");
const nodemailer=require('nodemailer');
const otp=require("../otpgenerator.js");
const session = require('express-session');

const transporter = nodemailer.createTransport({
    service:'gmail',
    auth: {
      user: "deepak.223008@maimt.com",
      pass: "tows wayj fahk kjmp",
    },
});

async function createcustomer(req,res){
     // Validate CAPTCHA
     if (req.session.captcha !== req.query.captcha) {
        console.log("Wrong Captcha");
        res.redirect('/page/signup');
    }

    const info = await transporter.sendMail({
        from:'deepak.223008@maimt.com',
        to:req.query.email,
        subject:'one time password!!',
        html:`your otp is : ${otp}`
       });
       try{
        const body=req.query;
        req.session.signupdata = body;
        const sql2=`insert into otp (otpvalue) values (?);`;
        con.query(sql2,[otp],(err,data)=>{
            if(err)
                console.log("err : ",err);
            else
                console.log("Otp Creatde!!");
        })
        console.log("req.session : ",req.session);

        res.render("otp");
       }
       catch(err){
        console.log("err : ",err);
        res.end("err occurs!!");
       }
}

module.exports={createcustomer}