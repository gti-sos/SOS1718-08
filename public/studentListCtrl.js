/* global angular */

angular
    .module("ManagerApp")
    .controller("studentListCtrl", ["$scope", "$http", function($scope, $http) {
        console.log("List Ctrl initialized!");
        var api = "/api/v2/students-an";

        $scope.addStudent = function() {
            $http.post(api, $scope.newStudent).then(function successCallback(response) {
                $scope.status = "Status: " + "All is ok";
                getStudents();
                $scope.error = "";
            }, function errorCallback(response) {
                console.log(response.status)
                $scope.status = "Status: " + "Something fails";
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
        }

        $scope.deleteStudent = function(province, year, gender) {
            console.log("Student to be deleted: " + province + year + gender);

            $http.delete(api + "/" + province + "/" + year + "/" + gender).then(function successCallback(response) {
                $scope.status = "Status: " + "All is ok";
                getStudents();
            }, function errorCallback(response) {
                console.log(response.status);
                $scope.status = "Status: " + "Something fails";
                $scope.error = "Ups, something was wrong. Try it later";

            });

        }

        $scope.deleteAll = function() {

            $http.delete(api).then(function successCallback(response) {
                $scope.status = "Status: " + "All is ok";
                getStudents();
            }, function errorCallback(response) {
                console.log(response.status);
                $scope.status = "Status: " + "Something fails";
                $scope.error = "Ups, something was wrong. Try it later";
            });

        }

        $scope.fillTable = function() {

            $http.get(api + "/loadInitialData").then(function successCallback(response) {
                $scope.status = "Status: " + "All is ok";
                getStudents();
                $scope.error = ""
            }, function errorCallback(response) {
                console.log(response.status);
                $scope.status = "Status: " + "Something fails";
                $scope.error = "Ups, something was wrong. Try it later";
            });

        }

        function getStudents() {
            $http.get(api).then(function successCallback(response) {
                $scope.status = "Status: " + "All is ok";
                $scope.students = response.data;
                $scope.error = "";
            }, function errorCallback(response) {
                console.log(response.status);
                $scope.status = "Status: " + "Something fails";
                switch (response.status) {
                    case 404:
                        $scope.error = "The table is empty. Fill it and try again";
                        break;
                    default:
                        $scope.error = "Ups, something was wrong. Try it later";
                }
            });
        }

        getStudents();
        
                //Funcion para paginar búsquedas
        
        $scope.paginacion = function() {

            $http.get(api + "?limit="+$scope.limit+"&offset="+$scope.offset).then(function successCallback(response) {
                $scope.status = "STATUS: " + response.status + "Done!";
                $scope.students = response.data;
                $scope.error = ""
            }, function errorCallback(response) {
                console.log(response.status);
                $scope.status = response.status;
                $scope.error = "Ups, something was wrong. Try it later";
            });

        }
        
        
        
        $scope.paginacion2 = function() {
            $scope.offset = $scope.offset + $scope.limit;
            $http.get(api + "?limit="+$scope.limit+"&offset="+$scope.offset).then(function successCallback(response) {
                $scope.status = "STATUS: " + response.status + "Done!";
                $scope.students = response.data;
                $scope.error = ""
            }, function errorCallback(response) {
                console.log(response.status);
                $scope.status = response.status;
                $scope.error = "Ups, something was wrong. Try it later";
            });

        }
        
        $scope.paginacion3 = function() {
            $scope.offset = $scope.offset - $scope.limit;
            $http.get(api + "?limit="+$scope.limit+"&offset="+$scope.offset).then(function successCallback(response) {
                $scope.status = "STATUS: " + response.status + "Done!";
                $scope.students = response.data;
                $scope.error = ""
            }, function errorCallback(response) {
                console.log(response.status);
                $scope.status = response.status;
                $scope.error = "Ups, something was wrong. Try it later";
            });

        }
        
        
        //Función para realizar búsquedas
        
         $scope.busqueda = function() {
            console.log(api + "?"+$scope.campo+"="+$scope.valor);
            $http.get(api + "?"+$scope.campo+"="+$scope.valor).then(function successCallback(response) {
                $scope.status = "STATUS: " + response.status + "Done!";
                $scope.students = response.data;
                $scope.error = ""
            }, function errorCallback(response) {
                console.log(response.status);
                $scope.status = response.status;
                $scope.error = "Ups, something was wrong. Try it later";
            });

        }
        



    }]);
