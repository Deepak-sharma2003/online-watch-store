const nodemailer=require('nodemailer');

const transporter = nodemailer.createTransport({
    service:'gmail',
    auth: {
      user: "deepak.223008@maimt.com",
      pass: "tows wayj fahk kjmp",
    },
});


async function support(req,res){
    var msg=req.query.message;
    const info = await transporter.sendMail({
        from:req.query.email,  //customer
        to:'deepak.223008@maimt.com', //owner of website
        subject:'Facing challenges',
        html:`problem : ${msg}`
       });
    try{
        res.render("contact-us");
    }   
    catch(err){
        console.log("Err : ",err);
    }
}
module.exports = {support}

module.exports={support}