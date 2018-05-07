/* global angular */
/*global Highcharts*/
/*global google*/
/*global Plotly*/

angular
    .module("ManagerApp")
    .controller("studentViewCtrl", ["$scope", "$http", function($scope, $http) {
        console.log("View Ctrl initialized!");

        var api = "/api/v2/students-an";

        var sort_by = function(field, reverse, primer) {

            var key = primer ?
                function(x) { return primer(x[field]) } :
                function(x) { return x[field] };

            reverse = !reverse ? 1 : -1;

            return function(a, b) {
                return a = key(a), b = key(b), reverse * ((a > b) - (b > a));
            }
        }


        $http.get(api).then(function(response) {
            console.log(response.data.sort(sort_by('province', false, function(a) { return a.toUpperCase() })));

            var colors = Highcharts.getOptions().colors;
            Highcharts.chart('container', {

                chart: {
                    type: 'streamgraph',
                    marginBottom: 30,
                    zoomType: 'x'
                },

                // Make sure connected countries have similar colors
                colors: [
                    colors[0],
                    colors[1],
                    colors[2],
                    colors[3],
                    colors[4],

                    Highcharts.color(colors[5]).brighten(0.2).get(),
                    Highcharts.color(colors[5]).brighten(0.1).get(),

                    colors[5],
                    colors[6],
                    colors[7],
                    colors[8],
                    colors[9],
                    colors[0],
                    colors[1],
                    colors[3],

                    Highcharts.color(colors[2]).brighten(-0.1).get(),
                    Highcharts.color(colors[2]).brighten(-0.2).get(),
                    Highcharts.color(colors[2]).brighten(-0.3).get()
                ],

                title: {
                    floating: false,
                    align: 'center',
                    text: "Population's education"
                },
                subtitle: {
                    floating: false,
                    align: 'center',
                    y: 30,
                    text: "Population's education in Andalucia"
                },

                xAxis: {
                    maxPadding: 0,
                    type: 'category',
                    crosshair: true,

                    categories: response.data.map(function(student) { return student.province + " " + (parseInt(student.year)) + " " + student.gender }),

                    labels: {
                        align: 'left',
                        reserveSpace: true,
                        rotation: 270
                    },
                    lineWidth: 0,
                    margin: 30,
                    tickWidth: 0,
                    bottom: 100
                },

                yAxis: {
                    visible: false,
                    startOnTick: false,
                    endOnTick: false
                },

                legend: {
                    enabled: false,
                    align: 'left',
                    margin: 50
                },

                plotOptions: {
                    series: {
                        label: {
                            minFontSize: 5,
                            maxFontSize: 15,
                            style: {
                                color: 'rgba(255,255,255,0.75)'
                            }
                        }
                    }
                },


                series: [{
                    name: 'Illiterate',
                    data: response.data.map(function(student) { return student["popilliterate"] })
                }, {
                    name: 'High education',
                    data: response.data.map(function(student) { return student["pophigheducation"] })
                }, {
                    name: 'University',
                    data: response.data.map(function(student) { return student["popinuniversity"] })
                }],

                exporting: {
                    sourceWidth: 800,
                    sourceHeight: 600
                }

            });







            /*GOOGLE*/

            $scope.searchWidget = function() {
                google.charts.load('current', {
                    'packages': ['geochart'],
                    // Note: you will need to get a mapsApiKey for your project.
                    // See: https://developers.google.com/chart/interactive/docs/basic_load_libs#load-settings
                    'mapsApiKey': 'AIzaSyBNcsOalftGDb_doJqi7ZleOkMQv5ijWIg'
                });
                google.charts.setOnLoadCallback(drawRegionsMap);

                function drawRegionsMap() {
                    var pete = 0;
                    if (!(parseFloat(response.data.filter(student => student.province == "sevilla" && student.year == $scope.widget.year && student.gender == $scope.widget.gender).map(d => { return d['pophigheducation'] })))) {
                        pete = 0;
                    }
                    else {
                        pete = parseFloat(response.data.filter(student => student.province == "sevilla" && student.year == $scope.widget.year && student.gender == $scope.widget.gender).map(d => { return d['pophigheducation'] }));
                    }
                    console.log(pete);

                    var huelva = 0;
                    if (!(parseFloat(response.data.filter(student => student.province == "huelva" && student.year == $scope.widget.year && student.gender == $scope.widget.gender).map(d => { return d['pophigheducation'] })))) {
                        huelva = 0;
                    }
                    else {
                        huelva = parseFloat(response.data.filter(student => student.province == "huelva" && student.year == $scope.widget.year && student.gender == $scope.widget.gender).map(d => { return d['pophigheducation'] }));
                    }

                    var huelva1 = 0;
                    if (!(parseFloat(response.data.filter(student => student.province == "huelva" && student.year == $scope.widget.year && student.gender == $scope.widget.gender).map(d => { return d['pophigheducation'] })))) {
                        huelva1 = 0;
                    }
                    else {
                        huelva1 = parseFloat(response.data.filter(student => student.province == "huelva" && student.year == $scope.widget.year && student.gender == $scope.widget.gender).map(d => { return d['pophigheducation'] }));
                    }

                    var sevilla = 0;
                    if (!(parseFloat(response.data.filter(student => student.province == "sevilla" && student.year == $scope.widget.year && student.gender == $scope.widget.gender).map(d => { return d['pophigheducation'] })))) {
                        sevilla = 0;
                    }
                    else {
                        sevilla = parseFloat(response.data.filter(student => student.province == "sevilla" && student.year == $scope.widget.year && student.gender == $scope.widget.gender).map(d => { return d['pophigheducation'] }));
                    }

                    var sevilla1 = 0;
                    if (!(parseFloat(response.data.filter(student => student.province == "sevilla" && student.year == $scope.widget.year && student.gender == $scope.widget.gender).map(d => { return d['pophigheducation'] })))) {
                        sevilla1 = 0;
                    }
                    else {
                        sevilla1 = parseFloat(response.data.filter(student => student.province == "sevilla" && student.year == $scope.widget.year && student.gender == $scope.widget.gender).map(d => { return d['pophigheducation'] }));
                    }

                    var cordoba = 0;
                    if (!(parseFloat(response.data.filter(student => student.province == "cordoba" && student.year == $scope.widget.year && student.gender == $scope.widget.gender).map(d => { return d['pophigheducation'] })))) {
                        cordoba = 0;
                    }
                    else {
                        cordoba = parseFloat(response.data.filter(student => student.province == "cordoba" && student.year == $scope.widget.year && student.gender == $scope.widget.gender).map(d => { return d['pophigheducation'] }));
                    }

                    var cordoba1 = 0;
                    if (!(parseFloat(response.data.filter(student => student.province == "cordoba" && student.year == $scope.widget.year && student.gender == $scope.widget.gender).map(d => { return d['pophigheducation'] })))) {
                        cordoba1 = 0;
                    }
                    else {
                        cordoba1 = parseFloat(response.data.filter(student => student.province == "cordoba" && student.year == $scope.widget.year && student.gender == $scope.widget.gender).map(d => { return d['pophigheducation'] }));
                    }

                    var jaen = 0;
                    if (!(parseFloat(response.data.filter(student => student.province == "jaen" && student.year == $scope.widget.year && student.gender == $scope.widget.gender).map(d => { return d['pophigheducation'] })))) {
                        jaen = 0;
                    }
                    else {
                        jaen = parseFloat(response.data.filter(student => student.province == "jaen" && student.year == $scope.widget.year && student.gender == $scope.widget.gender).map(d => { return d['pophigheducation'] }));
                    }

                    var jaen1 = 0;
                    if (!(parseFloat(response.data.filter(student => student.province == "jaen" && student.year == $scope.widget.year && student.gender == $scope.widget.gender).map(d => { return d['pophigheducation'] })))) {
                        jaen1 = 0;
                    }
                    else {
                        jaen1 = parseFloat(response.data.filter(student => student.province == "jaen" && student.year == $scope.widget.year && student.gender == $scope.widget.gender).map(d => { return d['pophigheducation'] }));
                    }

                    var cadiz = 0;
                    if (!(parseFloat(response.data.filter(student => student.province == "cadiz" && student.year == $scope.widget.year && student.gender == $scope.widget.gender).map(d => { return d['pophigheducation'] })))) {
                        cadiz = 0;
                    }
                    else {
                        cadiz = parseFloat(response.data.filter(student => student.province == "cadiz" && student.year == $scope.widget.year && student.gender == $scope.widget.gender).map(d => { return d['pophigheducation'] }));
                    }

                    var cadiz1 = 0;
                    if (!(parseFloat(response.data.filter(student => student.province == "cadiz" && student.year == $scope.widget.year && student.gender == $scope.widget.gender).map(d => { return d['pophigheducation'] })))) {
                        cadiz1 = 0;
                    }
                    else {
                        cadiz1 = parseFloat(response.data.filter(student => student.province == "cadiz" && student.year == $scope.widget.year && student.gender == $scope.widget.gender).map(d => { return d['pophigheducation'] }));
                    }

                    var granada = 0;
                    if (!(parseFloat(response.data.filter(student => student.province == "granada" && student.year == $scope.widget.year && student.gender == $scope.widget.gender).map(d => { return d['pophigheducation'] })))) {
                        granada = 0;
                    }
                    else {
                        granada = parseFloat(response.data.filter(student => student.province == "granada" && student.year == $scope.widget.year && student.gender == $scope.widget.gender).map(d => { return d['pophigheducation'] }));
                    }
                    var granada1 = 0;
                    if (!(parseFloat(response.data.filter(student => student.province == "granada" && student.year == $scope.widget.year && student.gender == $scope.widget.gender).map(d => { return d['pophigheducation'] })))) {
                        granada1 = 0;
                    }
                    else {
                        granada1 = parseFloat(response.data.filter(student => student.province == "granada" && student.year == $scope.widget.year && student.gender == $scope.widget.gender).map(d => { return d['pophigheducation'] }));
                    }

                    var almeria = 0;
                    if (!(parseFloat(response.data.filter(student => student.province == "almeria" && student.year == $scope.widget.year && student.gender == $scope.widget.gender).map(d => { return d['pophigheducation'] })))) {
                        almeria = 0;
                    }
                    else {
                        almeria = parseFloat(response.data.filter(student => student.province == "almeria" && student.year == $scope.widget.year && student.gender == $scope.widget.gender).map(d => { return d['pophigheducation'] }));
                    }
                    var almeria1 = 0;
                    if (!(parseFloat(response.data.filter(student => student.province == "almeria" && student.year == $scope.widget.year && student.gender == $scope.widget.gender).map(d => { return d['pophigheducation'] })))) {
                        almeria1 = 0;
                    }
                    else {
                        almeria1 = parseFloat(response.data.filter(student => student.province == "almeria" && student.year == $scope.widget.year && student.gender == $scope.widget.gender).map(d => { return d['pophigheducation'] }));
                    }

                    var malaga = 0;
                    if (!(parseFloat(response.data.filter(student => student.province == "malaga" && student.year == $scope.widget.year && student.gender == $scope.widget.gender).map(d => { return d['pophigheducation'] })))) {
                        malaga = 0;
                    }
                    else {
                        malaga = parseFloat(response.data.filter(student => student.province == "malaga" && student.year == $scope.widget.year && student.gender == $scope.widget.gender).map(d => { return d['pophigheducation'] }));
                    }
                    var malaga1 = 0;
                    if (!(parseFloat(response.data.filter(student => student.province == "malaga" && student.year == $scope.widget.year && student.gender == $scope.widget.gender).map(d => { return d['pophigheducation'] })))) {
                        malaga1 = 0;
                    }
                    else {
                        malaga1 = parseFloat(response.data.filter(student => student.province == "malaga" && student.year == $scope.widget.year && student.gender == $scope.widget.gender).map(d => { return d['pophigheducation'] }));
                    }
                    var data = google.visualization.arrayToDataTable([
                        ['City', 'Illiterate', 'High Education'],
                        ['Sevilla', sevilla, sevilla1],

                        ['Cadiz', cadiz, cadiz1],

                        ['Almeria', almeria, almeria1],

                        ['Cordoba', cordoba, cordoba1],

                        ['Granada', granada, granada1],

                        ['Huelva', huelva, huelva1],

                        ['Jaen', jaen, jaen1],

                        ['Malaga', malaga, malaga1],
                    ]);

                    var options = {
                        region: 'ES',
                        displayMode: 'markers',
                        colorAxis: { colors: ['gray', '#90ed7d'] }
                    };

                    var chart = new google.visualization.GeoChart(document.getElementById('regions_div'));

                    chart.draw(data, options);
                }
            };
















            $scope.searchWidget1 = function() {
                var lista=['huelva', 'sevilla', 'cordoba', 'jaen', 'cadiz', 'malaga', 'granada', 'almeria'];
                
                var phe =[];
                
                for (var i=0; i<lista.length; i++){
                    console.log(lista[i]);
                    console.log($scope.widget1.year);
                    console.log($scope.widget1.gender);
                     if (!(parseFloat(response.data.filter(student => student.province == lista[i] && student.year == $scope.widget1.year && student.gender == $scope.widget1.gender).map(d => { return d['pophigheducation'] })))) {
                        phe.push(0);
                        console.log(0);
                    }
                    else {
                        phe.push(parseFloat(response.data.filter(student => student.province == lista[i] && student.year == $scope.widget1.year && student.gender == $scope.widget1.gender).map(d => { return d['pophigheducation'] })));
                        console.log("Hola paco" + parseFloat(response.data.filter(student => student.province == lista[i] && student.year == $scope.widget1.year && student.gender == $scope.widget1.gender).map(d => { return d['pophigheducation'] })))
                    }
                }
                
                console.log("Esta es pi"+phe);
                
                var pi =[];
               
                for (var i=0; i<lista.length; i++){
                     if (!(parseFloat(response.data.filter(student => student.province == lista[i] && student.year == $scope.widget1.year && student.gender == $scope.widget1.gender).map(d => { return d['popilliterate'] })))) {
                        pi.push(0);
                    }
                    else {
                        pi.push(parseFloat(response.data.filter(student => student.province == lista[i] && student.year == $scope.widget1.year && student.gender == $scope.widget1.gender).map(d => { return d['popilliterate'] })));
                    }
                }
                
                
                
                var pun =[];
                
                for (var i=0; i<lista.length; i++){
                     if (!(parseFloat(response.data.filter(student => student.province == lista[i] && student.year == $scope.widget1.year && student.gender == $scope.widget1.gender).map(d => { return d['popinuniversity'] })))) {
                        pun.push(0);
                    }
                    else {
                        pun.push(parseFloat(response.data.filter(student => student.province == lista[i] && student.year == $scope.widget1.year && student.gender == $scope.widget1.gender).map(d => { return d['popinuniversity'] })));
                    }
                }
                var illiterate = {
                    x: ['Huelva', 'Sevilla', 'Cordoba', 'Jaen', 'Cadiz', 'Malaga', 'Granada', 'Almeria'],
                    y: pi,
                    type: 'bar',
                    name: 'Illiterate',
                    marker: {
                        color: 'rgb(49,130,189)',
                        opacity: 0.7,
                    }
                };

                var higheducation = {
                    x: ['Huelva', 'Sevilla', 'Cordoba', 'Jaen', 'Cadiz', 'Malaga', 'Granada', 'Almeria'],
                    y: phe,
                    type: 'bar',
                    name: 'High education',
                    marker: {
                        color: '#7cb5ed',
                        opacity: 0.5
                    }
                };
                
                var university = {
                    x: ['Huelva', 'Sevilla', 'Cordoba', 'Jaen', 'Cadiz', 'Malaga', 'Granada', 'Almeria'],
                    y: pun,
                    type: 'bar',
                    name: 'University',
                    marker: {
                        color: '#90ed7d',
                        opacity: 0.5
                    }
                };

                var data = [illiterate, higheducation, university];

                var layout = {
                    title: "Population's education in a bar graph",
                    xaxis: {
                        tickangle: -45
                    },
                    barmode: 'group'
                };

                Plotly.newPlot('myDiv', data, layout);
            }

        });
    }]);
