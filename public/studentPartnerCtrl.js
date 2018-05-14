/* global angular */
/*global Highcharts*/
/*global google*/
/*global Plotly*/

angular
    .module("ManagerApp")
    .controller("studentPartnerCtrl", ["$scope", "$http", function($scope, $http) {
        console.log("View Ctrl initialized!");

        var api = "https://sos1718-08.herokuapp.com/api/v2/students-an";
        var api2 = "https://sos1718-05.herokuapp.com/api/v1/country-stats";

        var proxy = "/api/v2/students-an/";
        var proxy2 = "/proxyMS/api/v1/spanish-universities/";




        $http.get(proxy).then(function(responseMe) {
            $http.get(proxy2).then(function(responsePa) {
                var datau = []
                /* var provinces=["huelva","sevilla","cordoba","jaen","cadiz","malaga","granada","almeria"]
                
                provinces.forEach(function(obj) {

                           var a=responsePa.data.filter(university => university.headquar== obj).map(d => { return (d['nameUniversity'],d['yearFund']) });
                           var b=responseMe.data.filter(student => student.province== obj).map(d => { return (d['popinuniversity']) });
                           datau.push({name: a[0], y: b});

                        });
                        console.log(datau);*/
                var a = responsePa.data.map(d => { return (d['yearFund']) })
                console.log(a)
                a.forEach(function(obj) {

                    if (responsePa.data.filter(student => student.year == parseInt(obj)).map(d => { return (d['popinuniversity']) })) {
                        var name2=responsePa.data.filter(university => university.yearFund==parseInt(obj)).map(d => { return (d['nameUniversity']) });
                        if(!(isNaN(responseMe.data.filter(student => student.year == parseInt(obj)).map(d => { return (d['popinuniversity']) })))){
                            z2=0;
                        }else{
                        var z2= responseMe.data.filter(student => student.year == parseInt(obj)).map(d => { return (d['popinuniversity']) });
                        }
                        datau.push({name: name2,y: parseFloat(obj),z: parseFloat(z2)});
                        
                    };

                });
                console.log(datau);


                Highcharts.chart('container', {
                    chart: {
                        type: 'variablepie'
                    },
                    title: {
                        text: 'Proxy: Universitys and number of students'
                    },
                    tooltip: {
                        headerFormat: '',
                        pointFormat: '<span style="color:{point.color}">●</span> <b> {point.name}</b><br/>' +
                            'Año: <b>{point.y}</b><br/>' +
                            'Número de universitarios: <b>{point.z}</b><br/>'
                    },
                    series: [{
                        minPointSize: 10,
                        innerSize: '20%',
                        zMin: 0,
                        name: 'countries',
                        data: datau
                    }]
                });

            });


        });



        $http.get(api).then(function(responseMe) {
            $http.get(api2).then(function(responsePa) {
                //console.log("funciona")

                var data = [];
                var dataSt = [];
                var dataMs;
                var i;
                for (i = 1950; i < 2018; i++) {
                    if (parseFloat(responseMe.data.filter(student => student.year == i).map(d => { return d['popinuniversity'] }))) {
                        dataSt = responseMe.data.filter(student => student.year == i).map(d => { return d['popinuniversity'] });

                    }
                    else {
                        dataSt = [0]
                    };
                    if (responsePa.data.filter(music => music.year == i).map(d => { return d['title'] })) {
                        dataMs = responsePa.data.filter(music => music.year == i).map(d => { return d['title'] });

                    }
                    else {
                        dataMs = "nothing";
                    };
                    //console.log(dataSt);
                    //console.log(dataMs);
                    var total = 0;

                    dataSt.forEach(function(obj) {

                        total += parseFloat(obj);
                        //console.log(total);


                    });
                    data.push({ name: dataMs, weight: total, year: i })


                }
                //console.log(data);

                Highcharts.chart('container2', {
                    series: [{
                        type: 'wordcloud',
                        data: data,
                        name: 'Occurrences'
                    }],
                    title: {
                        text: 'Without proxy: Number of students in university and best sing in this year'
                    }
                });


            });
        });
    }]);
