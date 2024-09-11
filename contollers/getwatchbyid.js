const {con} = require("../databse.js");

async function getwatchbyid(req,res){
    const id=req.params.id;
    const sql=`Select * from images where id = ${id}`;
    con.query(sql,(err,data)=>{
        if(err)
            console.log("err : ",err);

        else
           {
            const watch=data[0];
            res.render("watch_des",{ watch });
           }
    })
}

module.exports={getwatchbyid}