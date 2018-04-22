/* global angular */

angular
    .module("ManagerApp")
    .controller("studentEditCtrl", ["$scope","$http","$routeParams","$location", function($scope,$http,$routeParams,$location) {
        console.log("Edit Ctrl initialized!");
        var studentURL = "/api/v2/students-an/"+$routeParams.province+"/"+$routeParams.year+"/"+$routeParams.gender;
        console.log(studentURL);

        $http.get(studentURL).then(function (response){
                $scope.updatedStudent = response.data[0];
                console.log(response.data[0])
        });
        
        $scope.updateStudent = function successCallback(){
            $http.put(studentURL,$scope.updatedStudent).then(function (response){
                $scope.status = "Status: " + response.status;
                console.log($scope.status)
                $location.path("/students-an");
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