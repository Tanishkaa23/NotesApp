const express=require("express");
const app=express();
const fs=require("fs");

app.set("view engine","ejs")

app.get("/",function(req,res){
    
    fs.readdir(`./uploads`,function(err,files){
        
        res.render("index",{dir:files})

    })
})
app.get("/new",function(req,res){
    res.render("new")
})
app.get("/create-note",function(req,res){        //form submit hone pr jayega /create-note route pr
    
    fs.writeFile(`./uploads/${req.query.title}.txt`,req.query.content,function(err){

        res.redirect("/")
        console.log(req.query);
        
    })
    
})
app.get('/uploads/:filename',function(req,res){
    fs.readFile(`./uploads/${req.params.filename}`,"utf-8", function(err,data){
        res.render('show',{
            fileTitle:req.params.filename,
            fileData:data
        })  
    } )
})
app.get('/delete/:filename',function(req,res){
    fs.unlink(`./uploads/${req.params.filename}`, function(err) {
        
        res.redirect("/");
        
    });
})
app.get("/edit/:filename",function(req,res) {

    fs.readFile(`./uploads/${req.params.filename}`,"utf-8",function(err,data){
        res.render("edit",{
            oldName:req.params.filename,
            content:data
        })
    })
})
app.get('/edit-note/:oldTitle', (req, res) => {
    const oldTitle = req.params.oldTitle;
    const newTitle = req.query.title;
    const content = req.query.content;
    
    const oldPath = `./uploads/${oldTitle}`;
    const newPath = `./uploads/${newTitle}`;

    fs.rename(oldPath, newPath, (err) => {
        
        fs.writeFile(newPath, content, (err) => {
            
            res.redirect('/');
        });
    });
});

app.listen(3000)

