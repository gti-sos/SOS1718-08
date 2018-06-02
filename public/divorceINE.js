/* global angular */



angular
    .module("ManagerApp")
    .controller("divorceTwitter", ["$scope","$http",'$sce', function($scope,$http,$sce) {
        console.log("Twitter Api Ctrl initialized!");
        console.log("entrando")
        
        
        
        
        ////////////////
        //            //
        //    INE     //
        //            //
        ////////////////
        var ine
        var div
         $http.get("http://servicios.ine.es/wstempus/js/ES/DATOS_TABLA/6529?nult=1").then(function(responseine){
              $http.get("/api/v1/divorces-an").then(function(responsediv){
                  
              ine=responseine.data
              div=responsediv.data
              
              console.log(ine)
              console.log(div)
             
             
             
             
             
            });
         });
    }]);