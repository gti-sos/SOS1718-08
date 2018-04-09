var divorcesAPI = {};
module.exports = divorcesAPI;
var BASE_API_PATH = "/api/v1";
var MongoClient = require('mongodb').MongoClient;

var urljurado="mongodb://jurado:jurado@ds231549.mlab.com:31549/sos1718-jmja-sandbox"


divorcesAPI.register = function(app,db) {

    console.log("Llamada divorces-an");


    var initialDivorces  = [
    { "province": "sevilla", "year": 2016, "divorce": 3973, "break": 203, "nullity": 1 },
    { "province": "cadiz", "year": 2016, "divorce": 2249, "break": 138, "nullity": 0 },
    { "province": "almeria", "year": 2016, "divorce": 1405, "break": 42, "nullity": 1 },
    { "province": "cordoba", "year": 2016, "divorce": 1447, "break": 115, "nullity": 1 },
    { "province": "granada", "year": 2016, "divorce": 1904, "break": 104, "nullity": 2 },
    { "province": "huelva", "year": 2016, "divorce": 1036, "break": 49, "nullity": 3 },
    { "province": "jaen", "year": 2016, "divorce": 1109, "break": 73, "nullity": 1 },
    { "province": "malaga", "year": 2016, "divorce": 3606, "break": 171, "nullity": 3 },
    { "province": "malaga", "year": 2015, "divorce": 3606, "break": 171, "nullity": 3 }
/*
 { "province": "sevilla", "year": "2016", "divorce": "3973", "break": "203", "nullity": "1" },
    { "province": "cadiz", "year": "2016", "divorce": "2249", "break": "138", "nullity": "0" },
    { "province": "almeria", "year": "2016", "divorce": "1405", "break": "42", "nullity": "1" },
    { "province": "cordoba", "year": "2016", "divorce": "1447", "break": "115", "nullity": "1" },
    { "province": "granada", "year": "2016", "divorce": "1904", "break": "104", "nullity": "2" },
    { "province": "huelva", "year": "2016", "divorce": "1036", "break": "49", "nullity": "3" },
    { "province": "jaen", "year": "2016", "divorce": "1109", "break": "73", "nullity": "1" },
    { "province": "malaga", "year": "2016", "divorce": "3606", "break": "171", "nullity": "3" },
    { "province": "malaga", "year": "2015", "divorce": "366", "break": "171", "nullity": "3" }
*/


];

    console.log("Registering router for divorces API...")
    app.get(BASE_API_PATH + "/divorces-an/docs", (req, res) => {
        res.redirect("https://documenter.getpostman.com/view/3897840/herokujmja/RVu1HAqF");
    });



    app.get(BASE_API_PATH + "/divorces-an/loadInitialData", (req, res) => {
        db.find({}, (err, divorces) => {
            if (err) {
                console.error(" Error accesing DB");
                process.exit(1);
                return;
            }
            db.find({}).toArray((err, divorces) => {
                if (divorces.length == 0) {
                    console.log("Empty DB");
                    db.insert(initialDivorces);
                    res.sendStatus(201);

                }
                else {
                    console.log("DB initialized with " + divorces.length + " divorces");
                    res.sendStatus(200);
                }

            });
        });
    });
 
    //GET y paginacion
    app.get(BASE_API_PATH+"/divorces-an", (req, res) => {
        var limit = Number(req.query.limit);
        var offset = Number(req.query.offset);
        if (limit > 0 & offset > 0) {
            MongoClient.connect(urljurado, function(err, db) {
                if (err) throw err;
                var dbo = db.db("sos1718-jmja-sandbox");
                if (err) throw err;
                dbo.collection("divorces").find({}).skip(offset).limit(limit).toArray(function(err, result) {
                    if (!err && !result.length) {
                        console.log("Not found");
                        res.sendStatus(404);
                    }
                    else {
                        res.send(result.map((c) => {
                            delete c._id;
                            return c;
                        }));
                    }
                    db.close();
                });
            });
        }
        else {
            MongoClient.connect(urljurado, function(err, db) {
                if (err) throw err;
                var dbo = db.db("sos1718-jmja-sandbox");
                if (err) throw err;
                dbo.collection("divorces").find({}).toArray(function(err, result) {
                    if (!err && !result.length) {
                        console.log("Not found");
                        res.sendStatus(404);
                    }
                    else {
                        res.send(result.map((c) => {
                            delete c._id;
                            return c;
                        }));
                    }
                     console.log(Date() + " - GET /divorces-an")
                    db.close();
                });
            });
        }
    });
    
    
 //-----------------POST Permitido
    app.post(BASE_API_PATH + "/divorces-an", (req, res) => {
         console.log(Date() + " - POST / divorces-an");
         var divorce = req.body;
         if (divorce.province == null || divorce.year == null) {
             console.error("Campos no validos");
             res.sendStatus(400);
             return;
         }
     
         db.find({ "province": divorce.province, "year": divorce.year}).toArray((err, divorces) => {
             if (err) {
                 console.error("Error accediendo a la BD mongo");
                 process.exit(1);
             }
     
             if (divorces.length == 0) {
                 db.insert(divorce);
                 console.log("Elemento insertado");
                 res.sendStatus(201);
             }
             else {
                 console.log("El elemento ya existe");
                 res.sendStatus(409);
             }
     
         });
     });
    //--------PUT no permitido
    app.put(BASE_API_PATH + "/divorces-an", (req, res) => {
        console.log(Date() + " - PUT /divorces-an");
        res.sendStatus(405);
    });
    
    //---------DELETE permitido

    app.delete(BASE_API_PATH + "/divorces-an", (req, res) => {
        console.log(Date() + " - DELETE /divorces-an");

        db.remove({});

        res.sendStatus(200);
    });


    
    app.get(BASE_API_PATH + "/divorces-an/:province?", (req, res) => {
        var province = req.params.province;
        var query = req.query;
        console.log(Date() + " - GET /divorces-an/" + province);
            if (req.query.year) {
                query.year = Number(req.query.year);
            }
            if (req.query.divorce) {
                query.divorce = Number(req.query.divorce);
            }
            if (req.query.break) {
                query.break = Number(req.query.break);
            }
            if (req.query.nullity) {
                query.nullity = Number(req.query.nullity);
            }
            
            if(query.year==null){
        db.find({ "province": province}).toArray((err, results) => {
            if (err) {
                console.error("Error accesing DB");
                res.sendStatus(500);
                return;
            }

            res.send(results.map((c) => {
                
                            delete c._id;
                            return c;
                
                        }));

        });
            }else{
                db.find({ "province": province,"year":query.year}).toArray((err, results) => {
            if (err) {
                console.error("Error accesing DB");
                res.sendStatus(500);
                return;
            }

            res.send(results.map((c) => {
                
                            delete c._id;
                            return c;
                
                        }));
                });
            }
    });
    //------------ get busqueda
     app.get(BASE_API_PATH + "/province?", (req, res) => {
        MongoClient.connect(urljurado, function(err, db) {
            if (err) throw err;
            var dbo = db.db("sos1718-jmja-sandbox");
            var query = req.query;
            if (req.query.year) {
                query.year = Number(req.query.year);
            }
            if (req.query.divorce) {
                query.divorce = Number(req.query.divorce);
            }
            if (req.query.break) {
                query.break = Number(req.query.break);
            }
            if (req.query.nullity) {
                query.nullity = Number(req.query.nullity);
            }
            dbo.collection("divorces").find(query).toArray(function(err, result) {
                if (!err && !result.length) {
                    console.log("Not found");
                    res.sendStatus(404);
                }
                else {
                    res.send(result.map((c) => {
                        delete c._id;
                        return c;
                    }));
                }
                db.close();
            });
        });
    });
    
    //-----------------------

   app.get(BASE_API_PATH + "/divorces-an/:province/:year", (req, res) => {
        var province = req.params.province;
        var year = Number(req.params.year);
        console.log(Date() + " - GET /divorces-an/" + province + "/" + year);

        db.find({ "province": province, "year": year }).toArray((err, divorces) => {
            if (err) {
                console.log("Error al acceder a la base de datos mongo");
                res.sendStatus(500);
                return;
            }
             if (divorces.length == 0){
                console.log("Not found");
                res.sendStatus(404);
                return;
            }
            
            res.send(divorces.map((c) => {
                delete c._id;
                return c;
            }));
        });
    });

    

    app.delete(BASE_API_PATH + "/divorces-an/:province", (req, res) => {
        var province = req.params.province;
        console.log(Date() + " - DELETE /divorces-an/" + province);

        db.remove({ "province": province });

        res.sendStatus(200);
    });

    app.delete(BASE_API_PATH + "/divorces-an/:province/:year", (req, res) => {
        var province = req.params.province;
        var year = req.params.year;
        console.log(Date() + " - DELETE /divorces-an/" + province + "/" + year)

        db.remove({ "province": province, "year": year });

        res.sendStatus(200);
    });


    //----- POST NO PERMITIDO
    app.post(BASE_API_PATH + "/divorces-an/:province", (req, res) => {
        var province = req.params.province;
        console.log(Date() + " - POST /divorces-an/" + province);
        res.sendStatus(405);
    });

    //------ POST NO PERMITIDO
    app.post(BASE_API_PATH + "/divorces-an/:province/:year", (req, res) => {
        var province = req.params.province;
        var year = req.params.year;
        console.log(Date() + " - POST /divorces-an/" + province + "/" + year);
        res.sendStatus(405);
    });

    //------PUT NO PERMITIDO
    app.put(BASE_API_PATH + "/divorces-an/:province", (req, res) => {
        var province = req.params.province;
        var divorce = req.body;
        console.log(Date() + " - PUT /divorces-an/" + province);

        res.sendStatus(405);
    });

  /*  app.put(BASE_API_PATH + "/divorces-an/:province/:year", (req, res) => {
        var province = req.params.province;
        var year = req.params.year
        var divorce = req.body;
        console.log(Date() + " - PUT /divorces-an/" + province + "/" + year);
        res.sendStatus(405);
    });*/
    
    //----PUT PERMITIDO
    
     app.put(BASE_API_PATH + "/divorces-an/:province/:year/", (req, res) => {
        var province = req.params.province;
        var year = req.params.year;
        var divorce = req.body;
        var id = divorce._id;
        
        console.log(Date() + " - PUT /divorces-an/" + province + "/" + year);

        if (province != divorce.province || year != divorce.year) {
            res.sendStatus(400);
            console.warn(Date() + "Invalid fields");
            return;
        }
        db.find({ "province": divorce.province, "year": divorce.year}).toArray((err, results) => {
            if (err) {
                console.error("Error accesing DB");
                res.sendStatus(500);
                return;
            }

            if (results[0]._id != id) {
                console.error("The ID does not match")
                res.sendStatus(400);
                return;
            }
            else {
                delete divorce._id;
                db.update({ "province": divorce.province, "year": divorce.year}, divorce, function(err, numUpdate) {
                    if (err) throw err;
                    console.log("Updated: " + numUpdate);
                });
                res.sendStatus(200);
            }

        });
    });
    
    

    
    app.get(BASE_API_PATH + "/secure/divorces-an", (req, res) => {
        
        var apikey= req.headers.apikey;
        if (apikey == "jurado") {
            MongoClient.connect(urljurado, function(err, db) {
                if (err) throw err;
                var dbo = db.db("sos1718-jmja-sandbox");
                dbo.collection("divorces").find().toArray(function(err, result) {
                    if (!err && !result.length) {
                        console.log("Not found");
                        res.sendStatus(404);
                    }
                    else {
                        res.send(result.map((c) => {
                            delete c._id;
                            return c;
                        }));
                    }
                    db.close();
                });
            });
        }
        else {
            console.log("Unauthorized");
            res.sendStatus(401);
        }
    });

    
    
    
    
    //
    
    
    
    


}