const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/views/date.js");
const app = express();

const items = [];
const workItems = [];

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

app.get("/",(req,res)=>{
   const day = date.getDate();
   res.render("list", {listTitle: day, newListItems: items}); 
});

app.post("/",(req,res)=>{
    const item = req.body.newItem;
    if (req.body.list === "Work"){
        workItems.push(item);
        res.redirect("/work");
    } else {
        items.push(item);
        res.redirect("/");
    }
});

app.get("/work", (req,res)=>{
   const day = date.getDay();
    res.render("list", {listTitle:  "Work List"+ "\n" + day , newListItems: workItems});
})

app.get("/about", (req,res)=>{
    res.render("about");
})


app.listen(3000,()=>{
    console.log("server started on 3000");
});
