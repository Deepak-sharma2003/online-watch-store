
async function logoutpage(req,res){
    res.cookie('Token', '', { maxAge : new Date(0) });
    res.cookie('name', '', { maxAge : new Date(0) });
    res.cookie('email', '', { maxAge : new Date(0) });
    res.cookie('key', '', { maxAge : new Date(0) });
    res.cookie('id', '', { maxAge : new Date(0) });
    res.redirect("/");
}


module.exports = {logoutpage}