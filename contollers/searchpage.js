async function searchpage(req,res){
    const watches=0;
    res.render("searchpage",{watches});
}

module.exports = {searchpage}