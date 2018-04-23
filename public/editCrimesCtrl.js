    /* global angular */
    angular
        .module("CrimesManagerApp")
        .controller("EditCtrl", ["$scope", "$http", "$routeParams", "$location", function($scope, $http, $routeParams,$location) {
            console.log("Edit Controller initialited");
    
            var direccioncrimen = "/api/v1/crimes-an/" + $routeParams.province;
    
            //Funcion que crea un contacto nuevo al darle al boton send
           
           
           $http.get(direccioncrimen).then(function (response){
                $scope.updatedCrime = response.data[0];
            });
           
           
            $scope.updateCrime = function (){
            $http.put(direccioncrimen,$scope.updatedCrime).then(function (response){
                $scope.status = "Status: " + response.status;
                $location.path("/");
            });
        };
    
    
    
    
        }]);