// Dependencies
let express = require("express");
let path = require("path");
let fs = require("fs")
let db = require("./db/db.json")
// Establishing the Router and the Port Number
const app = express();
const PORT = process.env.PORT || 5000;
// 
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// This is the GET route that will display the notes html file
app.get("/notes", function(req,res){
  res.sendFile(path.join(__dirname, "./public/notes.html"));
})
// This is the GET route that is displaying the index.html as the home page
app.get("*", function(req, res) {
  res.sendFile(path.join(__dirname, "./public/index.html"));
});
// This is the GET route that is reading the information that is store in the save object
app.get("/api/notes", function(req,res){
  fs.readFile(db, (err,data) => {
    if (err) throw err;
    var save = JSON.parse(data)
    res.json(save);
  })
  
})
// This is A POST route that is going to create new objects inside of the db.json
// This is the POST route that is reading the information in the db.json and its going to store the save object and push additional object afterwards.
app.post("/api/notes", function(req,res){
  fs.readFile(db, (err,data) => {
    if (err) throw err;
    var save = JSON.parse(data)
    save.push(req.body)
    save = JSON.stringify(save)
    // The writeFile storing the new save object into the db.json. 
    fs.writeFile(db, save, (err) => {
      if (err) throw err;
      var save = JSON.parse(save)
      res.json(save);
    })
  })
  
})

// This is the DELETE route and its reading whats stored in the db.json
// THe save object is going to read all notes in db.json and remove notes with a specific id and rewrite notes to the db.json
app.delete("/api/notes/:id", function(req,res){
  fs.readFile(db, (err,data) => {
    if (err) throw err;
    var save = JSON.parse(data)
    save.filter(function (saved) {
      return saved.id != req.params.id;
    });
    fs.writeFile(db, save, (err) => {
      if (err) throw err
    })
    res.send(save);
  })
  }
)

app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });