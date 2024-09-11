const {con} = require("../databse.js");
const bcrypt=require('bcrypt');
const cookie = require("cookie");
var jwt = require('jsonwebtoken');

async function verifyuser(req,res){
    console.log("req : ",req.body);
    const email=req.body.email;
    console.log("email : ",email);
    const sql=`select id,email,pass_word,username from customers where email = '${email} ';`;
    con.query(sql,async(err,data)=>{
        if(err)  return console.log("err : ",err);

        else{
            console.log("data : ",data);
            if(!(data.length))
            {
                console.log("wrong email entered!!");
                const msg = "Wrong Email Entered!";
                res.render('login');
                //res.render('login', { msg });
            }
            else{
                const user=data[0];
                const pass=req.body.password;
                const ispasswordsame = await bcrypt.compare(pass,user.pass_word);
                
                    // console.log("user : ",user);
                    // console.log("hash : ",pass);
                    // console.log("ispasswodsmae : ",ispasswordsame);

                if(ispasswordsame)
                {  
                    var token = jwt.sign(user , 'shhhhh' , { expiresIn: '1h' }); // Token expires in 1 hour
                    console.log("token : ",token);
                    res.cookie('Token', token, { maxAge: 3600000, httpOnly: true }); //or use expire instead of maxAge
                    res.cookie('name', data[0].username, { maxAge: 3600000, httpOnly: true }); //or use expire instead of maxAge                    
                    res.cookie('email', data[0].email, { maxAge: 3600000, httpOnly: true }); //or use expire instead of maxAge                                        
                    res.cookie('id', data[0].id, { maxAge: 3600000, httpOnly: true }); //or use expire instead of maxAge                                        

                    if (req.body.person == 'admin') {
                        console.log("hello admin");
                        const key='25752575'
                        res.cookie('key', key, { maxAge: 3600000, httpOnly: true });
                        res.redirect('/home'); // Use return to ensure no further code execution
                    }
                    
                    if (req.body.person == 'user') {
                        console.log("hello user");
                        res.redirect('/'); // Use return to ensure no further code execution
                    }
                }
                else{
                    console.log("Wrong Password!!");
                    res.render('login');
                    //res.render(login,{msg2 : "Wrong Password Entered!"});
                }
            }
        }
    })
}

module.exports = {verifyuser}