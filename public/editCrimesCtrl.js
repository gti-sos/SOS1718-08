/* global angular */

angular
    .module("ManagerApp")
    .controller("EditCtrl", ["$scope","$http","$routeParams","$location", function($scope,$http,$routeParams,$location) {
        
        console.log("Edit Ctrl initialized!");
        var direccioncrime = "/api/v1/crimes-an/"+$routeParams.province+"/"+$routeParams.year+"/"+$routeParams.gender;

        $http.get(direccioncrime).then(function (response){
                $scope.updatedCrime = response.data[0];
            
        });
        
        $scope.updateCrime = function successCallback(){
            $http.put(direccioncrime,$scope.updatedCrime).then(function (response){
                $scope.status = response.status;
                console.log($scope.status);
                $location.path("/crimes-an");
                $scope.error="";
            }, function errorCallback(response){
                console.log(response.status);
                $scope.status = response.status;
                switch (response.status) {
                    case 405:
                        $scope.error = "The put method has to be done to a specific resource";
                        break;
                    case 400:
                        $scope.error = "Invalid fields";
                        break;
                    default:
                        $scope.error = "Ups, something was wrong. Try it later";
                }
            });
        }
    }]);