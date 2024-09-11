const {con} = require("../databse.js");

async function add_new_watch(req,res){
    // used to extract the filename of the uploaded file if it exists.
    try {
        const image = req.file;
        const imageFileName = image ? image.filename : null;


        console.log("req.body : ",req.body);
        console.log("imagFile Name  : ",imageFileName);

        const body=req.body;
        const sql='insert into images (name,price,description,img) values (?,?,?,?)';
        con.query(sql,[body.name, body.price, body.description, imageFileName],(err,data)=>{
             console.log("data : ",data);
                res.end("watch added!!");
        }); 

    } catch (error) {
        console.error('Error uploading car details:', error);
        res.status(500).send('Error uploading car details.');
    }   
};

module.exports = {add_new_watch}