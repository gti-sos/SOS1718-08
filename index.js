var express = require("express");
var bodyParser = require("body-parser");
var DataStore = require("nedb");



var port = (process.env.PORT || 1607);
var BASE_API_PATH = "/api/v1";
//var dbCrimes = __dirname+"/contacts.db";//base de datos crimes (JOSE ENRIQUE)
var dbFileName = __dirname + "/students.db";

var dbDivorces = __dirname + "/divorces.db";
var BASE_API_PATH_DIVORCES = "/api/v1/divorces-an";

var app = express();

app.use(bodyParser.json());
app.use("/",express.static(__dirname+"/public"));

//Sección ayuda recurso crimes (JOSE ENRIQUE)
app.get(BASE_API_PATH+"/helpcrimes",(req,res)=>{
    res.redirect("https://documenter.getpostman.com/view/3950150/collection/RVnZgdc1");
});

//Sección ayuda recurso studentsan (MARÍA)
app.get(BASE_API_PATH+"/helpcrimes",(req,res)=>{
    res.redirect("https://documenter.getpostman.com/view/3891289/sos1718-08-studentsan/RVnZgxrb");
});

//Sección ayuda recurso studentsan (JURADO)
app.get(BASE_API_PATH+"/helpdivorces",(req,res)=>{
    res.redirect("https://documenter.getpostman.com/view/3897840/divorces-an/RVu1Gq8B");
});



var crimes = [
        { "province": "almería", "year": 2007, "gender" : "male", "onecrime" : 7.01, "twocrime" : 1.48, "threecrime" : 0.35, "morethreecrime" : 0.15 },
        { "province": "málaga", "year": 2007, "gender" : "female", "onecrime" : 0.48, "twocrime" : 0.05, "threecrime" : 0.00, "morethreecrime" : 0.00 },
        { "province": "sevilla", "year": 2020, "gender" : "male", "onecrime" : 5.52, "twocrime" : 1.52, "threecrime" : 0.51, "morethreecrime" : 0.33  }
    ];
    
    
var divorces = [
{ "province" : "sevilla", "year" : 2016  , "divorce":3973 , "break": 203, "nullity": 1 },
{ "province" : "cadiz", "year" : 2016  , "divorce":2249 , "break": 138, "nullity": 0 },
{ "province" : "almeria", "year" : 2016  , "divorce":1405 , "break": 42, "nullity": 1 },
{ "province" : "cordoba", "year" : 2016  , "divorce":1447 , "break": 115, "nullity": 1 },
{ "province" : "granada", "year" : 2016  , "divorce":1904 , "break": 104, "nullity": 2 },
{ "province" : "huelva", "year" : 2016  , "divorce":1036 , "break": 49, "nullity": 3 },
{ "province" : "jaen", "year" : 2016  , "divorce":1109 , "break": 73, "nullity": 1 },
{ "province" : "malaga", "year" : 2016  , "divorce":3606 , "break": 171, "nullity": 3 }
    
];

var studentsan = [{"province": "sevilla","year": "2008","gender": "male","pop-illiterate": "16.32","pop-high-education": "182.9","pop-in-university": "30493"},
    { "province": "cadiz","year": "2008","gender": "female","pop-illiterate": "28.70","pop-high-education": "97.06","pop-in-university": "10766"},
    { "province": "sevilla","year": "2008","gender": "both","pop-illiterate": "56.53","pop-high-education": "378.78","pop-in-university": "66325"},
    {"province": "granada","year": "2010","gender": "male","pop-illiterate": "10.02","pop-high-education": "55.85","pop-in-university": "54024"},
    
];

//---------JURADO........

var dbDiv = new DataStore({
    filename: dbDivorces,
    autoload: true
});

