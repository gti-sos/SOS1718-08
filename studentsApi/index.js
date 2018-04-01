var studentsApi = {}
var BASE_API_PATH = "/api/v1";
module.exports = studentsApi;

/*INDICE PARA EL BUSCADOR. PULSAR CTR + F Y ESCRIBIR EL DIMINUTIVO A LA IZQUIERDA*/
/* 
#I1 -----> INSERCION INICIAL
#I2 -----> INICIALIZADOR 
#MP -----> METODOS PERMITIDOS
#GE -----> GETTERS
#PP -----> POST Y PUT PERMITIDOS
#DE -----> DELETES
#MN -----> METODOS NO PERMITIDOS
#PU -----> PUTS NO PERMITIDOS
#PO -----> POST NO PERMITIDOS
*/

/*#I1------------------------------INSERCION INICIAL---------------------------*/
var initialStudents = [{ "province": "sevilla", "year": "2008", "gender": "male", "pop-illiterate": "16.32", "pop-high-education": "182.9", "pop-in-university": "30493" },
    { "province": "cadiz", "year": "2008", "gender": "female", "pop-illiterate": "28.70", "pop-high-education": "97.06", "pop-in-university": "10766" },
    { "province": "sevilla", "year": "2008", "gender": "both", "pop-illiterate": "56.53", "pop-high-education": "378.78", "pop-in-university": "66325" },
    { "province": "granada", "year": "2010", "gender": "male", "pop-illiterate": "10.02", "pop-high-education": "81.99", "pop-in-university": "54024" },
    { "province": "granada", "year": "2011", "gender": "female", "pop-illiterate": "23.86", "pop-high-education": "91.26", "pop-in-university": "22905" },
    { "province": "granada", "year": "2011", "gender": "both", "pop-illiterate": "53.86", "pop-high-education": "191.26", "pop-in-university": "44405" }

];

/*#I2------------------------------INICIALIZADOR---------------------------*/

