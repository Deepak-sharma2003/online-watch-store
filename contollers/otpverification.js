const {con} = require("../databse.js");

async function otpverifyforpass(req,res){
    const sql='select * from otp where otpvalue = ?';
    con.query(sql,[req.body.otp],(err,data)=>{
        if(data.length)
        {
            con.query('truncate table otp',(err,data)=>{
                res.render('confirm_password');
            })
        }
    })
}

module.exports = {otpverifyforpass}