/* global angular */
angular
    .module("ManagerApp")
    .controller("ViewCtrl2", ["$scope", "$http", function($scope, $http) {
        console.log("View Controller initialited");


        $scope.searchWidgetGoogle = function() {

            $http.get("/api/v2/crimes-an/").then(function(response) {
                console.log("Datos: " + response.data);
                console.log("Datoss: " + response.data.map(function(d) { return new Array(d.province, d.onecrime) }));

                google.charts.load('current', {
                    'packages': ['geochart'],
                    // Note: you will need to get a mapsApiKey for your project.
                    // See: https://developers.google.com/chart/interactive/docs/basic_load_libs#load-settings
                    'mapsApiKey': 'AIzaSyAfubp90XvQEvR_G9FoeFgBNluvMMAJWWA'
                });
                google.charts.setOnLoadCallback(drawRegionsMap);

                function drawRegionsMap() {
                    var data = google.visualization.arrayToDataTable([
                        ['Province', 'Crimes'],

                        ['Sevilla', "M[" + response.data.filter(function(m) {return m.year==$scope.widgetGoogle}).filter(function(g) {return g.gender=="male"}).filter(function(g) {return g.province=="sevilla"}).map(function(d) {return d.onecrime}) + "] - F[" + response.data.filter(function(m) {return m.year==$scope.widgetGoogle}).filter(function(g) {return g.gender=="female"}).filter(function(g) {return g.province=="sevilla"}).map(function(d) {return d.onecrime}) + "]"],

                        ['Cadiz', "M[" + response.data.filter(function(m) {return m.year==$scope.widgetGoogle}).filter(function(g) {return g.gender=="male"}).filter(function(g) {return g.province=="cadiz"}).map(function(d) {return d.onecrime}) + "] - F[" +response.data.filter(function(m) {return m.year==$scope.widgetGoogle}).filter(function(g) {return g.gender=="female"}).filter(function(g) {return g.province=="cadiz"}).map(function(d) {return d.onecrime}) + "]"],

                        ['Almeria', "M[" + response.data.filter(function(m) {return m.year==$scope.widgetGoogle}).filter(function(g) {return g.gender=="male"}).filter(function(g) {return g.province=="almeria"}).map(function(d) {return d.onecrime}) + "] - F[" +response.data.filter(function(m) {return m.year==$scope.widgetGoogle}).filter(function(g) {return g.gender=="female"}).filter(function(g) {return g.province=="almeria"}).map(function(d) {return d.onecrime}) + "]"],

                        ['Cordoba', "M[" + response.data.filter(function(m) {return m.year==$scope.widgetGoogle}).filter(function(g) {return g.gender=="male"}).filter(function(g) {return g.province=="cordoba"}).map(function(d) {return d.onecrime}) + "] - F[" +response.data.filter(function(m) {return m.year==$scope.widgetGoogle}).filter(function(g) {return g.gender=="female"}).filter(function(g) {return g.province=="cordoba"}).map(function(d) {return d.onecrime}) + "]"],

                        ['Granada', "M[" + response.data.filter(function(m) {return m.year==$scope.widgetGoogle}).filter(function(g) {return g.gender=="male"}).filter(function(g) {return g.province=="granada"}).map(function(d) {return d.onecrime}) + "] - F[" +response.data.filter(function(m) {return m.year==$scope.widgetGoogle}).filter(function(g) {return g.gender=="female"}).filter(function(g) {return g.province=="granada"}).map(function(d) {return d.onecrime}) + "]"],

                        ['Huelva', "M[" + response.data.filter(function(m) {return m.year==$scope.widgetGoogle}).filter(function(g) {return g.gender=="male"}).filter(function(g) {return g.province=="huelva"}).map(function(d) {return d.onecrime}) + "] - F[" +response.data.filter(function(m) {return m.year==$scope.widgetGoogle}).filter(function(g) {return g.gender=="female"}).filter(function(g) {return g.province=="huelva"}).map(function(d) {return d.onecrime}) + "]"],

                        ['Jaen', "M[" + response.data.filter(function(m) {return m.year==$scope.widgetGoogle}).filter(function(g) {return g.gender=="male"}).filter(function(g) {return g.province=="jaen"}).map(function(d) {return d.onecrime}) + "] - F[" +response.data.filter(function(m) {return m.year==$scope.widgetGoogle}).filter(function(g) {return g.gender=="female"}).filter(function(g) {return g.province=="jaen"}).map(function(d) {return d.onecrime}) + "]"],

                        ['Malaga', "M[" + response.data.filter(function(m) {return m.year==$scope.widgetGoogle}).filter(function(g) {return g.gender=="male"}).filter(function(g) {return g.province=="malaga"}).map(function(d) {return d.onecrime}) + "] - F[" +response.data.filter(function(m) {return m.year==$scope.widgetGoogle}).filter(function(g) {return g.gender=="female"}).filter(function(g) {return g.province=="malaga"}).map(function(d) {return d.onecrime}) + "]"]
                    ]);

                    var options = {
                        region: 'ES',
                        displayMode: 'markers',
                        colorAxis: { colors: ['green', 'blue'] }
                    };

                    var chart = new google.visualization.GeoChart(document.getElementById('regions_div'));

                    chart.draw(data, options);
                }

            });


        };





    }]);