/* global angular */
/*global Highcharts*/
/*global google*/
/*global Plotly*/
/*global CanvasJS*/
/*global tree*/

angular
    .module("ManagerApp")
    .controller("studentRobotCtrl", ["$scope", "$http", function($scope, $http) {
        console.log("Bike Ctrl initialized!");


        var api = "https://sos1718-08.herokuapp.com/api/v2/students-an";
        var api2 = "https://robohash.p.mashape.com/index.php";

        var proxy = "/api/v2/students-an/";
        //var proxy2 = "/proxyBI/networks";

        /*$http.get('www.google.com/someapi', {
            headers: {'Authorization': 'Basic QWxhZGRpbjpvcGVuIHNlc2FtZQ=='}
        });*/




        $scope.robot = function() {
            $http.get(proxy).then(function(responseMe) {
                $http.get(api2 + "?text=" + $scope.newRobot, {
                    headers: { "X-Mashape-Key": "ZxSQLc90EumshVBhUWGyuPTNQBVip1V9aRijsnD5VE0RQUxZC6", "Accept": "text/plain" }

                }).then(function successCallback(response) {
                        $scope.url = response.data.imageUrl;
                        console.log(response);

                        var dataPoints = [];

                        var chart = new CanvasJS.Chart("chartContainer", {
                            animationEnabled: true,
                            theme: "light2", // "light1", "light2", "dark1", "dark2"
                            exportEnabled: true,
                            title: {
                                text: "Universities"
                            },
                            subtitles: [{
                                text: "Weekly Averages"
                            }],
                            axisX: {
                                interval: 1,
                                valueFormatString: "MMM"
                            },
                            axisY: {
                                includeZero: false,
                                prefix: "$",
                                title: "Price"
                            },
                            toolTip: {
                                content: "Date: {x}<br /><strong>Population:</strong><br />pophigheducation: {y[0]}, Close: {y[3]}<br />popinuniversity: {y[1]}, popilliterate: {y[2]}"
                            },
                            data: [{
                                type: "candlestick",
                                yValueFormatString: "$##0.00",
                                dataPoints: dataPoints
                            }]
                        });

                        var datau = [];

                        datau.push(responseMe.data.filter(m => m.province == $scope.newRobot));

                        console.log(datau);

                        for (var i = 0; i < datau[0].length; i++) {
                            console.log(datau[0][i]);


                            dataPoints.push({
                                x: new Date(
                                    datau[0][i].year,
                                    parseInt(2),
                                    parseInt(1)
                                ),
                                y: [
                                    datau[0][i].pophigheducation,
                                    datau[0][i].popinuniversity,
                                    datau[0][i].popilliterate,
                                    parseFloat(1)
                                ]
                            })
                        };


                        chart.render();





                    },
                    function errorCallback(response) {
                        console.log(response.status);
                        $scope.status = "Status: " + "Something fails";
                        $scope.error = "Ups, something was wrong. Try it later";

                    });
            });

        }



    }]);
