var crimesAPI = {};
module.exports = crimesAPI;

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

var initialCrimes = [
    { "province": "almeria", "year": 2007, "gender": "male", "onecrime": 7.01, "twocrime": 1.48, "threecrime": 0.35, "morethreecrime": 0.15 },
    { "province": "malaga", "year": 2012, "gender": "male", "onecrime": 8.60, "twocrime": 1.36, "threecrime": 0.31, "morethreecrime": 0.14 },
    { "province": "cadiz", "year": 2009, "gender": "male", "onecrime": 1.44, "twocrime": 0.18, "threecrime": 0.01, "morethreecrime": 0.00 },
    { "province": "jaen", "year": 2013, "gender": "female", "onecrime": 0.91, "twocrime": 0.07, "threecrime": 0.02, "morethreecrime": 0.01 },
    { "province": "sevilla", "year": 2010, "gender": "male", "onecrime": 6.07, "twocrime": 1.05, "threecrime": 0.24, "morethreecrime": 0.15 },
    { "province": "huelva", "year": 2014, "gender": "female", "onecrime": 1.02, "twocrime": 0.10, "threecrime": 0.01, "morethreecrime": 0.02 }

];

/*#I2------------------------------INICIALIZADOR---------------------------*/

crimesAPI.register = function(app, BASE_API_PATH, db) {

    console.log("Llamada al objeto crimes-an");

    //Sección ayuda recurso crimes (JOSE ENRIQUE)
    app.get(BASE_API_PATH + "/crimes-an/docs", (req, res) => {
        res.redirect("https://documenter.getpostman.com/view/3950150/collection/RVnZgdc1");
    });

    //CARGAR DATOS INICIALES

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
    /*#MP------------------------------METODOS PERMITIDOS---------------------------*/


    /*#GE-----------------------------------GETTERS---------------------------------*/

    //GET A TODOS LOS RECURSOS
    app.get(BASE_API_PATH + "/crimes-an", (req, res) => {
        console.log(Date() + " - GET / crimes-an");

        db.find({}).toArray((err, crimes) => {
            if (err) {
                console.log("Error al acceder a la base de datos mongo");
                res.sendStatus(500);
                return;
            }
            if (crimes.length == 0){
                console.log("BD vacia");
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
    app.get(BASE_API_PATH + "/crimes-an/:province", (req, res) => {
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
     app.get(BASE_API_PATH + "/crimes-an/:province/:year", (req, res) => {
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
    app.get(BASE_API_PATH + "/crimes-an/:province/:year/:gender", (req, res) => {
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
     app.post(BASE_API_PATH + "/crimes-an", (req, res) => {
         console.log(Date() + " - POST / crimes-an");
         var crime = req.body;
         if (crime.province == null || crime.year == null || crime.gender == null) {
             console.error("Campos no validos");
             res.sendStatus(400);
             return;
         }
     
         db.find({ "province": crime.province, "year": crime.year, "gender": crime.year }).toArray((err, crimes) => {
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
     app.put(BASE_API_PATH + "/crimes-an/:province/:year/:gender", (req, res) => {
         var province = req.params.province;
         var year = req.params.year;
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
     app.delete(BASE_API_PATH + "/crimes-an", (req, res) => {
        console.log(Date() + " - DELETE / crimes-an");

        db.remove({});

        res.sendStatus(200);
    });

    //BORRAR UN SUBCONJUNTO DE RECURSOS
     app.delete(BASE_API_PATH + "/crimes-an/:province", (req, res) => {
        var province = req.params.province;
        console.log(Date() + " - DELETE /crimes-an/" + province);

        db.remove({ "province": province });

        res.sendStatus(200);
    });
    
    //BORRAR UN SUBCONJUNTO DE RECURSOS
    app.delete(BASE_API_PATH + "/crimes-an/:province/:year", (req, res) => {
        var province = req.params.province;
        var year = req.params.year;
        console.log(Date() + " - DELETE /crimes-an/" + province + "/" + year);

        db.remove({ "province": province, "year": year });

        res.sendStatus(200);
    });
    
    //BORRAR UN RECURSO CONCRETO
    app.delete(BASE_API_PATH + "/crimes-an/:province/:year/:gender", (req, res) => {
        var province = req.params.province;
        var year = req.params.year;
        var gender = req.params.gender;
        console.log(Date() + " - DELETE /crimes-an/" + province + "/" + year + "/" + gender);

        db.remove({ "province": province, "year": year, "gender": gender });

        res.sendStatus(200);
    });

    /*#MN------------------------------METODOS NO PERMITIDOS---------------------------*/

    /*#PU------------------------------PUTS---------------------------*/

    app.put(BASE_API_PATH + "/crimes-an", (req, res) => {
        console.log(Date() + " - PUT / crimes-an");
        res.sendStatus(405);
    });
    
    app.put(BASE_API_PATH + "/crimes-an/:province", (req, res) => {
        var province = req.params.province;
        console.log(Date() + " - PUT / crimes-an" + province);
        res.sendStatus(405);
    });
    
     app.put(BASE_API_PATH + "/crimes-an/:province/:year", (req, res) => {
        var province = req.params.province;
        var year = req.params.year;
        console.log(Date() + " - PUT / crimes-an" + province + "/" + year);
        res.sendStatus(405);
    });
    
    /*#PO------------------------------POSTS---------------------------*/


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
};