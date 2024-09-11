const {con} = require("../databse.js");
async function mainpage(req,res){
    try{
        con.query('select * from homeimages',async(err,data)=>{
            if(err)
                console.log("ERR : ",err);
            if(data.length)
            {
                //console.log("data : ",data);
                const watches = data;
                res.render("html/watch_store", { watches });
            }
        })
    }
    catch(err){
        console.log("err : ",err);
    }
}

module.exports={mainpage}