const {con} = require("../databse.js");

async function removeitem(req,res){
    // console.log(req.params.img);
    let image = req.body.watchimage;
    if (!image) {
        return res.status(400).json({
            success: false,
            message: 'Missing watch image ID'
        });
    }
    const userid=req.cookies.id;
    const sql="delete from cart where img = ? and userid = ?;";
    con.query(sql,[image,userid],(err,data)=>{
        console.log("Data : ",data);
        res.json({
            success: true,
        });
    })
}

module.exports = {removeitem}