studentsApi.register = function(app, db) {

    console.log("Registering router for students API...")
    app.get(BASE_API_PATH + "/docs", (req, res) => {
        res.redirect("https://documenter.getpostman.com/view/3891289/sos1718-08-studentsan/RVu1HAue");
    });

    //CARGAR DATOS INICIALES
    app.get(BASE_API_PATH + "/students-an/loadInitialData", (req, res) => {
        db.find({}, (err, students) => {
            if (err) {
                console.error(" Error accesing DB");
                process.exit(1);
                return;
            }
            db.find({}).toArray((err, students) => {
                if (students.length == 0) {
                    console.log("Empty DB");
                    db.insert(initialStudents);
                    res.sendStatus(201);

                }
                else {
                    console.log("DB initialized with " + students.length + " students");
                    res.sendStatus(200);
                }

            });
        });
    });
    /*#MP------------------------------METODOS PERMITIDOS---------------------------*/


    /*#GE-----------------------------------GETTERS---------------------------------*/

    //GET A TODOS LOS RECURSOS
    app.get(BASE_API_PATH + "/students-an", (req, res) => {
        console.log(Date() + " - GET /students-an");

        db.find({}).toArray((err, results) => {
            if (err) {
                console.error("Error accesing DB");
                res.sendStatus(500);
                return;
            }
            if (results.length == 0) {
                console.log("Empty DB")
                res.sendStatus(404);
                return;
            }
            res.send(results.map((c) => {
                delete c._id;
                return c;
            }));
        });
    });

    //GET A UN SUBCONJUNTO DE RECURSOS
    app.get(BASE_API_PATH + "/students-an/:province/", (req, res) => {
        var province = req.params.province;
        console.log(Date() + " - GET /students-an/" + province);

        db.find({ "province": province }).toArray((err, results) => {
            if (err) {
                console.error("Error accesing DB");
                res.sendStatus(500);
                return;
            }
            if (results.length == 0) {
                console.log("Not found")
                res.sendStatus(404);
                return;
            }

            res.send(results.map((c) => {
                delete c._id;
                return c;
            }));
        });
    });

    //GET A UN SUBCONJUNTO DE RECURSOS
    app.get(BASE_API_PATH + "/students-an/:province/:year", (req, res) => {
        var province = req.params.province;
        var year = req.params.year;
        console.log(Date() + " - GET /students-an/" + province + "/" + year);

        db.find({ "province": province, "year": year }).toArray((err, results) => {
            if (err) {
                console.error("Error accesing DB");
                res.sendStatus(500);
                return;
            }
            if (results.length == 0) {
                console.log("Not found")
                res.sendStatus(404);
                return;
            }

            res.send(results.map((c) => {
                delete c._id;
                return c;
            }));
        });
    });

    //GET A UN RECURSO CONCRETO
    app.get(BASE_API_PATH + "/students-an/:province/:year/:gender", (req, res) => {
        var province = req.params.province;
        var year = req.params.year;
        var gender = req.params.gender;
        console.log(Date() + " - GET /students-an/" + province + "/" + year + "/" + gender);

        db.find({ "province": province, "year": year, "gender": gender }).toArray((err, results) => {
            if (err) {
                console.error("Error accesing DB");
                res.sendStatus(500);
                return;
            }

            if (results.length == 0) {
                console.log("Not found")
                res.sendStatus(404);
                return;
            }

            res.send(results.map((c) => {
                delete c._id;
                return c;
            }));

        });
    });
    /*#PP------------------------------POST Y PUT PERMITIDOS---------------------------*/

    //CREAR UN NUEVO RECURSO
    app.post(BASE_API_PATH + "/students-an", (req, res) => {
        console.log(Date() + " - POST /students-an");
        var student = req.body;
        if (student.province == null || student.year == null || student.gender == null) {
            console.error("Invalid fields");
            res.sendStatus(400);
            return;
        }

        db.find({ "province": student.province, "year": student.year, "gender": student.gender }).toArray((err, results) => {
            if (err) {
                console.error("Error accesing DB");
                process.exit(1);
            }

            if (results.length == 0) {
                db.insert(student);
                console.log("Inserted element");
                res.sendStatus(201);
            }

            else {
                console.log("The resource already exists");
                res.sendStatus(409);

            }
        });

    });

    //ACTUALIZAR UN RECURSO CONCRETO
    app.put(BASE_API_PATH + "/students-an/:province/:year/:gender", (req, res) => {
        var province = req.params.province;
        var year = req.params.year
        var gender = req.params.gender
        var student = req.body;
        var id = student._id;
        
        console.log(Date() + " - PUT /students-an/" + province + "/" + year + "/" + gender);

        if (province != student.province || year != student.year || gender != student.gender) {
            res.sendStatus(400);
            console.warn(Date() + "Invalid fields");
            return;
        }
        db.find({ "province": student.province, "year": student.year, "gender": student.gender }).toArray((err, results) => {
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
                delete student._id;
                db.update({ "province": student.province, "year": student.year, "gender": student.gender }, student, function(err, numUpdate) {
                    if (err) throw err;
                    console.log("Updated: " + numUpdate);
                });
                res.sendStatus(200);
            }

        });
    });

    /*#DE------------------------------DELETES---------------------------*/

    //Borrar todos los recursos
    app.delete(BASE_API_PATH + "/students-an", (req, res) => {
        console.log(Date() + " - DELETE /students-an");

        db.remove({});

        res.sendStatus(200);
    });

    //Borrar un subconjunto de recursos
    app.delete(BASE_API_PATH + "/students-an/:province", (req, res) => {
        var province = req.params.province;
        console.log(Date() + " - DELETE /students-an/" + province);

        db.remove({ "province": province });

        res.sendStatus(200);
    });

    //Borrar un subconjunto de recursos
    app.delete(BASE_API_PATH + "/students-an/:province/:year", (req, res) => {
        var province = req.params.province;
        var year = req.params.year;
        console.log(Date() + " - DELETE /students-an/" + province + "/" + year)

        db.remove({ "province": province, "year": year });

        res.sendStatus(200);
    });

    //Borrar un recurso concreto
    app.delete(BASE_API_PATH + "/students-an/:province/:year/:gender", (req, res) => {
        var province = req.params.province;
        var year = req.params.year;
        var gender = req.params.gender;
        console.log(Date() + " - DELETE /students-an/" + province + "/" + year + "/" + gender);

        db.remove({ "province": province, "year": year, "gender": gender });

        res.sendStatus(200);
    });

    /*#MN------------------------------METODOS NO PERMITIDOS---------------------------*/

    /*#PU------------------------------PUTS---------------------------*/

    app.put(BASE_API_PATH + "/students-an", (req, res) => {
        console.log(Date() + " - PUT /students-an");
        res.sendStatus(405);
    });

    app.put(BASE_API_PATH + "/students-an/:province", (req, res) => {
        var province = req.params.province;
        console.log(Date() + " - PUT /students-an/" + province);

        res.sendStatus(405);
    });

    app.put(BASE_API_PATH + "/students-an/:province/:year", (req, res) => {
        var province = req.params.province;
        var year = req.params.year
        console.log(Date() + " - PUT /students-an/" + province + "/" + year);

        res.sendStatus(405);
    });

    /*#PO------------------------------POSTS---------------------------*/


    app.post(BASE_API_PATH + "/students-an/:province", (req, res) => {
        var province = req.params.province;
        console.log(Date() + " - POST /students-an/" + province);
        res.sendStatus(405);
    });

    app.post(BASE_API_PATH + "/students-an/:province/:year", (req, res) => {
        var province = req.params.province;
        var year = req.params.year;
        console.log(Date() + " - POST /students-an/" + province + "/" + year);
        res.sendStatus(405);
    });

    app.post(BASE_API_PATH + "/students-an/:province/:year/:gender", (req, res) => {
        var province = req.params.province;
        var year = req.params.year;
        var gender = req.params.gender;
        console.log(Date() + " - POST /students-an/" + province + "/" + year + "/" + gender);
        res.sendStatus(405);
    });
};
