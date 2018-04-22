/* global angular */




angular
    .module("ManagerApp")
    .controller("divorceListCtrl", ["$scope", "$http", function($scope, $http) {
        console.log("List Ctrl initialized!");
        var api = "/api/v1/divorces-an";

        $scope.addDivorce = function() {
            $http.post(api, $scope.newDivorce).then(function successCallback(response) {
                $scope.status = "Status: " + response.status;
                getDivorces();
                $scope.error = "";
            }, function errorCallback(response) {
                console.log(response.status)
                $scope.status = "Status: " + response.status;
                switch (response.status) {
                    case 405:
                        $scope.error = "The post method has to be done to a set of resources";
                        break;
                    case 409:
                        $scope.error = "The resource already exists";
                        break;
                    case 400:
                        $scope.error = "Invalid fields";
                        break;
                    default:
                        $scope.error = "Ups, something was wrong. Try it later";
                }
            });
        }

        $scope.deleteDivorce = function(province, year) {
            console.log("Divorce to be deleted: " + province + year);

            $http.delete(api + "/" + province + "/" + year).then(function successCallback(response) {
                $scope.status = "Status: " + response.status;
                getDivorces();
            }, function errorCallback(response) {
                console.log(response.status);
                $scope.status = "Status: " + response.status;
                $scope.error = "Ups, something was wrong. Try it later";
            
            });

        }

        $scope.deleteAll = function() {

            $http.delete(api).then(function successCallback(response) {
                $scope.status = "Status: " + response.status;
                getDivorces();
            }, function errorCallback(response) {
                console.log(response.status);
                $scope.status = "Status: " + response.status;
                $scope.error = "Ups, something was wrong. Try it later";
            });

        }

        $scope.fillTable = function() {

            $http.get(api + "/loadInitialData").then(function successCallback(response) {
                $scope.status = "Status: " + response.status;
                getDivorces();
                $scope.error = ""
            }, function errorCallback(response) {
                console.log(response.status);
                $scope.status = "Status: " + response.status;
                $scope.error = "Ups, something was wrong. Try it later";
            });

        }

        function getDivorces() {
            $http.get(api).then(function successCallback(response) {
                $scope.status = "Status: " + response.status;
                $scope.divorces = response.data;
                $scope.error = "";
            }, function errorCallback(response) {
                console.log(response.status);
                $scope.status = "Status: " + response.status;
                switch (response.status) {
                    case 404:
                        $scope.error = "The table is empty. Fill it and try again";
                        break;
                    default:
                        $scope.error= "Ups, something was wrong. Try it later";
                }
            });
        }

        getDivorces();



    }]);
