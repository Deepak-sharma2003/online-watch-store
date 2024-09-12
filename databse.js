// const sql=require("mysql2");

// const con=sql.createConnection({
//     host:"localhost",
//     user:"root",
//     password:"",
//     database:"mydb"
// })

// async function databaseconnection() {
//     con.connect((err,data)=>{
//         if(err) return console.log("Err : ",err);
    
//         console.log("Database Connected!!");
//     });
// }

// module.exports = {
//     databaseconnection,
//     con
// };
const mysql = require("mysql2/promise");

const con = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "",
    database: "mydb",
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

async function databaseConnection() {
    try {
        // Test the connection
        const [rows, fields] = await con.query('SELECT 1');
        console.log("Database Connected!!");
    } catch (err) {
        console.error("Error connecting to the database:", err.message);
    }
}

module.exports = {
    databaseConnection,
    con
};
