/* global angular */
angular
    .module("ManagerApp")
    .controller("ViewCtrl2", ["$scope", "$http", function($scope, $http) {
        console.log("View Controller initialited");

        $http.get("/api/v2/crimes-an/").then(function(response) {
        console.log("Datos: " + response.data);
        console.log("Datoss: " +  response.data.map(function(d) { return new Array(d.province, d.onecrime)}));

        google.charts.load('current', {
        'packages': ['geochart'],
        // Note: you will need to get a mapsApiKey for your project.
        // See: https://developers.google.com/chart/interactive/docs/basic_load_libs#load-settings
        });
        google.charts.setOnLoadCallback(drawRegionsMap);

        function drawRegionsMap() {
        var data = google.visualization.arrayToDataTable([
            ['Province', 'Popularity'],
            response.data.map(function(d) { return new Array(d.province, d.onecrime)})
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
        //############################################################




        }]);