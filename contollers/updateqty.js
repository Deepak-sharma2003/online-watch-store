const {con} = require("../databse.js");

async function updateqty(req,res){
    console.log("req.body : ",req.body);
    const img=req.body.watchimage;
    const qty=req.body.qty;
    var userid=req.cookies.id;
    const sql='select price, actualprice as actprc from cart where img= ? and userid = ?';
    con.query(sql,[img,userid],(err,data)=>{
        const actprc = data[0].actprc;
        const sql2='UPDATE cart SET quantity = ?, price = ? WHERE img = ? and userid = ?';
        con.query(sql2,[qty, actprc * qty, img, userid],(err,data)=>{
            if(err){
                console.log("err : ",err)
                res.json({
                    success: false,
                    message: 'An error occurred while updating the cart.',
                })
            }
            else
            {
                console.log("item Addedd!!");
                res.json({
                    success :true,
                    message:"Cart item Addedd!!"
                })
            }
        })
    })
}

module.exports = {updateqty}