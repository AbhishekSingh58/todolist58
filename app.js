const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js")

const app = express();

let items = ["Buy Food", "Cook Food", "Eat Food"];
let workItems = [];

app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static("public"))
app.set("view engine", "ejs");

app.get("/", function(req, res){
    var day = date();
    res.render("list", { listTitle: day, newListItems: items});
})

app.post("/", function(req, res){
    let item = req.body.newItem;
    if(req.body.list === "Work"){
        workItems.push(item);
        res.redirect("/work");
    } else {
       items.push(item);
    res.redirect("/");  
    }
   
});

app.get("/work", function(req, res){
    res.render("list", {listTitle: "Work List", newListItems: workItems});
})

app.listen(process.env.PORT || 3000, function(req, res){
    console.log("server is started");
})