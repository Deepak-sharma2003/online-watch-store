const sql=require("mysql2");

const con=sql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"mydb"
})

async function databaseconnection() {
    con.connect((err,data)=>{
        if(err) return console.log("Err : ",err);
    
        console.log("Database Connected!!");
    });
}

module.exports = {
    databaseconnection,
    con
};