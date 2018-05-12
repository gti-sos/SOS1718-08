/* global angular */




angular.module("ManagerApp").controller("divorceListCtrl", ["$scope", "$http", function($scope, $http) {
        console.log("List Ctrl initialized!");
        var api = "/api/v1/divorces-an";

        $scope.addDivorce = function() {
            $http.post(api, $scope.newDivorce).then(function successCallback(response) {
              //  $scope.status = "Status: " + response.status;
                window.alert("Creado con exito");
                getDivorces();
                $scope.error = "";
            }, function errorCallback(response) {
                console.log(response.status)
                $scope.status = "Status: " + response.status;
                switch (response.status) {
                    case 405:
                        window.alert("The post method has to be done to a set of resources");
                      //  $scope.error = "The post method has to be done to a set of resources";
                        break;
                    case 409:
                         window.alert("The resource already exists");
                       // $scope.error = "The resource already exists";
                        break;
                    case 400:
                         window.alert("Invalid fields");

                       // $scope.error = "Invalid fields";
                       
                        break;
                    default:
                     window.alert("Ups, something was wrong. Try it later");
                       // $scope.error = "Ups, something was wrong. Try it later";
                }
            });
        }

        $scope.deleteDivorce = function(province, year) {
            console.log("Divorce to be deleted: " + province + year);

            $http.delete(api + "/" + province + "/" + year).then(function successCallback(response) {
                $scope.status = "Status: " + response.status;
                window.alert("Eliminado con exito");
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
                window.alert("Eliminados con exito");
                getDivorces();
            }, function errorCallback(response) {
                console.log(response.status);
                $scope.status = "Status: " + response.status;
                $scope.error = "Ups, something was wrong. Try it later";
            });

        }

        $scope.fillTable = function() {

            $http.get(api + "/loadInitialData").then(function successCallback(response) {
              //  $scope.status = "Status: " + response.status;
                window.alert("Rellenado con exito");
                getDivorces();
                $scope.error = ""
            }, function errorCallback(response) {
                console.log(response.status);
                $scope.status = "Status: " + response.status;
                $scope.error = "Ups, something was wrong. Try it later";
            });

        }

        function getDivorces() {
            $http.get(api+"?limit=10&offset=0").then(function successCallback(response) {
                $scope.status = "Status: " + response.status;
                $scope.divorces = response.data;
                $scope.error = "";
                $scope.offset =0;
                $scope.limit= $scope.limit;
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
      
        
             $scope.getBusqueda = function() {
            console.log(api +"/"+$scope.province + "?"+$scope.campo+"="+$scope.valor);
            $http.get(api +"/"+$scope.province+ "?"+$scope.campo+"="+$scope.valor).then(function successCallback(response) {
                $scope.status = "STATUS: " + response.status + "Done!";
                $scope.divorces = response.data;
                $scope.error = ""
                
            }, function errorCallback(response) {
                console.log(response.status);
                $scope.status = response.status;
                $scope.error = "Ups, something was wrong. Try it later";
                $scope.empty= getDivorces();
            });
                
        }
        
        
      /*   $scope.getPage = function() {

            $http.get(api + "?limit=10"+"&offset=0").then(function successCallback(response) {
                $scope.status = "STATUS: " + response.status + "Done!";
                $scope.divorces = response.data;
                $scope.error = ""
                $scope.offset=0;
            }, function errorCallback(response) {
                console.log(response.status);
                $scope.status = response.status;
                $scope.error = "Ups, something was wrong. Try it later";
            });

        }*/
        
        
        
        $scope.getPageNext = function() {
            $scope.offset = $scope.offset +10;
            $http.get(api + "?limit=10"+"&offset="+$scope.offset).then(function successCallback(response) {
                $scope.status = "STATUS: " + response.status + "Done!";
                $scope.divorces = response.data;
                $scope.error = ""
            }, function errorCallback(response) {
                console.log(response.status);
                $scope.status = response.status;
                $scope.error = "Ups, something was wrong. Try it later";
            });

        }
        
        $scope.getPageBack = function() {
            $scope.offset = $scope.offset - 10;
            $http.get(api + "?limit=10"+"&offset="+$scope.offset).then(function successCallback(response) {
                $scope.status = "STATUS: " + response.status + "Done!";
                $scope.divorces = response.data;
                $scope.error = ""
            }, function errorCallback(response) {
                console.log(response.status);
                $scope.status = response.status;
                $scope.error = "Ups, something was wrong. Try it later";
            });

        }
        
        
        
        
        
        
        
        

        getDivorces();
        
        
        
        


    }]);
