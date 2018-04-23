/* global angular */

angular
    .module("ManagerApp")
    .controller("divorceEditCtrl", ["$scope","$http","$routeParams","$location", function($scope,$http,$routeParams,$location) {
        console.log("Edit Ctrl initialized!");
        var divorceURL = "/api/v1/divorces-an/"+$routeParams.province+"/"+$routeParams.year;
        console.log(divorceURL);

        $http.get(divorceURL).then(function (response){
                $scope.updatedDivorce = response.data[0];
                console.log(response.data[0])
        });
        
         $scope.updateDivorce = function successCallback(){
            $http.put(divorceURL,$scope.updatedDivorce).then(function (response){
                $scope.status = "Status: " + response.status;
                window.alert("Actualizado con exito");
                console.log($scope.status)
                $location.path("/divorces-an");
                $scope.error=""
            }, function errorCallback(response){
                console.log(response.status);
                $scope.status = "Status: " + response.status;
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