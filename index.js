var express = require("express");
var bodyParser = require("body-parser");
var DataStore = require("nedb");
var MongoClient = require("mongodb").MongoClient;
var path = require("path");
var cors = require("cors");
var request = require('request');


var students = require("./studentsApi");
var crimesAPI = require("./crimesAPI");
var divorcesAPI = require("./divorcesAPI");


var mdbURL = "mongodb://usuario:usuario@ds129939.mlab.com:29939/sos1718-08"
var juradomdbURL="mongodb://jurado:jurado@ds231549.mlab.com:31549/sos1718-jmja-sandbox"
var mdbcrimes = "mongodb://josprimen:josprimen@ds231549.mlab.com:31549/sos1718-jepm-sandbox";






var port = (process.env.PORT || 1607);
var BASE_API_PATH = "/api/v2";

//var dbCrimes = __dirname+"/contacts.db";//base de datos crimes (JOSE ENRIQUE)
var dbFileName = __dirname + "/students.db";
var dbDivorces = __dirname + "/divorces.db";
var BASE_API_PATH_DIVORCES = "/api/v1/divorces-an";

var app = express();


//PROXY JOSE ENRIQUE PRIETO MENACHO
app.use("/proxyJE", function(req, res) {
  var url = "https://sos1718-07.herokuapp.com" + req.url;
  console.log('piped: '+req.baseUrl + req.url);
  req.pipe(request(url)).pipe(res);
});

//PROXY JOSE MANUEL JURADO ALVAREZ                            
app.use("/proxyJA", function(req, res) {
  var url = "https://sos1718-04.herokuapp.com" + req.url;
  console.log('piped: '+req.baseUrl + req.url);
  req.pipe(request(url)).pipe(res);
});

//PROXY JURADO TWITTER
app.use("/proxyTwitter", function(req, res) {
  var url = "https://publish.twitter.com"+ req.url;
  console.log('piped: '+req.baseUrl + req.url);
  req.pipe(request(url)).pipe(res);
});

//PROXY MARIA SOLIS DIAGO                          
app.use("/proxyMS", function(req, res) {
  var url = "https://sos1718-09.herokuapp.com" + req.url;
  console.log('piped: '+req.baseUrl + req.url);
  req.pipe(request(url)).pipe(res);
});



app.use(bodyParser.json());
app.use("/", express.static(path.join(__dirname + "/public")));
app.use(cors());


var initialCrimes = [
    { "province": "almeria", "year": 2007, "gender": "male", "onecrime": 7.01, "twocrime": 1.48, "threecrime": 0.35, "morethreecrime": 0.15 },
    { "province": "malaga", "year": 2012, "gender": "male", "onecrime": 8.60, "twocrime": 1.36, "threecrime": 0.31, "morethreecrime": 0.14 },
    { "province": "cadiz", "year": 2009, "gender": "male", "onecrime": 1.44, "twocrime": 0.18, "threecrime": 0.01, "morethreecrime": 0.00 },
    { "province": "jaen", "year": 2013, "gender": "female", "onecrime": 0.91, "twocrime": 0.07, "threecrime": 0.02, "morethreecrime": 0.01 },
    { "province": "sevilla", "year": 2010, "gender": "male", "onecrime": 6.07, "twocrime": 1.05, "threecrime": 0.24, "morethreecrime": 0.15 },
    { "province": "huelva", "year": 2014, "gender": "female", "onecrime": 1.02, "twocrime": 0.10, "threecrime": 0.01, "morethreecrime": 0.02 }

];


var initialDivorces = [
    { "province": "sevilla", "year": 2016, "divorce": 3973, "break": 203, "nullity": 1 },
    { "province": "cadiz", "year": 2016, "divorce": 2249, "break": 138, "nullity": 0 },
    { "province": "almeria", "year": 2016, "divorce": 1405, "break": 42, "nullity": 1 },
    { "province": "cordoba", "year": 2016, "divorce": 1447, "break": 115, "nullity": 1 },
    { "province": "granada", "year": 2016, "divorce": 1904, "break": 104, "nullity": 2 },
    { "province": "huelva", "year": 2016, "divorce": 1036, "break": 49, "nullity": 3 },
    { "province": "jaen", "year": 2016, "divorce": 1109, "break": 73, "nullity": 1 },
    { "province": "malaga", "year": 2016, "divorce": 3606, "break": 171, "nullity": 3 }

];

var initialStudents = [{ "province": "sevilla", "year": 2008, "gender": "male", "popilliterate": 16.32, "pophigheducation": 182.9, "popinuniversity": 30493 },
    { "province": "cadiz", "year": 2008, "gender": "female", "popilliterate": 28.70, "pophigheducation": 97.06, "popinuniversity": 10766 },
    { "province": "sevilla", "year": 2008, "gender": "both", "popilliterate": 56.53, "pophigheducation": 378.78, "popinuniversity": 66325 },
    { "province": "granada", "year": 2010, "gender": "male", "popilliterate": 10.02, "pophigheducation": 81.99, "popinuniversity": 54024 },
    { "province": "granada", "year": 2011, "gender": "female", "popilliterate": 23.86, "pophigheducation": 91.26, "popinuniversity": 22905 },
    { "province": "granada", "year": 2011, "gender": "both", "popilliterate": 53.86, "pophigheducation": 191.26, "popinuniversity": 44405 }

];


