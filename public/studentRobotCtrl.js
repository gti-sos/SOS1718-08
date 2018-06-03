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

            $http.get(api2 + "?text=" + $scope.newRobot, {
                headers: { "X-Mashape-Key": "ZxSQLc90EumshVBhUWGyuPTNQBVip1V9aRijsnD5VE0RQUxZC6", "Accept": "text/plain" }

            }).then(function successCallback(response) {
                $scope.url=response.data.imageUrl;
                console.log(response);


            }, function errorCallback(response) {
                console.log(response.status);
                $scope.status = "Status: " + "Something fails";
                $scope.error = "Ups, something was wrong. Try it later";

            });

        }



    }]);
