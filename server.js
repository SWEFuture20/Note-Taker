let express = require("express");
let path = require("path");
let fs = require("fs")
let db = require("./db/db.json")

let app = express();
var PORT = 5000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("*", function(req, res) {
    res.sendFile(path.join(__dirname, "./public/index.html"));
  });

app.get("/notes", function(req,res){
  res.sendFile(path.join(__dirname, "./public/notes.html"));
  // res.render("./public/notes.html")
})

app.get("/api/notes", function(req,res){
  res.json(db)
})

app.post("/api/notes", function(req,res){

})

app.delete("/api/notes/:id", function(req,res){

})

app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });