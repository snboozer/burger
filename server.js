var express = require("express");
var exphbs = require("express-handlebars");
var mysql = require("mysql");

var app = express();


var PORT = process.env.PORT || 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

var connection = mysql.createConnection({
  host: "localhost",
  port: process.env.PORT || 3306,
  user: "root",
  password: "Daffy1988",
  database: "burgers_db"
});

connection.connect(function(err) {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }

  console.log("connected as id " + connection.threadId);
});

app.get("/", function(req, res) {
  connection.query("SELECT * FROM burgers;", function(err, data) {
    if (err) throw err;
console.log (data)

    res.render("index", { burgers: data });
  });
});

app.put("/", function(req, res){
    console.log("i")
    connection.query("UPDATE burgers SET devoured= true WHERE id="+ req.body.id, function(err, data){
        res.send(data)
    })

})
app.post("/", function(req, res) {
  
console.log (req.body)


  connection.query("INSERT INTO burgers (burger_name, devoured) VALUES (?)", [[req.body.burger, false]], function(err, result) {
    if (err) throw err;

    res.redirect("/");
  });
});

// Start our server so that it can begin listening to client requests.
app.listen(PORT, function() {
  // Log (server-side) when our server has started
  console.log("Server listening on: http://localhost:" + PORT);
});

// ...