app.get(BASE_API_PATH +"/divorces-an/loadInitialData", (req, res) => {
        dbDiv.find({}, (err, div) => {
        if (err) {
            console.error("Error accesing DB");
            process.exit(1);
        }
        if (div.length == 0) {
            console.log("Empty DB");
            dbDiv.insert(divorces);
        }
        else {
            console.log("DB initialized with " + div.length + " data");
        }
    });
});
    
    //######################################################JOSE ENRIQUE############################################################//
   /* var db = new DataStore({//base de datos
     filename: dbFileName,
     autoload: true
    });
    
    db.find({},(err,contacts)=>{
        if(err){
            console.error(" Error accesing DB");
            process.exit(1);
        }
        if(contacts.length==0){
            console.log("Empty DB");
            db.insert(initialContacts);
        }else{
            console.log("DB initialized with "+contacts.length+" contacts");
        }
    });*/
    
    app.get(BASE_API_PATH+"/crimes-an",(req,res)=>{
        console.log(Date() + " - GET / crimes-an");
        res.send(crimes);
    });
    
    app.post(BASE_API_PATH+"/crimes-an",(req,res)=>{
        console.log(Date() + " - POST / crimes-an");
        var crime = req.body;
        crimes.push(crime);
        res.sendStatus(201);
    });
    
    //n
    app.put(BASE_API_PATH+"/crimes-an",(req,res)=>{
        console.log(Date() + " - PUT / crimes-an");
        res.sendStatus(405);
    });
    //n
    app.delete(BASE_API_PATH+"/crimes-an",(req,res)=>{
        console.log(Date() + " - DELETE / crimes-an");
        crimes = [];
        res.sendStatus(200);
    });
    
    //n a recurso concreto
    app.get(BASE_API_PATH+"/crimes-an/:province",(req,res)=>{
        var province = req.params.province;
        console.log(Date() + " - GET /crimes-an/"+province);
        
        res.send(crimes.filter((c)=>{
            return (c.province==province);
        })[0]);//el [0] es para devolver solo el primer elemento, aunque debería haber solo uno
    });
    //n a recurso concreto
    app.delete(BASE_API_PATH+"/crimes-an/:province",(req,res)=>{
        var province = req.params.province;
        console.log(Date() + " - DELETE /crimes-an/"+province);
       
        crimes = crimes.filter((c)=>{
         return (c.province!=province);    
        });
        
        res.sendStatus(200);
    });
    //n a recurso concreto
    app.post(BASE_API_PATH+"/crimes-an/:province",(req,res)=>{
        var province = req.params.province
        console.log(Date() + " - POST / crimes-an" + province);
        res.sendStatus(405);
    });
    //n a recurso concreto
    app.put(BASE_API_PATH+"/crimes-an/:province",(req,res)=>{
        var province = req.params.province;
        var crime = req.body;
        console.log(Date() + " - PUT /crimes-an/"+province);
        
       if(province != crime.province){
           res.sendStatus(409);
           console.warn(Date()+ " -Hacking attempt!");
           return;
       }
       
       crimes = crimes.map((c)=>{
           if(c.province == crime.province)
            return crime;
           else
            return c;
       });
       res.sendStatus(200);
    });
    //###########################################################################################################################//
    
    //--------------------Jurado--------------------//
    
     app.get(BASE_API_PATH+"/divorces-an",(req,res)=>{
        console.log(Date() + " - GET / divorces-an");
        res.send(divorces);
    });
    
    app.post(BASE_API_PATH+"/divorces-an",(req,res)=>{
        console.log(Date() + " - POST / divorces-an");
        var divorce = req.body;
        divorces.push(divorce);
        res.sendStatus(201);
    });
    
    //n
    app.put(BASE_API_PATH+"/divorces-an",(req,res)=>{
        console.log(Date() + " - PUT / divorces-an");
        res.sendStatus(405);
    });
    //n
    app.delete(BASE_API_PATH+"/divorces-an",(req,res)=>{
        console.log(Date() + " - DELETE / divorces-an");
        divorces = [];
        res.sendStatus(200);
    });
    
    //n a recurso concreto
    app.get(BASE_API_PATH+"/divorces-an/:province",(req,res)=>{
        var province = req.params.province;
        console.log(Date() + " - GET /divorces-an/"+province);
        
        res.send(divorces.filter((c)=>{
            return (c.province==province);
        })[0]);//
    });
    //n a recurso concreto
    app.delete(BASE_API_PATH+"/divorces-an/:province",(req,res)=>{
        var province = req.params.province;
        console.log(Date() + " - DELETE /divorces-an/"+province);
       
        divorces = divorces.filter((c)=>{
         return (c.province!=province);    
        });
        
        res.sendStatus(200);
    });
    //n a recurso concreto
    app.post(BASE_API_PATH+"/divorces-an/:province",(req,res)=>{
        var province = req.params.province
        console.log(Date() + " - POST / divorces-an" + province);
        res.sendStatus(405);
    });
    //n a recurso concreto
 app.put(BASE_API_PATH+"/divorces-an/:province:/year",(req,res)=>{
        var province = req.params.province;
        var year = req.params.year;
        var divorce = req.body;
        console.log(Date() + " - PUT /divorces-an/province"+province);
        
       if(province != divorce.province){
           res.sendStatus(409);
           console.warn(Date()+ " -Hacking attempt!");
           return;
       }
       
       if(year != divorce.year){
           res.sendStatus(409);
           console.warn(Date()+ " -Hacking attempt!");
           return;
       }
       
       divorces = divorces.map((c)=>{
           if(c.province == divorce.province && c.year ==divorce.year)
            return divorce;
           else
            return c;
       });
       res.sendStatus(200);
    });
    
    
//###########################################################################################################################//
    
    //--------------------Maria--------------------//
    
var db = new DataStore({

    filename: dbFileName,
    autoload: true

});

db.find({}, (err, results) => {
    if (err) {
        console.error("Error accesing DB");
        process.exit(1);
    }

    if (results.length == 0) {
        console.log("Empty DB");
        db.insert(studentsan);
    }
    else {
        console.log("DB inicialiced with " + results.length + " students");
    }
});

app.get(BASE_API_PATH + "/studentsan", (req, res) => {
    console.log(Date() + " - GET /studentsan");

    db.find({}, (err, results) => {
        if (err) {
            console.error("Error accesing DB");
            res.sendStatus(500);
            return;
        }

        res.send(results);

    });


});

