/* global angular */

angular
    .module("ManagerApp")
    .controller("studentSearchCtrl", ["$scope", "$http", "$routeParams", "$location", function($scope, $http, $routeParams, $location) {
        console.log("Edit Ctrl initialized!");
        var studentURL = "/api/v2/students-an";
        console.log(studentURL);


        $scope.search = function() {
            var from = document.getElementById("from").value;
            var to = document.getElementById("to").value;
            $http.get(studentURL + "?from=" + from + "&&to=" + to).then(function successCallback(response) {
                $scope.status = "Status: " + response.status;
                $scope.searchs = response.data;
                $scope.error = "";
            }, function errorCallback(response) {
                console.log(response.status);
                $scope.status = "Status: " + response.status;
                switch (response.status) {
                    case 404:
                        $scope.error = "The table is empty. Fill it and try again";
                        break;
                    default:
                        $scope.error = "Ups, something was wrong. Try it later";
                }
            });
        }

    }]);