//######################################################JOSE ENRIQUE############################################################//


//Modularizado
MongoClient.connect(mdbcrimes,{native_parser:true},(err,mlabs)=>{
    
    if(err){
        console.error("Error al acceder a la base de datos mongo" + err);
        process.exit(1);
    }
        
    console.log("Conectado a mongoDB");
    var database = mlabs.db("sos1718-jepm-sandbox");
    var db = database.collection("crimes-an");
    
    
    crimesAPI.register(app, BASE_API_PATH, db);//le pasamos lo del express que esta en app al codigo que hemos movido a crimesAPI y el BASE_API_PATH
    
    app.listen(port, () => {
        console.log("Server ready on port " + port + "!");
    }).on("error", (e) => {
        console.log("Server NOT READY:" + e);
    });
    
});


//###########################################################################################################################//

//--------------------Jurado--------------------//
/*

app.get(BASE_API_PATH + "/divorces-an", (req, res) => {
    console.log(Date() + " - GET / divorces-an");
    res.send(divorces);
});

app.post(BASE_API_PATH + "/divorces-an", (req, res) => {
    console.log(Date() + " - POST / divorces-an");
    var divorce = req.body;
    divorces.push(divorce);
    res.sendStatus(201);
});

//n
app.put(BASE_API_PATH + "/divorces-an", (req, res) => {
    console.log(Date() + " - PUT / divorces-an");
    res.sendStatus(405);
});
//n
app.delete(BASE_API_PATH + "/divorces-an", (req, res) => {
    console.log(Date() + " - DELETE / divorces-an");
    divorces = [];
    res.sendStatus(200);
});

//n a recurso concreto
app.get(BASE_API_PATH + "/divorces-an/:province", (req, res) => {
    var province = req.params.province;
    console.log(Date() + " - GET /divorces-an/" + province);

    res.send(divorces.filter((c) => {
        return (c.province == province);
    })[0]); //
});
//n a recurso concreto
app.delete(BASE_API_PATH + "/divorces-an/:province", (req, res) => {
    var province = req.params.province;
    console.log(Date() + " - DELETE /divorces-an/" + province);

    divorces = divorces.filter((c) => {
        return (c.province != province);
    });

    res.sendStatus(200);
});
//n a recurso concreto
app.post(BASE_API_PATH + "/divorces-an/:province", (req, res) => {
    var province = req.params.province
    console.log(Date() + " - POST / divorces-an" + province);
    res.sendStatus(405);
});
//n a recurso concreto
app.put(BASE_API_PATH + "/divorces-an/:province", (req, res) => {
    var province = req.params.province;
    var divorce = req.body;
    console.log(Date() + " - PUT /divorces-an/" + province);

    if (province != divorce.province) {
        res.sendStatus(409);
        console.warn(Date() + " -Hacking attempt!");
        return;
    }

    divorces = divorces.map((c) => {
        if (c.province == divorces.province)
            return divorces;
        else
            return c;
    });
    res.sendStatus(200);


});


*/


console.log("Intentando conectar a Divorces");
MongoClient.connect(juradomdbURL, { native_parser: true }, (err, mlabs) => {
    if (err) {
        console.error("Error accesing DB" + err);
        process.exit(1)
    }
    else {
        console.log("Connected to DB");

        var database = mlabs.db("sos1718-jmja-sandbox");
        var db = database.collection("divorces");
    }

    divorcesAPI.register(app, db);

    app.listen(port, () => {
        console.log("Server ready on port " + port + "!");
    }).on("error", (e) => {
        console.log("Server NOT READY:" + e);
    });
});



//Auth0//









//###########################################################################################################################//

//--------------------Maria--------------------//

/*var db = new DataStore({

    filename: dbFileName,
    autoload: true

});
*/
MongoClient.connect(mdbURL, { native_parser: true }, (err, mlabs) => {
    if (err) {
        console.error("Error accesing DB" + err);
        process.exit(1)
    }
    else {
        console.log("Connected to DB");

        var database = mlabs.db("sos1718-08");
        var db = database.collection("students");
    }

    students.register(app, db);

    app.listen(port, () => {
        console.log("Server ready on port " + port + "!");
    }).on("error", (e) => {
        console.log("Server NOT READY:" + e);
    });
});

/*db.find({}).toArray((err, students) => {
    if (students.length == 0) {
        console.log("Empty DB");
        db.insert(initialStudents);

    }

    else {
        console.log("DB initialized with " + students.length + " students")
    }
});*/

/*   db.find({}, (err, results) => {
    if (err) {
        console.error("Error accesing DB");
        process.exit(1);
    }
gcloud config set project [YOUR_PROJECT_ID]
g
    if (results.length == 0) {
        console.log("Empty DB");
        db.insert(students-an);
    }
    else {
        console.log("DB inicialiced with " + results.length + " students");
    }
});*/

/*
 */
 

console.log("Server setting up...");
