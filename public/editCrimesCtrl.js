    /* global angular */
    angular
        .module("ManagerApp")
        .controller("EditCtrl", ["$scope", "$http", "$routeParams", "$location", function($scope, $http, $routeParams,$location) {
            console.log("Edit Controller initialited");
    
            var direccioncrimen = "/api/v1/crimes-an/" + $routeParams.province+"/"+$routeParams.year+"/"+$routeParams.gender;
    
            //Funcion que crea un contacto nuevo al darle al boton send
           
           
           $http.get(direccioncrimen).then(function (response){
                $scope.updatedCrime = response.data[0];
            });
           
           
            $scope.updateCrime = function(){
            $http.put(direccioncrimen,$scope.updatedCrime).then(function successCallback(response){
                $scope.status = response.status;
                $location.path("/crimes-an");
                $scope.error="";

            },function errorCallback(response) {
                console.log(response.status);
                $scope.status = response.status;
                switch (response.status) {
                    case 404:
                        $scope.error = "The table is empty. Fill it and try again";
                        break;
                    default:
                        $scope.error = "Ups, something was wrong. Try it later";
                }
            });
        };
    
    
    
    
        }]);