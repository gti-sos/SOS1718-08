var crimesAPI = {};
module.exports = crimesAPI;

/* INDICE PARA EL BUSCADOR. PULSAR CTR + F Y ESCRIBIR EL DIMINUTIVO A LA IZQUIERDA*/
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

var initialCrimes = [
    { "province": "almeria", "year": 2007, "gender": "male", "onecrime": 7.01, "twocrime": 1.48, "threecrime": 0.35, "morethreecrime": 0.15 },
    { "province": "malaga", "year": 2012, "gender": "male", "onecrime": 8.60, "twocrime": 1.36, "threecrime": 0.31, "morethreecrime": 0.14 },
    { "province": "cadiz", "year": 2009, "gender": "male", "onecrime": 1.44, "twocrime": 0.18, "threecrime": 0.01, "morethreecrime": 0.00 },
    { "province": "jaen", "year": 2013, "gender": "female", "onecrime": 0.91, "twocrime": 0.07, "threecrime": 0.02, "morethreecrime": 0.01 },
    { "province": "sevilla", "year": 2010, "gender": "male", "onecrime": 6.07, "twocrime": 1.05, "threecrime": 0.24, "morethreecrime": 0.15 },
    { "province": "huelva", "year": 2014, "gender": "female", "onecrime": 1.02, "twocrime": 0.10, "threecrime": 0.01, "morethreecrime": 0.02 }

];

/*#I2------------------------------INICIALIZADOR---------------------------*/

