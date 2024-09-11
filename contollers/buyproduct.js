const {con} = require("../databse.js");

async function buyproduct(req, res) {
    console.log("ID : ", req.params.id);
    const myid = req.params.id;

    const sql = `SELECT * FROM images WHERE id = ?`;
    
    con.query(sql, [myid], (err, result) => {
        if (err) {
            console.log("Database Error : ", err);
            return res.status(500).send("Internal Server Error");
        }

        if (result.length) {
            const data = result[0];
            const user_id=req.cookies.id;
            console.log("userid : ",user_id);
            const sql2 = 'INSERT INTO cart (id, name, price, description, actualprice , userid , img) VALUES (?, ?, ?, ?, ?, ?, ?)';

            con.query(sql2, [data.id, data.name, data.price, data.description, data.price, user_id, data.img,], (err, result) => {
                if (err) {
                    console.log("Database Error : ", err);
                    return res.status(500).send("item already added to cart!!");
                }

                console.log("Item added!!");
                res.redirect("/page/cart");
            });
        } else {
            res.status(404).send("Item not found");
        }
    });
}

module.exports = {buyproduct}