async function userpage(req,res){
    try{
        const name=req.cookies.name;
        const email=req.cookies.email;
        console.log(name,email);
        res.render('userdata',{name,email});
    }
    catch(err)
    {
        console.log("err : ",err);
        res.redirect('/page/login');
    }
}

module.exports = {userpage}