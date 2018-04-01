var DivorcesAPI = {};
module.exports = DivorcesAPI;
var BASE_API_PATH = "/api/v1";

DivorcesAPI.register = function(app,db) {

    console.log("Llamada divorces-an");


    var initialDivorces  = [
    { "province": "sevilla", "year": 2016, "divorce": 3973, "break": 203, "nullity": 1 },
    { "province": "cadiz", "year": 2016, "divorce": 2249, "break": 138, "nullity": 0 },
    { "province": "almeria", "year": 2016, "divorce": 1405, "break": 42, "nullity": 1 },
    { "province": "cordoba", "year": 2016, "divorce": 1447, "break": 115, "nullity": 1 },
    { "province": "granada", "year": 2016, "divorce": 1904, "break": 104, "nullity": 2 },
    { "province": "huelva", "year": 2016, "divorce": 1036, "break": 49, "nullity": 3 },
    { "province": "jaen", "year": 2016, "divorce": 1109, "break": 73, "nullity": 1 },
    { "province": "malaga", "year": 2016, "divorce": 3606, "break": 171, "nullity": 3 }

];

    console.log("Registering router for divorces API...")
    app.get(BASE_API_PATH + "/helpdivorces", (req, res) => {
        res.redirect("https://documenter.getpostman.com/view/3897840/divorces-an/RVu1Gq8B");
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

    app.get(BASE_API_PATH + "/divorces-an", (req, res) => {
        console.log(Date() + " - GET /divorces-an");

        db.find({}).toArray((err, results) => {
            if (err) {
                console.error("Error accesing DB");
                res.sendStatus(500);
                return;
            }

            res.send(results.map((c)=>{
                delete c._id;
                return c;
            }));

        });


    });

    app.post(BASE_API_PATH + "/divorces-an", (req, res) => {
        console.log(Date() + " - POST /divorces-an");
        var divorce = req.body;
        db.find({}).toArray((err, results) => {
            if (err) {
                console.error("Error accesing DB");
                process.exit(1);
            }

            if (results.length == 0) {
                console.log("Empty DB");
                db.insert(divorce);
            }
            else {
                console.log("DB inicialiced with " + results.length + " divorces");
            }
        });
        res.sendStatus(201);
    });

    app.put(BASE_API_PATH + "/divorces-an", (req, res) => {
        console.log(Date() + " - PUT /divorces-an");
        res.sendStatus(405);
    });

    app.delete(BASE_API_PATH + "/divorces-an", (req, res) => {
        console.log(Date() + " - DELETE /divorces-an");

        db.remove({});

        res.sendStatus(200);
    });


    app.get(BASE_API_PATH + "/divorces-an/:province/", (req, res) => {
        var province = req.params.province;
        console.log(Date() + " - GET /divorces-an/" + province);

        db.find({ "province": province }).toArray((err, results) => {
            if (err) {
                console.error("Error accesing DB");
                res.sendStatus(500);
                return;
            }

            res.send(results);

        });
    });

    app.get(BASE_API_PATH + "/divorces-an/:province/:year", (req, res) => {
        var province = req.params.province;
        var year = req.params.year;
        console.log(Date() + " - GET /divorces-an/" + province + "/" + year);

        db.find({ "province": province, "year": year }).toArray((err, results) => {
            if (err) {
                console.error("Error accesing DB");
                res.sendStatus(500);
                return;
            }

            res.send(results);

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



    app.post(BASE_API_PATH + "/divorces-an/:province", (req, res) => {
        var province = req.params.province;
        console.log(Date() + " - POST /divorces-an/" + province);
        res.sendStatus(405);
    });

    app.post(BASE_API_PATH + "/divorces-an/:province/:year", (req, res) => {
        var province = req.params.province;
        var year = req.params.year;
        console.log(Date() + " - POST /divorces-an/" + province + "/" + year);
        res.sendStatus(405);
    });


    app.put(BASE_API_PATH + "/divorces-an/:province", (req, res) => {
        var province = req.params.province;
        var divorce = req.body;
        console.log(Date() + " - PUT /divorces-an/" + province);

        res.sendStatus(405);
    });

    app.put(BASE_API_PATH + "/divorces-an/:province/:year", (req, res) => {
        var province = req.params.province;
        var year = req.params.year
        var divorce = req.body;

        console.log(Date() + " - PUT /divorces-an/" + province + "/" + year);

        res.sendStatus(405);
    });

    
}
