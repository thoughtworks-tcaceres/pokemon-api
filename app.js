var express = require("express"),
    app     = express(),
    request = require("request"),
    async = require("async"),
    bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: true}));
//default view engine, no longer need to add .ejs
//public folder for stylesheets/scripts
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));


app.get("/", (req, res) => {
   res.render("index"); 
});

app.get("/pokemon/", (req, res) => {
    var url1 = "https://pokeapi.co/api/v2/pokemon/" + req.query.pokeName;
    var url2 = "https://pokeapi.co/api/v2/pokemon/" + req.query.pokeName + "/encounters";
    async.parallel([
        function(next){
            request(url1, (error, response, body) => {
                if(!error && response.statusCode === 200) {
                    var data = JSON.parse(body);
                    return next(null, data);
                }
                console.log("API request 1 error:" + error)
                next(error);
            });
        },
        function(next){
            request(url2, (error, response, body) => {
                if(!error && response.statusCode === 200) {
                    var data2 = JSON.parse(body);
                    return next(null, data2);
                }
                console.log("API request 2 error:" + error)
                next(error);
            });
        }],
        function(err, results){
            res.render("pokemon/show", {
                                data:results[0],
                                data2:results[1]
                                });
        });
});
//     request(url, (error, response, body) => {
//         if(!error && response.statusCode === 200){
//             var data = JSON.parse(body);
//         }
//             request(url2, (error2, response2, body2) => {
//                 if(!error2 && response2.statusCode === 200){
//                     var data2 = JSON.parse(body2);
//                 } else {
//                     data2 = {};
//                 }
//                 res.render("pokemon/show", {
//                                     data:data,
//                                     data2:data2
//                                     });
//             });
//         }
//   });

//error page
app.get("*", (req, res) => {
    res.send("Error. Page not found.");
});

//start server
app.listen(process.env.PORT, process.env.IP, function(){
   console.log("***POKEMON API SERVER HAS BEEN STARTED***");
});