app.post(BASE_API_PATH + "/studentsan", (req, res) => {
    console.log(Date() + " - POST /studentsan");
    var student = req.body;
    db.find({}, (err, results) => {
        if (err) {
            console.error("Error accesing DB");
            process.exit(1);
        }

        if (results.length == 0) {
            console.log("Empty DB");
            db.insert(student);
        }
        else {
            console.log("DB inicialiced with " + results.length + " students");
        }
    });
    res.sendStatus(201);
});

app.put(BASE_API_PATH + "/studentsan", (req, res) => {
    console.log(Date() + " - PUT /studentsan");
    res.sendStatus(405);
});

app.delete(BASE_API_PATH + "/studentsan", (req, res) => {
    console.log(Date() + " - DELETE /studentsan");

    db.remove({});

    res.sendStatus(200);
});


app.get(BASE_API_PATH + "/studentsan/:province/", (req, res) => {
    var province = req.params.province;
    console.log(Date() + " - GET /studentsan/" + province);

    db.find({ "province": province }, (err, results) => {
        if (err) {
            console.error("Error accesing DB");
            res.sendStatus(500);
            return;
        }

        res.send(results);

    });
});

app.get(BASE_API_PATH + "/studentsan/:province/:year", (req, res) => {
    var province = req.params.province;
    var year = req.params.year;
    console.log(Date() + " - GET /studentsan/" + province + "/" + year);

    db.find({ "province": province, "year": year}, (err, results) => {
        if (err) {
            console.error("Error accesing DB");
            res.sendStatus(500);
            return;
        }

        res.send(results);

    });
});

app.get(BASE_API_PATH + "/studentsan/:province/:year/:gender", (req, res) => {
    var province = req.params.province;
    var year = req.params.year;
    var gender = req.params.gender;
    console.log(Date() + " - GET /studentsan/" + province + "/" + year + "/" + gender);

    db.find({ "province": province, "year": year, "gender": gender }, (err, results) => {
        if (err) {
            console.error("Error accesing DB");
            res.sendStatus(500);
            return;
        }

        res.send(results);

    });
});

app.delete(BASE_API_PATH + "/studentsan/:province", (req, res) => {
    var province = req.params.province;
    console.log(Date() + " - DELETE /studentsan/" + province);

    db.remove({ "province": province });

    res.sendStatus(200);
});

app.delete(BASE_API_PATH + "/studentsan/:province/:year", (req, res) => {
    var province = req.params.province;
    var year = req.params.year;
    console.log(Date() + " - DELETE /studentsan/" + province + "/" + year)

    db.remove({ "province": province, "year": year });

   res.sendStatus(200);
});

app.delete(BASE_API_PATH + "/studentsan/:province/:year/:gender", (req, res) => {
    var province = req.params.province;
    var year = req.params.year;
    var gender = req.params.gender;
    console.log(Date() + " - DELETE /studentsan/" + province + "/" + year + "/" + gender);

    db.remove({ "province": province, "year": year, "gender": gender });

    res.sendStatus(200);
});

app.post(BASE_API_PATH + "/studentsan/:province", (req, res) => {
    var province = req.params.province;
    console.log(Date() + " - POST /studentsan/" + province);
    res.sendStatus(405);
});

app.post(BASE_API_PATH + "/studentsan/:province/:year", (req, res) => {
    var province = req.params.province;
    var year = req.params.year;
    console.log(Date() + " - POST /studentsan/" + province + "/" + year);
    res.sendStatus(405);
});

app.post(BASE_API_PATH + "/studentsan/:province", (req, res) => {
    var province = req.params.province;
    var year = req.params.year;
    var gender = req.params.gender;
    console.log(Date() + " - POST /studentsan/" + province + "/" + year + "/" + gender);
    res.sendStatus(405);
});

app.put(BASE_API_PATH + "/studentsan/:province", (req, res) => {
    var province = req.params.province;
    var student = req.body;
    console.log(Date() + " - PUT /studentsan/" + province);
    
   res.sendStatus(405);
});

app.put(BASE_API_PATH + "/studentsan/:province/:year", (req, res) => {
    var province = req.params.province;
    var year = req.params.year
    var student = req.body;

    console.log(Date() + " - PUT /studentsan/" + province + "/" + year);
    
    res.sendStatus(405);
});

app.put(BASE_API_PATH + "/studentsan/:province/:year/:gender", (req, res) => {
    var province = req.params.province;
    var year = req.params.year
    var gender = req.params.gender
    var student = req.body;

    console.log(Date() + " - PUT /studentsan/" + province + "/" + year + "/" + gender);

    if (province != student.province || year != student.year || gender != student.gender) {
        res.sendStatus(409);
        console.warn(Date() + " - Hacking attempt!");
        return;
    }

      db.update({ "province": student.province, "year":year, "gender":gender}, student, (err, numUpdate) => {
        console.log("Updated: " + numUpdate);
    });

    if (province != student.province) {
        res.sendStatus(409);
        console.warn(Date() + " - Hacking attempt!");
        return;
    }

    res.sendStatus(200);
});


app.listen(port, () => {
    console.log("Server ready on port " + port + "!");
}).on("error", (e) => {
    console.log("Server NOT READY:" + e);
});

console.log("Server setting up...");
