const {con} = require("../databse.js");
async function shoppage(req,res){
    try{
        con.query('select * from images',async(err,data)=>{
            if(err)
                console.log("ERR : ",err);
            if(data.length)
            {
                //console.log("data : ",data);
                const watches = data;
                res.render("shoppage",{ watches });
            }
        })
    }
    catch(err){
        console.log("err : ",err);
    }
}

module.exports = {shoppage}