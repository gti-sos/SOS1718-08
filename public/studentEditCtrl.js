/* global angular */

angular
    .module("ContactManagerApp")
    .controller("EditCtrl", ["$scope","$http","$routeParams","$location", function($scope,$http,$routeParams,$location) {
        console.log("Edit Ctrl initialized!");
        var contactURL = "/api/v1/students-an/"+$routeParams.name;

        $http.get(contactURL).then(function (response){
                $scope.updatedContact = response.data;
        });
        
        $scope.updateContact = function (){
            $http.put(contactURL,$scope.updatedContact).then(function (response){
                $scope.status = "Status: " + response.status;
                $location.path("/");
            });
        }
    }]);