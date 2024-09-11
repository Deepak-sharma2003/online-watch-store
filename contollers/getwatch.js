const {con} = require("../databse.js");

async function getwatch(req,res){
    const id=req.params.id;
    const sql=`Select * from homeimages where id = ${id}`;
    con.query(sql,(err,data)=>{
        if(err)
            console.log("err : ",err);

        else
           {
            const watch=data[0];
            res.render("watch_des1",{ watch });
           }
    })
}

module.exports = {getwatch}
