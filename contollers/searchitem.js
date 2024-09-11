const {con} = require("../databse.js");

async function searchitem(req, res){
    const item=req.query.search;
    const sql=`select * from images where name like '%${item}%'`;
    con.query(sql,(err,data)=>{
        if(err)
        {
            console.log("err : ",err);
        }
        if(data)
        {
            const watches=data;
            res.render("searchpage",{watches});
        }
        // else{
        //     const msg="No item Found !!";
        //     res.render('searchpage', { msg });  
        // }
    })
};

module.exports = {searchitem}
