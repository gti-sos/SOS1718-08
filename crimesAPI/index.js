var objCrimes = {};
module.exports = objCrimes;

objCrimes.register = function(app, BASE_API_PATH, db) {

    console.log("Llamada al objeto crimes-an");


    var initialCrimes = [
    { "province": "almeria", "year": 2007, "gender": "male", "onecrime": 7.01, "twocrime": 1.48, "threecrime": 0.35, "morethreecrime": 0.15 },
    { "province": "malaga", "year": 2007, "gender": "female", "onecrime": 0.48, "twocrime": 0.05, "threecrime": 0.00, "morethreecrime": 0.00 },
    { "province": "sevilla", "year": 2020, "gender": "male", "onecrime": 5.52, "twocrime": 1.52, "threecrime": 0.51, "morethreecrime": 0.33 }
];


    //Sección ayuda recurso crimes (JOSE ENRIQUE)
    app.get(BASE_API_PATH + "/helpcrimes", (req, res) => {
        res.redirect("https://documenter.getpostman.com/view/3950150/collection/RVnZgdc1");
    });

    app.get(BASE_API_PATH + "/crimes-an", (req, res) => {
        console.log(Date() + " - GET / crimes-an");

        db.find({}).toArray((err, crimes) => {
            if (err) {
                console.log("Error al acceder a la base de datos mongo");
                res.sendStatus(500);
                return;
            }
            res.send(crimes.map((c)=>{
                delete c._id;
                return c;
            }));
        });
    });
    

     app.get(BASE_API_PATH + "/crimes-an/loadInitialData", (req, res) => {
        db.find({}, (err, crimes) => {
            if (err) {
                console.error(" Error accesing DB");
                process.exit(1);
                return;
            }
            db.find({}).toArray((err, crimes) => {
                if (crimes.length == 0) {
                    console.log("Empty DB");
                    db.insert(initialCrimes);
                    res.sendStatus(201);

                }
                else {
                    console.log("DB initialized with " + crimes.length + " crimes");
                    res.sendStatus(200);
                }

            });
        });
    });


    app.post(BASE_API_PATH + "/crimes-an", (req, res) => {
        console.log(Date() + " - POST / crimes-an");
        var crime = req.body;
        db.find({}).toArray((err, results) => {
            if (err) {
                console.error("Error accesing DB");
                process.exit(1);
            }

            db.insert(crime);

        });
        res.sendStatus(201);
    });

    //n
    app.put(BASE_API_PATH + "/crimes-an", (req, res) => {
        console.log(Date() + " - PUT / crimes-an");
        res.sendStatus(405);
    });
    //n
    app.delete(BASE_API_PATH + "/crimes-an", (req, res) => {
        console.log(Date() + " - DELETE / crimes-an");
        
        db.remove({});
        
        res.sendStatus(200);
    });

    //n a recurso concreto
    app.get(BASE_API_PATH + "/crimes-an/:province", (req, res) => {
        var province = req.params.province;
        console.log(Date() + " - GET /crimes-an/" + province);

        db.find({"province":province}).toArray((err, crimes) => {
            if (err) {
                console.log("Error al acceder a la base de datos mongo");
                res.sendStatus(500);
                return;
            }
            res.send(crimes.map((c)=>{
                delete c._id;
                return c;
            }));
        });
    });


    app.get(BASE_API_PATH + "/crimes-an/:province/:year", (req, res) => {
        var province = req.params.province;
        var year = req.params.year;
        console.log(Date() + " - GET /crimes-an/" + province + "/" + year);

         db.find({"province":province, "year":year}).toArray((err, crimes) => {
            if (err) {
                console.log("Error al acceder a la base de datos mongo");
                res.sendStatus(500);
                return;
            }
            res.send(crimes.map((c)=>{
                delete c._id;
                return c;
            }));
        });
    });


    app.get(BASE_API_PATH + "/crimes-an/:province/:year/:gender", (req, res) => {
        var province = req.params.province;
        var year = req.params.year;
        var gender = req.params.gender;
        console.log(Date() + " - GET /crimes-an/" + province + "/" + year + "/" + gender);

         db.find({"province":province, "year":year, "gender":gender}).toArray((err, crimes) => {
            if (err) {
                console.log("Error al acceder a la base de datos mongo");
                res.sendStatus(500);
                return;
            }
            res.send(crimes.map((c)=>{
                delete c._id;
                return c;
            })[0]);
        });
    });


    //n a recurso concreto
    app.delete(BASE_API_PATH + "/crimes-an/:province", (req, res) => {
        var province = req.params.province;
        console.log(Date() + " - DELETE /crimes-an/" + province);

        db.remove({"province":province});

        res.sendStatus(200);
    });


    app.delete(BASE_API_PATH + "/crimes-an/:province/:year", (req, res) => {
        var province = req.params.province;
        var year = req.params.year;
        console.log(Date() + " - DELETE /crimes-an/" + province + "/" + year);

         db.remove({"province":province, "year":year});

        res.sendStatus(200);
    });



    app.delete(BASE_API_PATH + "/crimes-an/:province/:year/:gender", (req, res) => {
        var province = req.params.province;
        var year = req.params.year;
        var gender = req.params.gender;
        console.log(Date() + " - DELETE /crimes-an/" + province + "/" + year + "/" + gender);

        db.remove({"province":province, "year":year, "gender":gender});

        res.sendStatus(200);
    });



    //n a recurso concreto
    app.post(BASE_API_PATH + "/crimes-an/:province", (req, res) => {
        var province = req.params.province;
        console.log(Date() + " - POST / crimes-an" + province);
        res.sendStatus(405);
    });


    app.post(BASE_API_PATH + "/crimes-an/:province/:year", (req, res) => {
        var province = req.params.province;
        var year = req.params.year;
        console.log(Date() + " - POST / crimes-an" + province + "/" + year);
        res.sendStatus(405);
    });


    app.post(BASE_API_PATH + "/crimes-an/:province/:year/:gender", (req, res) => {
        var province = req.params.province;
        var year = req.params.year;
        var gender = req.params.gender;
        console.log(Date() + " - POST / crimes-an" + province + "/" + year + "/" + gender);
        res.sendStatus(405);
    });


    //n a recurso concreto
    app.put(BASE_API_PATH + "/crimes-an/:province", (req, res) => {
        var province = req.params.province;
        console.log(Date() + " - PUT / crimes-an" + province);
        res.sendStatus(405);
    });



    app.put(BASE_API_PATH + "/crimes-an/:province/:year", (req, res) => {
        var province = req.params.province;
        var year = req.params.year;
       console.log(Date() + " - PUT / crimes-an" + province + "/" + year );
        res.sendStatus(405);
    });



    app.put(BASE_API_PATH + "/crimes-an/:province/:year/:gender", (req, res) => {
        var province = req.params.province;
        var year = req.params.year;
        var gender = req.params.gender;
        var crime = req.body;
        var id = crime._id;
        console.log(Date() + " - PUT /crimes-an/" + province + "/" + year + "/" + gender);

        if (province != crime.province || year != crime.year || gender != crime.gender) {
            res.sendStatus(409);
            console.warn(Date() + " - Hacking attempt!");
            return;
        }
        db.find({ "province": crime.province, "year": crime.year, "gender": crime.gender }).toArray((err, results) => {
            if (err) {
                console.error("Error accesing DB");
                res.sendStatus(500);
                return;
            }
            console.log(results[0]._id)

            /*if (results[0]._id != id) {
                console.error("ID no coincide")
                res.sendStatus(400);
                return;
            }*/
            //else {
                delete crime._id;
                db.update({ "province": crime.province, "year": crime.year, "gender": crime.gender }, crime, function(err, numUpdate) {
                    if (err) throw err;
                    console.log("Updated: " + numUpdate);
                });
                res.sendStatus(200);
           // }

        });


    });


}