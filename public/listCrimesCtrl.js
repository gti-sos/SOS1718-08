/* global angular */
angular
.module("CrimesManagerApp")
.controller("ListCtrl", ["$scope", "$http", function($scope, $http) {
    console.log("List Controller initialited");

    //$scope.url = "/api/v1/crimes-an";
    var direccionapi = "/api/v1/crimes-an";

    //Funcion que obtiene los crimenes, se lanza de inmediato
    function getCrimes() {

        $http.get(direccionapi).then(function(response) {
            $scope.crimes = response.data;
        });

    };

    getCrimes();
    
    
    
    //Funcion que crea un contacto nuevo al darle al boton send
    $scope.addCrime = function(){
                   
                    $http.post(direccionapi,$scope.newCrime).then(function(response){
                     $scope.status = response.status;
                     getCrimes();
                 });  
                
                 };
                 
                 
                 
    //Funcion que borra un crimen al darle al boton de delete             
    $scope.deleteCrime = function(province, year, gender){
                    console.log("Crimen a borrar:" + province + year + gender);
                    $http.delete(direccionapi+"/"+province+"/"+year+"/"+gender).then(function(response){
                     $scope.status = response.status;
                     getCrimes();
                 });  
                
                 };
    

}]);