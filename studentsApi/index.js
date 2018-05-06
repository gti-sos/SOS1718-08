var studentsApi = {}
var BASE_API_PATH = "/api/v2";
module.exports = studentsApi;

/*INDICE PARA EL BUSCADOR. PULSAR CTR + F Y ESCRIBIR EL DIMINUTIVO A LA IZQUIERDA*/
/* 
#I1 -----> INSERCION INICIAL
#I2 -----> INICIALIZADOR 
#MP -----> METODOS PERMITIDOS
#GE -----> GETTERS
#BU -----> BÚSQUEDAS
#PP -----> POST Y PUT PERMITIDOS
#DE -----> DELETES
#MN -----> METODOS NO PERMITIDOS
#PU -----> PUTS NO PERMITIDOS
#PO -----> POST NO PERMITIDOS
*/

/*#I1------------------------------INSERCION INICIAL---------------------------*/
var initialStudents = [{ "province": "sevilla", "year": 2008, "gender": "male", "popilliterate": 16.32, "pophigheducation": 182.9, "popinuniversity": 30.493 },
    { "province": "cadiz", "year": 2008, "gender": "female", "popilliterate": 28.70, "pophigheducation": 97.06, "popinuniversity": 10.766 },
    { "province": "sevilla", "year": 2008, "gender": "both", "popilliterate": 56.53, "pophigheducation": 378.78, "popinuniversity": 66.325 },
    { "province": "granada", "year": 2010, "gender": "male", "popilliterate": 10.02, "pophigheducation": 81.99, "popinuniversity": 54.024 },
    { "province": "granada", "year": 2011, "gender": "female", "popilliterate": 23.86, "pophigheducation": 91.26, "popinuniversity": 22.905 },
    { "province": "granada", "year": 2011, "gender": "both", "popilliterate": 53.86, "pophigheducation": 191.26, "popinuniversity": 44.405 },
    
    { "province": "cordoba", "year": 2008, "gender": "male", "popilliterate": 16.32, "pophigheducation": 182.9, "popinuniversity": 30.493 },
    { "province": "jaen", "year": 2008, "gender": "female", "popilliterate": 28.70, "pophigheducation": 97.06, "popinuniversity": 10.766 },
    { "province": "almeria", "year": 2008, "gender": "both", "popilliterate": 56.53, "pophigheducation": 378.78, "popinuniversity": 66.325 },
    { "province": "huelva", "year": 2010, "gender": "male", "popilliterate": 10.02, "pophigheducation": 81.99, "popinuniversity": 54.024 },
    { "province": "huelva", "year": 2011, "gender": "female", "popilliterate": 23.86, "pophigheducation": 91.26, "popinuniversity": 22.905 },
    { "province": "huelva", "year": 2011, "gender": "both", "popilliterate": 53.86, "pophigheducation": 191.26, "popinuniversity": 44.405 },
    
    { "province": "malaga", "year": 2008, "gender": "male", "popilliterate": 16.32, "pophigheducation": 182.9, "popinuniversity": 30.493 },
    { "province": "malaga", "year": 2008, "gender": "female", "popilliterate": 28.70, "pophigheducation": 97.06, "popinuniversity": 10.766 },
    { "province": "huelva", "year": 2008, "gender": "both", "popilliterate": 56.53, "pophigheducation": 378.78, "popinuniversity": 66.325 },
    { "province": "sevilla", "year": 2010, "gender": "male", "popilliterate": 10.02, "pophigheducation": 81.99, "popinuniversity": 54.024 },
    { "province": "sevilla", "year": 2011, "gender": "female", "popilliterate": 23.86, "pophigheducation": 91.26, "popinuniversity": 22.905 },
    { "province": "sevilla", "year": 2011, "gender": "both", "popilliterate": 53.86, "pophigheducation": 191.26, "popinuniversity": 44.405 }

];

/*#I2------------------------------INICIALIZADOR---------------------------*/

