    /* global angular */
    angular
        .module("ManagerApp")
        .controller("EditCtrl", ["$scope", "$http", "$routeParams", "$location", function($scope, $http, $routeParams,$location) {
            console.log("Edit Controller initialited");
    
            var direccioncrimen = "/api/v2/crimes-an/" + $routeParams.province + "/" + $routeParams.year + "/" + $routeParams.gender;
    
            //Funcion que crea un contacto nuevo al darle al boton send
           
           
           $http.get(direccioncrimen).then(function (response){
                $scope.updatedCrime = response.data;
                console.log("Respuesta: " + response.data);
                console.log("Respuesta 0: " + response.data[0]);
            });
           
           
            $scope.updateCrime = function successCallback(){
            $http.put(direccioncrimen,$scope.updatedCrime).then(function (response){
                $scope.status = "STATUS: " + "Done!";
                $location.path("/crimes-an");
                $scope.error = "";
            }, function errorCallback(response){
                console.log(response.status);
                //$scope.status = "Status: " + response.status;
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
        };
    
    
    
    
        }]);