crimesAPI.register = function(app, BASE_API_PATH1, db) {

    console.log("Llamada al objeto crimes-an");

    //Sección ayuda recurso crimes (JOSE ENRIQUE)
    app.get(BASE_API_PATH1 + "/crimes-an/docs", (req, res) => {
        res.redirect("https://documenter.getpostman.com/view/3950150/collection/RVnZgdc1");
    });

    //CARGAR DATOS INICIALES

    app.get(BASE_API_PATH1 + "/crimes-an/loadInitialData", (req, res) => {
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
    /*#MP------------------------------METODOS PERMITIDOS---------------------------*/


    /*#GE-----------------------------------GETTERS---------------------------------*/

    //GET A TODOS LOS RECURSOS
    app.get(BASE_API_PATH1 + "/crimes-an", (req, res) => {
        console.log(Date() + " - GET /crimes-an");
        var limit = parseInt(req.query.limit);
        var offset = parseInt(req.query.offset);

        //BUSQUEDA
        var afrom = Number(req.query.from);
        var ato = Number(req.query.to);
        var province = req.query.province;
        var year = Number(req.query.year);
        var gender = req.query.gender;
        var query = "";
        var onecrime = Number(req.query.onecrime);
        var twocrime = Number(req.query.twocrime);
        var threecrime = Number(req.query.threecrime);
        var morethreecrime = Number(req.query.morethreecrime);

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
                                        if (onecrime && twocrime && threecrime && morethreecrime) {
                                            db.find({ "onecrime": onecrime, "twocrime": twocrime, "threecrime": threecrime, "morethreecrime": morethreecrime }).skip(offset).limit(limit).toArray((err, results) => {
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
                                            if (onecrime) {

                                                db.find({ "onecrime": onecrime }).skip(offset).limit(limit).toArray((err, results) => {
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
                                                if (twocrime) {

                                                    db.find({ "twocrime": twocrime }).skip(offset).limit(limit).toArray((err, results) => {
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
                                                    if (threecrime) {
                                                        db.find({ "threecrime": threecrime }).skip(offset).limit(limit).toArray((err, results) => {
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
                                                        if (morethreecrime) {

                                                            db.find({ "morethreecrime": morethreecrime }).skip(offset).limit(limit).toArray((err, results) => {
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
    app.get(BASE_API_PATH1 + "/crimes-an/:province", (req, res) => {
        var province = req.params.province;
        console.log(Date() + " - GET /crimes-an/" + province);

        db.find({ "province": province }).toArray((err, crimes) => {
            if (err) {
                console.log("Error al acceder a la base de datos mongo");
                res.sendStatus(500);
                return;
            }
            if (crimes.length == 0){
                console.log("Not found");
                res.sendStatus(404);
                return;
            }
            
            res.send(crimes.map((c) => {
                delete c._id;
                return c;
            }));
        });
    });

    //GET A UN SUBCONJUNTO DE RECURSOS
     app.get(BASE_API_PATH1 + "/crimes-an/:province/:year", (req, res) => {
        var province = req.params.province;
        var year = Number(req.params.year);
        console.log(Date() + " - GET /crimes-an/" + province + "/" + year);

        db.find({ "province": province, "year": year }).toArray((err, crimes) => {
            if (err) {
                console.log("Error al acceder a la base de datos mongo");
                res.sendStatus(500);
                return;
            }
             if (crimes.length == 0){
                console.log("Not found");
                res.sendStatus(404);
                return;
            }
            
            res.send(crimes.map((c) => {
                delete c._id;
                return c;
            }));
        });
    });
    
    //GET A UN RECURSO CONCRETO
    app.get(BASE_API_PATH1 + "/crimes-an/:province/:year/:gender", (req, res) => {
        var province = req.params.province;
        var year = Number(req.params.year);
        var gender = req.params.gender;
        console.log(Date() + " - GET /crimes-an/" + province + "/" + year + "/" + gender);

        db.find({ "province": province, "year": year, "gender": gender }).toArray((err, crimes) => {
            if (err) {
                console.log("Error al acceder a la base de datos mongo");
                res.sendStatus(500);
                return;
            }
            if (crimes.length == 0){
                console.log("Not found");
                res.sendStatus(404);
                return;
            } 
            
            res.send(crimes.map((c) => {
                delete c._id;
                return c;
            })[0]);
        });
    });
    
    /*#PP------------------------------POST Y PUT PERMITIDOS---------------------------*/

    //CREAR UN NUEVO RECURSO
     app.post(BASE_API_PATH1 + "/crimes-an", (req, res) => {
         console.log(Date() + " - POST / crimes-an");
         var crime = req.body;
         if (crime.province == null || crime.year == null || crime.gender == null) {
             console.error("Campos no validos");
             res.sendStatus(400);
             return;
         }
     
         db.find({ "province": crime.province, "year": crime.year, "gender": crime.gender }).toArray((err, crimes) => {
             if (err) {
                 console.error("Error accediendo a la BD mongo");
                 process.exit(1);
             }
     
             if (crimes.length == 0) {
                 db.insert(crime);
                 console.log("Elemento insertado");
                 res.sendStatus(201);
             }
             else {
                 console.log("El elemento ya existe");
                 res.sendStatus(409);
             }
     
         });
     });
     
     //ACTUALIZAR UN RECURSO CONCRETO
     app.put(BASE_API_PATH1 + "/crimes-an/:province/:year/:gender", (req, res) => {
         var province = req.params.province;
         var year = Number(req.params.year);
         var gender = req.params.gender;
         var crime = req.body;
     
         console.log(Date() + " - PUT /crimes-an/" + province + "/" + year + "/" + gender);
     
         if (province != crime.province || year != crime.year || gender != crime.gender) {
             res.sendStatus(400);
             console.warn(Date() + " - Hacking attempt!");
             return;
         }
         db.update({ "province": crime.province, "year": crime.year, "gender": crime.gender }, crime, function(err, numUpdate) {
             if (err) throw err;
             console.log("Updated: " + numUpdate);
         });
         res.sendStatus(200);
     });

    /*#DE------------------------------DELETES---------------------------*/

    //BORRAR TODOS LOS RECURSOS
     app.delete(BASE_API_PATH1 + "/crimes-an", (req, res) => {
        console.log(Date() + " - DELETE / crimes-an");

        db.remove({});

        res.sendStatus(200);
    });

    //BORRAR UN SUBCONJUNTO DE RECURSOS
     app.delete(BASE_API_PATH1 + "/crimes-an/:province", (req, res) => {
        var province = req.params.province;
        console.log(Date() + " - DELETE /crimes-an/" + province);

        db.remove({ "province": province });

        res.sendStatus(200);
    });
    
    //BORRAR UN SUBCONJUNTO DE RECURSOS
    app.delete(BASE_API_PATH1 + "/crimes-an/:province/:year", (req, res) => {
        var province = req.params.province;
        var year = Number(req.params.year);
        console.log(Date() + " - DELETE /crimes-an/" + province + "/" + year);

        db.remove({ "province": province, "year": year });

        res.sendStatus(200);
    });
    
    //BORRAR UN RECURSO CONCRETO
    app.delete(BASE_API_PATH1 + "/crimes-an/:province/:year/:gender", (req, res) => {
        var province = req.params.province;
        var year = Number(req.params.year);
        var gender = req.params.gender;
        console.log(Date() + " - DELETE /crimes-an/" + province + "/" + year + "/" + gender);

        db.remove({ "province": province, "year": year, "gender": gender });

        res.sendStatus(200);
    });

    /*#MN------------------------------METODOS NO PERMITIDOS---------------------------*/

    /*#PU------------------------------PUTS---------------------------*/

    app.put(BASE_API_PATH1 + "/crimes-an", (req, res) => {
        console.log(Date() + " - PUT / crimes-an");
        res.sendStatus(405);
    });
    
    app.put(BASE_API_PATH1 + "/crimes-an/:province", (req, res) => {
        var province = req.params.province;
        console.log(Date() + " - PUT / crimes-an" + province);
        res.sendStatus(405);
    });
    
     app.put(BASE_API_PATH1 + "/crimes-an/:province/:year", (req, res) => {
        var province = req.params.province;
        var year = Number(req.params.year);
        console.log(Date() + " - PUT / crimes-an" + province + "/" + year);
        res.sendStatus(405);
    });
    
    /*#PO------------------------------POSTS---------------------------*/


    app.post(BASE_API_PATH1 + "/crimes-an/:province", (req, res) => {
        var province = req.params.province;
        console.log(Date() + " - POST / crimes-an" + province);
        res.sendStatus(405);
    });
    
    app.post(BASE_API_PATH1 + "/crimes-an/:province/:year", (req, res) => {
        var province = req.params.province;
        var year = Number(req.params.year);
        console.log(Date() + " - POST / crimes-an" + province + "/" + year);
        res.sendStatus(405);
    });

    app.post(BASE_API_PATH1 + "/crimes-an/:province/:year/:gender", (req, res) => {
        var province = req.params.province;
        var year = Number(req.params.year);
        var gender = req.params.gender;
        console.log(Date() + " - POST / crimes-an" + province + "/" + year + "/" + gender);
        res.sendStatus(405);
    });
    
    //Búsqueda y Paginación
    
    /*
    //Búsqueda
     app.get(BASE_API_PATH + "/crimes-an?", (req, res) => {
            var dbo = db.db("sos1718-jepm-sandbox");
            var query = req.query;
            if (req.query.year) {
                query.year = Number(req.query.year);
            }
            if (req.query.gender) {
                query.gender = req.query.gender;
            }
            if (req.query.onecrime) {
                query.onecrime = Number(req.query.onecrime);
            }
            if (req.query.twocrime) {
                query.twocrime = Number(req.query.twocrime);
            }
            if (req.query.threecrimecrime) {
                query.threecrimecrime = Number(req.query.threecrimecrime);
            }
            if (req.query.morethreecrimecrime) {
                query.morethreecrimecrime = Number(req.query.morethreecrimecrime);
            }
            dbo.collection("crimes-an").find(query).toArray(function(err, result) {
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
    
    
    
    */
    
    
    
    //Paginación
    
   /* app.get(BASE_API_PATH + "crimes-an/:dato", (req, res) => {

        var limit = parseInt(req.query.limit);
        var offset = parseInt(req.query.offset);
        var from = req.query.yearFund;
        var to = req.query.yearFund;
        var anyo = req.query.year;
        var province = req.query.province;
        var gender = req.query.gender;

        var aux = [];
        var aux2 = [];
        var dato = req.params.dato

        if (limit || offset >= 0) {
            db.find({ $or: [{ "province": dato }, { "year": dato }, { "gender": dato }] }).skip(offset).limit(limit).toArray(function(err, crimes) {
                if (err) {
                    console.log("Error al acceder a la base de datos mongo");
                    res.sendStatus(500);
                    return;
                }
                else {

                    if (crimes.length == 0) {
                        console.log("Not found");
                        res.sendStatus(404);
                        return;
                    }

                    if (from || to || anyo || province || gender) {
                        aux = busqueda(crimes, aux, from, to, anyo, province, gender);
                        if (aux.length > 0) {
                            aux2 = aux.slice(offset, offset + limit);
                            res.send(aux2);
                        }
                        else {
                            res.sendStatus(404);
                        }
                    }
                    else {
                        res.send(crimes);
                    }
                }


            });
        }


    });*/
    
    
    
    /*
    
    //GET A TODOS LOS RECURSOS
    app.get(BASE_API_PATH + "/crimes-an", (req, res) => {
        console.log(Date() + " - GET /crimes-an");
        var limit = parseInt(req.query.limit);
        var offset = parseInt(req.query.offset);

        //BUSQUEDA
        var afrom = Number(req.query.from);
        var ato = Number(req.query.to);
        var province = req.query.province;
        var year = Number(req.query.year);
        var gender = req.query.gender;
        var query = "";

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
                                else{
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
                                else{
                    
                                    db.find({}).skip(offset).limit(limit).toArray((err, results) => {
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
                                }
                                
                            }
                        }
                    }
                }
            }
        }



    });
    
    */
    
    
    
    
    
};