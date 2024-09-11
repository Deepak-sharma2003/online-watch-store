const {con} = require("../databse.js");

async function cartpage(req,res){
    console.log("inside cartpage !!");
    try{
        const userid=req.cookies.id;
        console.log("userid : ",userid);
        const sql=`select * from cart where userid = ?`;
        con.query(sql,[userid],(err,data)=>{
            const watches=data;
            con.query(`select sum(price) as ttl from cart where userid=${req.cookies.id}`,(err,result)=>{
                const total=result[0].ttl;
                res.render("cartpage",{ watches , total});
            })
        })
    }
    catch(err)
    {
        console.log('ERR : ',err);
    }
}

module.exports ={cartpage}