studentsApi.register = function(app, db) {

    console.log("Registering router for students API...")
    app.get(BASE_API_PATH + "/students-an/docs", (req, res) => {
        res.redirect("https://documenter.getpostman.com/view/3891289/sos1718-08-students-an/RW1XKMBs");
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
        var limit = parseInt(req.query.limit);
        var offset = parseInt(req.query.offset);

        //BUSQUEDA
        var afrom = Number(req.query.from);
        var ato = Number(req.query.to);
        var year = Number(req.query.year);
        var province = req.query.province;
        var gender = req.query.gender;
        var popilliterate = Number(req.query.popilliterate);
        var pophigheducation = Number(req.query.pophigheducation);
        var popinuniversity = Number(req.query.popinuniversity);

        if (popilliterate && pophigheducation && popinuniversity) {
            db.find({ "popilliterate": popilliterate, "pophigheducation": pophigheducation, "popinuniversity": popinuniversity }).skip(offset).limit(limit).toArray((err, results) => {
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
        }
        else {
            if (afrom && ato && province && gender) {
                db.find({ "year": { "$gte": afrom, "$lte": ato }, "province": province, "gender": gender }).skip(offset).limit(limit).toArray((err, results) => {
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

            }
            else {

                if (afrom && ato && gender) {
                    db.find({ "year": { "$gte": afrom, "$lte": ato }, "gender": gender }).skip(offset).limit(limit).toArray((err, results) => {
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

                }
                else {
                    if (afrom && ato && province) {
                        db.find({ "year": { "$gte": afrom, "$lte": ato }, "province": province }).skip(offset).limit(limit).toArray((err, results) => {
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

                    }
                    else {

                        if (province && gender) {
                            db.find({ "province": province, "gender": gender }).skip(offset).limit(limit).toArray((err, results) => {
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

                        }
                        else {


                            if (afrom && ato) {

                                db.find({ "year": { "$gte": afrom, "$lte": ato } }).skip(offset).limit(limit).toArray((err, results) => {
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
                            }
                            else {


                                if (province) {
                                    db.find({ "province": province }).skip(offset).limit(limit).toArray((err, results) => {
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
                                }
                                else {

                                    if (gender) {
                                        db.find({ "gender": gender }).skip(offset).limit(limit).toArray((err, results) => {
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

                                    }
                                    else {
                                        if (year) {
                                            db.find({ "year": year }).skip(offset).limit(limit).toArray((err, results) => {
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

                                        }
                                        else {
                                            if (popilliterate) {
                                                db.find({ "popilliterate": popilliterate }).skip(offset).limit(limit).toArray((err, results) => {
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

                                            }
                                            else {
                                                if (pophigheducation) {
                                                    db.find({ "pophigheducation": pophigheducation }).skip(offset).limit(limit).toArray((err, results) => {
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

                                                }
                                                else {
                                                    if (popinuniversity) {
                                                        db.find({ "popinuniversity": popinuniversity }).skip(offset).limit(limit).toArray((err, results) => {
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

                                                    }

                                                    else {
                                                        db.find({}).skip(offset).limit(limit).toArray((err, results) => {
                                                            if (err) {
                                                                console.error("Error accesing DB");
                                                                res.sendStatus(500);
                                                                return;
                                                            }
                                                            /*DELETE ALL*/
                                                            if (results.length == 0) {
                                                                console.log("Empty DB")
                                                                res.sendStatus(200);
                                                                return [];
                                                            }
                                                            res.send(results.map((c) => {
                                                                delete c._id;
                                                                return c;
                                                            }));
                                                        });
                                                    }
                                                }

                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }



    });

    //GET A UN SUBCONJUNTO DE RECURSOS
    app.get(BASE_API_PATH + "/students-an/:province", (req, res) => {
        var province = req.params.province;
        console.log(Date() + " - GET /students-an/" + province);
        //PAGINACION
        var limit = parseInt(req.query.limit);
        var offset = parseInt(req.query.offset);

        db.find({ "province": province }).skip(offset).limit(limit).toArray((err, results) => {
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
        var year = Number(req.params.year);
        console.log(Date() + " - GET /students-an/" + province + "/" + year);
        var limit = parseInt(req.query.limit);
        var offset = parseInt(req.query.offset);

        db.find({ "province": province, "year": year }).skip(offset).limit(limit).toArray((err, results) => {
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
        var year = Number(req.params.year);
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
    /*#I2------------------------------BUSQUEDAS---------------------------*/
    /*  app.get(BASE_API_PATH + "/students-an?", (req, res) => {
          var query = req.query
          console.log(Date() + " - BUSQUEDA /students-an/");
           if (req.query.province) {
               query.province = Number(req.query.province);
           }
           if (req.query.year) {
               query.year = Number(req.query.year);
           }
           if (req.query.gender) {
               query.gender = Number(req.query.gender);
           }

          db.find(query).toArray((err, results) => {
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
      });*/

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
        var year = Number(req.params.year)
        var gender = req.params.gender
        var student = req.body;

        console.log(Date() + " - PUT /students-an/" + province + "/" + year + "/" + gender);

        if (province != student.province || year != student.year || gender != student.gender || isNaN(student.popilliterate) ||
            isNaN(student.pophigheducation) || isNaN(student.popinuniversity)) {
            res.sendStatus(400);
            console.warn(Date() + "Invalid fields");
            return;
        }
        db.update({ "province": student.province, "year": student.year, "gender": student.gender }, student, function(err, numUpdate) {
            if (err) throw err;
            console.log("Updated: " + numUpdate);
        });
        res.sendStatus(200);
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
        var year = Number(req.params.year);
        console.log(Date() + " - DELETE /students-an/" + province + "/" + year)

        db.remove({ "province": province, "year": year });

        res.sendStatus(200);
    });

    //Borrar un recurso concreto
    app.delete(BASE_API_PATH + "/students-an/:province/:year/:gender", (req, res) => {
        var province = req.params.province;
        var year = Number(req.params.year);
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
        var year = Number(req.params.year);
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
        var year = Number(req.params.year);
        console.log(Date() + " - POST /students-an/" + province + "/" + year);
        res.sendStatus(405);
    });

    app.post(BASE_API_PATH + "/students-an/:province/:year/:gender", (req, res) => {
        var province = req.params.province;
        var year = Number(req.params.year);
        var gender = req.params.gender;
        console.log(Date() + " - POST /students-an/" + province + "/" + year + "/" + gender);
        res.sendStatus(405);
    });
};
