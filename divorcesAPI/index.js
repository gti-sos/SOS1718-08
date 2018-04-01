var objDivorces = {};
module.exports = objDivorces;

objDivorces.register = function(app, BASE_API_PATH) {

    console.log("Llamada al objeto divorces-an");


    var divorces = [
    { "province": "sevilla", "year": 2016, "divorce": 3973, "break": 203, "nullity": 1 },
    { "province": "cadiz", "year": 2016, "divorce": 2249, "break": 138, "nullity": 0 },
    { "province": "almeria", "year": 2016, "divorce": 1405, "break": 42, "nullity": 1 },
    { "province": "cordoba", "year": 2016, "divorce": 1447, "break": 115, "nullity": 1 },
    { "province": "granada", "year": 2016, "divorce": 1904, "break": 104, "nullity": 2 },
    { "province": "huelva", "year": 2016, "divorce": 1036, "break": 49, "nullity": 3 },
    { "province": "jaen", "year": 2016, "divorce": 1109, "break": 73, "nullity": 1 },
    { "province": "malaga", "year": 2016, "divorce": 3606, "break": 171, "nullity": 3 }

];


    //Sección ayuda recurso divorces (JURADO)
    app.get(BASE_API_PATH + "/helpdivorces", (req, res) => {
        res.redirect("https://documenter.getpostman.com/view/3897840/divorces-an/RVu1Gq8B");
    });

    app.get(BASE_API_PATH + "/divorces-an", (req, res) => {
        console.log(Date() + " - GET / divorces-an");
        res.send(divorces);
    });


    app.get(BASE_API_PATH + "/divorces-an/loadInitialData", (req, res) => {
        console.log(Date() + " - GET / divorces-an");
        if (divorces.length == 0) {
            divorces = [
                { "province": "sevilla", "year": 2016, "divorce": 3973, "break": 203, "nullity": 1 },
                { "province": "cadiz", "year": 2016, "divorce": 2249, "break": 138, "nullity": 0 },
                { "province": "almeria", "year": 2016, "divorce": 1405, "break": 42, "nullity": 1 },
                { "province": "cordoba", "year": 2016, "divorce": 1447, "break": 115, "nullity": 1 },
                { "province": "granada", "year": 2016, "divorce": 1904, "break": 104, "nullity": 2 },
                { "province": "huelva", "year": 2016, "divorce": 1036, "break": 49, "nullity": 3 },
                { "province": "jaen", "year": 2016, "divorce": 1109, "break": 73, "nullity": 1 },
                { "province": "malaga", "year": 2016, "divorce": 3606, "break": 171, "nullity": 3 }
 ];
        }
        res.send(divorces);
    });


    app.post(BASE_API_PATH + "/divorces-an", (req, res) => {
        console.log(Date() + " - POST / divorces-an");
        var crime = req.body;
        divorces.push(crime);
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
        })); 
    });


    app.get(BASE_API_PATH + "/divorces-an/:province/:year", (req, res) => {
        var province = req.params.province;
        var year = req.params.year;
        console.log(Date() + " - GET /divorces-an/" + province + "/" + year);

        res.send(divorces.filter((c) => {
            return (c.province == province && c.year == year);
        })); 
    });


       app.delete(BASE_API_PATH + "/divorces-an/:province", (req, res) => {
        var province = req.params.province;
        console.log(Date() + " - DELETE /divorces-an/" + province);

        divorces = divorces.filter((c) => {
            return (c.province != province);
        });

        res.sendStatus(200);
    });


    app.delete(BASE_API_PATH + "/divorces-an/:province/:year", (req, res) => {
        var province = req.params.province;
        var year = req.params.year;
        console.log(Date() + " - DELETE /divorces-an/" + province + "/" + year);

        divorces = divorces.filter((c) => {
            return (c.province != province && c.year != year);
        });

        res.sendStatus(200);
    });



    /////////////////////////   POST  ////////////////////////////
    app.post(BASE_API_PATH + "/divorces-an/:province", (req, res) => {
        var province = req.params.province;
        console.log(Date() + " - POST / divorces-an" + province);
        res.sendStatus(405);
    });


    app.post(BASE_API_PATH + "/divorces-an/:province/:year", (req, res) => {
        var province = req.params.province;
        var year = req.params.year;
        console.log(Date() + " - POST / divorces-an" + province + "/" + year);
        res.sendStatus(405);
    });


  

 /////////////////////////   PUT    ////////////////////////////
    app.put(BASE_API_PATH + "/divorces-an/:province", (req, res) => {
        var province = req.params.province;
        var crime = req.body;
        console.log(Date() + " - PUT /divorces-an/" + province);

        if (province != crime.province) {
            res.sendStatus(409);
            console.warn(Date() + " -Hacking attempt!");
            return;
        }

        divorces = divorces.map((c) => {
            if (c.province == crime.province)
                return crime;
            else
                return c;
        });
        res.sendStatus(200);
    });



    app.put(BASE_API_PATH + "/divorces-an/:province/:year", (req, res) => {
        var province = req.params.province;
        var year = req.params.year;
        var crime = req.body;
        console.log(Date() + " - PUT /divorces-an/" + province + "/" + year);

        if (province != crime.province || year != crime.year) {
            res.sendStatus(409);
            console.warn(Date() + " -Hacking attempt!");
            return;
        }

        divorces = divorces.map((c) => {
            if (c.province == crime.province && c.year == crime.year)
                return crime;
            else
                return c;
        });
        res.sendStatus(200);
    });



   


}
