const {con} = require("../databse.js");
const cookies = require("cookies");
const bcrypt=require('bcrypt');

async function confirmpass(req,res){
    console.log("hello from confirm password");
    const pass=req.body.password;
    const hashpassword= await bcrypt.hash(pass,10);
    const sql='update customers set pass_word = ? where id = ?';
    con.query(sql,[hashpassword,req.cookies.id],(err,data)=>{
        console.log("Password Updated!!");
        res.cookie('id', '', { maxAge : new Date(0) });
        res.redirect('/login');
    })
}

module.exports = {confirmpass}