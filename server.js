// Dependencies
let express = require("express");
let path = require("path");
let fs = require("fs")
let db = require("./db/db.json")
// Establishing the Router and the Port Number
let app = express();
var PORT = 5000;
// 
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/notes", function(req,res){
  res.sendFile(path.join(__dirname, "./public/notes.html"));
})

app.get("*", function(req, res) {
  res.sendFile(path.join(__dirname, "./public/index.html"));
});

app.get("/api/notes", function(req,res){
  fs.readFile(db, (err,data) => {
    if (err) throw err;
    var save = JSON.parse(data)
    res.json(save);
  })
  
})

app.post("/api/notes", function(req,res){
  fs.readFile(db, (err,data) => {
    if (err) throw err;
    var save = JSON.parse(data)
    save.push(req.body)
    save = JSON.stringify(save)
    fs.writeFile(db, save, (err) => {
      if (err) throw err;
      var save = JSON.parse(save)
      res.json(save);
    })
  })
  
})

app.delete("/api/notes/:id", function(req,res){
  fs.readFile(db, (err,data) => {
    if (err) throw err;
    var save = JSON.parse(data)
    save.filter(function ())
    res.json(save);
  })
  }
)

app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });