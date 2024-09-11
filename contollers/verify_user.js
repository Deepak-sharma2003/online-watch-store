const {con} = require("../databse.js");
const nodemailer=require('nodemailer');
const otp=require("../otpgenerator.js");
const cookie = require("cookies");

const transporter = nodemailer.createTransport({
    service:'gmail',
    auth: {
      user: "deepak.223008@maimt.com",
      pass: "tows wayj fahk kjmp",
    },
});

async function resetpassword(req,res){
    const email=req.body.email;
    const sql="select email,id from customers where email= ? ";
    con.query(sql,[email],async (err,data)=>{
        if(data.length)
        {
            res.cookie('id', data[0].id, { maxAge: 3600000, httpOnly: true });
            const info = await transporter.sendMail({
                from:'deepak.223008@maimt.com',
                to:req.body.email,
                subject:'one time password!!',
                html:`your otp is : ${otp}`
            });
            try{
                const sql2=`insert into otp (otpvalue) values (?);`;
                        con.query(sql2,[otp],(err,data)=>{
                            if(err)
                                console.log("err : ",err);
                        })
                        res.render("otp_for_password");
            }   
            catch(err)
            {
                console.log("Err : ",err);
                res.redirect('/otpverification')
            }
        }
        else
        {
            console.log("Wrong Email !!");
            res.redirect('/reset_password');
        }
    })  
}

module.exports = {resetpassword}