/* global angular */
angular
.module("ManagerApp")
.controller("ListCtrl", ["$scope", "$http", function($scope, $http) {
    console.log("List Controller initialited");

    //$scope.url = "/api/v1/crimes-an";
    var direccionapi = "/api/v1/crimes-an";

    //Funcion que obtiene los crimenes, se lanza de inmediato
    function getCrimes() {

        $http.get(direccionapi).then(function successCallback(response) {
            $scope.crimes = response.data;
            $scope.status = "STATUS code is: " + response.status + " That means it's all okey!";
            $scope.error = "";
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

    getCrimes();
    
    
    
    //Funcion que crea un contacto nuevo al darle al boton send
    $scope.addCrime = function() {

        $http.post(direccionapi, $scope.newCrime).then(function successCallback(response) {
            $scope.status = "STATUS: " + response.status + "Done!";
            getCrimes();
            $scope.error = "";

        }, function errorCallback(response) {
            console.log(response.status)
            $scope.status = response.status;
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

    };
                 
                 
                 
    //Funcion que borra un crimen al darle al boton de delete             
    $scope.deleteCrime = function(province, year, gender) {
        console.log("Crimen a borrar:" + province + year + gender);
        $http.delete(direccionapi + "/" + province + "/" + year + "/" + gender).then(function successCallback(response) {
            $scope.status = "STATUS: " + response.status + "Done!";
            getCrimes();
        }, function errorCallback(response) {
            console.log(response.status);
            $scope.status = response.status;
            $scope.error = "Ups, something was wrong. Try it later";

        });

    };
    
    //Funcion que borra todos los crimenes
    $scope.deleteAll = function() {
    
        $http.delete(direccionapi).then(function successCallback(response) {
            $scope.status = "STATUS: " + response.status + "Done!";
            getCrimes();
        }, function errorCallback(response) {
            console.log(response.status);
            $scope.status = response.status;
            $scope.error = "Ups, something was wrong. Try it later";
        });
    
    }
    
    
    //Funcion de inserccion de datos iniciales
    $scope.fillTable = function() {

            $http.get(direccionapi + "/loadInitialData").then(function successCallback(response) {
                $scope.status = "STATUS: " + response.status + "Done!";
                getCrimes();
                $scope.error = ""
            }, function errorCallback(response) {
                console.log(response.status);
                $scope.status = response.status;
                $scope.error = "Ups, something was wrong. Try it later";
            });

        }
        
        
        //Funcion para paginar búsquedas
        
        $scope.paginacion = function() {

            $http.get(direccionapi + "?limit="+$scope.limit+"&offset="+$scope.offset).then(function successCallback(response) {
                $scope.status = "STATUS: " + response.status + "Done!";
                $scope.crimes = response.data;
                $scope.error = ""
            }, function errorCallback(response) {
                console.log(response.status);
                $scope.status = response.status;
                $scope.error = "Ups, something was wrong. Try it later";
            });

        }
        
        $scope.paginacion2 = function() {
            var nuevooffset = $scope.offset+$scope.limit
            $http.get(direccionapi + "?limit="+$scope.limit+"&offset="+nuevooffset).then(function successCallback(response) {
                $scope.status = "STATUS: " + response.status + "Done!";
                $scope.crimes = response.data;
                $scope.error = ""
            }, function errorCallback(response) {
                console.log(response.status);
                $scope.status = response.status;
                $scope.error = "Ups, something was wrong. Try it later";
            });

        }
        
        $scope.paginacion3 = function() {
            var nuevooffset = $scope.offset-$scope.limit
            $http.get(direccionapi + "?limit="+$scope.limit+"&offset="+nuevooffset).then(function successCallback(response) {
                $scope.status = "STATUS: " + response.status + "Done!";
                $scope.crimes = response.data;
                $scope.error = ""
            }, function errorCallback(response) {
                console.log(response.status);
                $scope.status = response.status;
                $scope.error = "Ups, something was wrong. Try it later";
            });

        }
        
        
        
    

}]);