var objCrimes = {};
module.exports = objCrimes;

objCrimes.register = function(app, BASE_API_PATH) {

    console.log("Llamada al objeto crimes-an");


    var crimes = [
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
        res.send(crimes);
    });


    app.get(BASE_API_PATH + "/crimes-an/loadInitialData", (req, res) => {
        console.log(Date() + " - GET / crimes-an");
        if (crimes.length == 0) {
            crimes = [
                { "province": "almería", "year": 2007, "gender": "male", "onecrime": 7.01, "twocrime": 1.48, "threecrime": 0.35, "morethreecrime": 0.15 },
                { "province": "málaga", "year": 2007, "gender": "female", "onecrime": 0.48, "twocrime": 0.05, "threecrime": 0.00, "morethreecrime": 0.00 },
                { "province": "sevilla", "year": 2020, "gender": "male", "onecrime": 5.52, "twocrime": 1.52, "threecrime": 0.51, "morethreecrime": 0.33 }
            ];
        }
        res.send(crimes);
    });


    app.post(BASE_API_PATH + "/crimes-an", (req, res) => {
        console.log(Date() + " - POST / crimes-an");
        var crime = req.body;
        crimes.push(crime);
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
        crimes = [];
        res.sendStatus(200);
    });

    //n a recurso concreto
    app.get(BASE_API_PATH + "/crimes-an/:province", (req, res) => {
        var province = req.params.province;
        console.log(Date() + " - GET /crimes-an/" + province);

        res.send(crimes.filter((c) => {
            return (c.province == province);
        })); //el [0] es para devolver solo el primer elemento, aunque debería haber solo uno
    });


    app.get(BASE_API_PATH + "/crimes-an/:province/:year", (req, res) => {
        var province = req.params.province;
        var year = req.params.year;
        console.log(Date() + " - GET /crimes-an/" + province + "/" + year);

        res.send(crimes.filter((c) => {
            return (c.province == province && c.year == year);
        })); //el [0] es para devolver solo el primer elemento, aunque debería haber solo uno
    });


    app.get(BASE_API_PATH + "/crimes-an/:province/:year/:gender", (req, res) => {
        var province = req.params.province;
        var year = req.params.year;
        var gender = req.params.gender;
        console.log(Date() + " - GET /crimes-an/" + province + "/" + year + "/" + gender);

        res.send(crimes.filter((c) => {
            return (c.province == province && c.year == year && c.gender == gender);
        })[0]); //el [0] es para devolver solo el primer elemento, aunque debería haber solo uno
    });


    //n a recurso concreto
    app.delete(BASE_API_PATH + "/crimes-an/:province", (req, res) => {
        var province = req.params.province;
        console.log(Date() + " - DELETE /crimes-an/" + province);

        crimes = crimes.filter((c) => {
            return (c.province != province);
        });

        res.sendStatus(200);
    });


    app.delete(BASE_API_PATH + "/crimes-an/:province/:year", (req, res) => {
        var province = req.params.province;
        var year = req.params.year;
        console.log(Date() + " - DELETE /crimes-an/" + province + "/" + year);

        crimes = crimes.filter((c) => {
            return (c.province != province && c.year != year);
        });

        res.sendStatus(200);
    });



    app.delete(BASE_API_PATH + "/crimes-an/:province/:year/:gender", (req, res) => {
        var province = req.params.province;
        var year = req.params.year;
        var gender = req.params.gender;
        console.log(Date() + " - DELETE /crimes-an/" + province + "/" + year + "/" + gender);

        crimes = crimes.filter((c) => {
            return (c.province != province && c.year != year && c.gender != gender);
        });

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
        var crime = req.body;
        console.log(Date() + " - PUT /crimes-an/" + province);

        if (province != crime.province) {
            res.sendStatus(409);
            console.warn(Date() + " -Hacking attempt!");
            return;
        }

        crimes = crimes.map((c) => {
            if (c.province == crime.province)
                return crime;
            else
                return c;
        });
        res.sendStatus(200);
    });



    app.put(BASE_API_PATH + "/crimes-an/:province/:year", (req, res) => {
        var province = req.params.province;
        var year = req.params.year;
        var crime = req.body;
        console.log(Date() + " - PUT /crimes-an/" + province + "/" + year);

        if (province != crime.province || year != crime.year) {
            res.sendStatus(409);
            console.warn(Date() + " -Hacking attempt!");
            return;
        }

        crimes = crimes.map((c) => {
            if (c.province == crime.province && c.year == crime.year)
                return crime;
            else
                return c;
        });
        res.sendStatus(200);
    });



    app.put(BASE_API_PATH + "/crimes-an/:province/:year/:gender", (req, res) => {
        var province = req.params.province;
        var year = req.params.year;
        var gender = req.params.gender;
        var crime = req.body;
        console.log(Date() + " - PUT /crimes-an/" + province + "/" + year + "/" + gender);

        if (province != crime.province || year != crime.year || gender != crime.gender) {
            res.sendStatus(409);
            console.warn(Date() + " -Hacking attempt!");
            return;
        }

        crimes = crimes.map((c) => {
            if (c.province == crime.province && c.year == crime.year && c.gender == crime.gender)
                return crime;
            else
                return c;
        });
        res.sendStatus(200);
    });


}
