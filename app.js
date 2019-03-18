var express = require(express),
    app     = express(),
    request = require("request");

//default view engine, no longer need to add .ejs
app.set("view engine", "ejs");

//landing page
app.get("/", (req, res) => {
    res.render("landing");
});

app.get("/home", (req, res) => {
   res.render("index"); 
});

//error page
app.get("*", (req, res) => {
    console.log("Error. Page not found.");
    res.send("Error. Page not found.");
});

//start server
app.listen(process.env.PORT, process.env.IP, function(){
   console.log("***POKEMON API SERVER HAS BEEN STARTED***");
});