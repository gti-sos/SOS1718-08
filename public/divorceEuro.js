angular
    .module("ManagerApp")
    .controller("divorceEuro", ["$scope","$http",'$sce', function($scope,$http,$sce) {
        console.log("Eurostats Api Ctrl initialized!");
        console.log("entrando")
        
        
        
        
        /////////////////
        //             //
        //  EUROSTATS  //
        //             //
        /////////////////
        
        var pais=[]
        var valor=[]
        var dato=
         $http.get("https://ec.europa.eu/eurostat/wdds/rest/data/v2.1/json/en/demo_ndivind?time=2015&precision=1&indic_de=DIV").then(function(responseeuro){
              $http.get("/api/v1/divorces-an").then(function(responsediv){
                  
             
                console.log(responseeuro.data.value)
                for (var i = 0; i < 57; i++) {
                  valor.push(responseeuro.data.value[i])
                  
                }
                
            
              
              pais=(responseeuro.data.dimension.geo.category.label)
              
              $scope.pais=pais
              $scope.valor=valor
              $scope.dato=dato
             
             
             
            
             
            });
         });
    }]);