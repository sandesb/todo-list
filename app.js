const express = require("express");
const bodyParser = require("body-parser");

const app = express();

let items = ["Buy Food","Cook Food","Eat Food"];

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

app.get("/",(req,res)=>{
   let today = new Date();
   let currentDay = today.getDay();

   let options = {
    weekday: "long",
    day: "numeric",
    month: "long"
   };

   let day = today.toLocaleDateString("en-US", options);


//    if (currentDay===6 || currentDay===0){
//         day = "Weekend";
//     }   else if(currentDay==1){
//         day = "Monday";
//     }   else if(currentDay==2){
//         day = "Tuesday";
//     }   else if(currentDay==3){
//         day = "Wendesday";
//     }   else if(currentDay==4){
//         day = "Thursday";
//     }   else if(currentDay==5){
//         day = "Friday";
//     }

   res.render("list", {kindOfDay: day, newListItem: items}); 
});

app.post("/",(req,res)=>{
    let item = req.body.newItem;
    items.push(item);
    res.redirect("/");
    console.log(item);
});
app.listen(3000,()=>{
    console.log("server started on 3000");
});

