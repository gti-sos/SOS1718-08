/* global angular */
/*global Highcharts*/
/*global google*/
/*global Plotly*/
/*global CanvasJS*/
/*global tree*/

angular
    .module("ManagerApp")
    .controller("studentMemeCtrl", ["$scope", "$http", function($scope, $http) {
        console.log("Bike Ctrl initialized!");


        var api = "https://sos1718-08.herokuapp.com/api/v2/students-an";
        var api2 = "https://ronreiter-meme-generator.p.mashape.com/images";

        var proxy = "/api/v2/students-an/";
        //var proxy2 = "/proxyBI/networks";

        /*$http.get('www.google.com/someapi', {
            headers: {'Authorization': 'Basic QWxhZGRpbjpvcGVuIHNlc2FtZQ=='}
        });*/


        $http.get(proxy).then(function(responseMe) {
            $http.get(api2, {
                headers: { "X-Mashape-Key": "ZxSQLc90EumshVBhUWGyuPTNQBVip1V9aRijsnD5VE0RQUxZC6", "Accept": "text/plain" }

            }).then(function(responsePa) {

                // console.log(responsePa.status, responsePa);
                console.log(responsePa.data[0]);


                $scope.imagen = responsePa.data;



                google.charts.load('current', { 'packages': ['treemap'] });
                google.charts.setOnLoadCallback(drawChart);

                var datau = [
                    ['Location', 'Parent', 'Market trade volume (size)', 'Market increase/decrease (color)'],
                    ['Global', null, 0, 0],
                    ['huelva', 'Global', 0, 0],
                    ['sevilla', 'Global', 0, 0],
                    ['cordoba', 'Global', 0, 0],
                    ['jaen', 'Global', 0, 0],
                    ['cadiz', 'Global', 0, 0],
                    ['malaga', 'Global', 0, 0],
                    ['granada', 'Global', 0, 0],
                    ['almeria', 'Global', 0, 0]
                ];
                for (var i = 0; i < (responseMe.data).length; i++) {

                    datau.push([responsePa.data[i], responseMe.data[i].province, responseMe.data[i].popinuniversity, responseMe.data[i].pophigheducation]);

                }
                console.log(datau);

                function drawChart() {
                    var data = google.visualization.arrayToDataTable(datau);

                    tree = new google.visualization.TreeMap(document.getElementById('chart_div'));

                    tree.draw(data, {
                        minColor: '#f00',
                        midColor: '#ddd',
                        maxColor: '#0d0',
                        headerHeight: 15,
                        fontColor: 'black',
                        showScale: true
                    });

                }





            });


        });

    }]);
