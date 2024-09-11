const {con} = require("../databse.js");
const otp=require("../otpgenerator.js");
const session=require("express-session");
const bcrypt=require('bcrypt');

async function otpverify(req,res){
    con.query("select otpvalue from otp",(err,data)=>{
        console.log("Your Databse Otp : ",data[0]);
        if(req.query.otp == data[0].otpvalue){
            console.log("otp matched!!");
            con.query("truncate table otp",async(err,data)=>{
                 const body=req.session.signupdata;
                 console.log("body : ",body);
                const hashpassword= await bcrypt.hash(body.password,10);
                const sql=`insert into customers (username,email,pass_word,phoneno) values (?,?,?,?);`;
                con.query(sql,[body.name,body.email,hashpassword,body.pno],(err,data)=>{
                })
                res.render("login")
            });
        }
        else{
            console.log("Invalid OTP !!");
            res.render("otp");
        }
    })
}
module.exports={otpverify}