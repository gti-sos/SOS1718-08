/* global angular */



angular
    .module("ManagerApp")
    .controller("divorceINE", ["$scope","$http",'$sce', function($scope,$http,$sce) {
        console.log("INE Api Ctrl initialized!");
        console.log("entrando")
        
        
        
        
        ////////////////
        //            //
        //    INE     //
        //            //
        ////////////////
        var ine
        var div
        var nombre=[]
        var valor=[]
        var year=[]
         $http.get("https://servicios.ine.es/wstempus/js/ES/DATOS_TABLA/6529?nult=1").then(function(responseine){
              $http.get("/api/v1/divorces-an").then(function(responsediv){
                  
              ine=responseine.data
              div=responsediv.data
              
              for (var i = 0; i < responseine.data.length; i++) {
                  nombre.push(responseine.data[i].Nombre)
                  valor.push(responseine.data[i].Data[0].Valor)
                  year.push(responseine.data[i].Data[0].Anyo)
                    
                  
                  
              }
              
              $scope.nombre=nombre
              $scope.valor=valor
              $scope.year=year
              console.log(ine)
              console.log(div)
              $scope.ine=ine
              $scope.div=div
             
             
             
             var chart = AmCharts.makeChart( "chartdiv", {
  "type": "funnel",
  "theme": "light",
  "dataProvider": [ {
    "title": "Divorces Sevilla",
    "value": 300
  }, {
    "title": "Divorces Cadiz",
    "value": 123
  }, {
    "title": "Requested price list",
    "value": 98
  }, {
    "title": "Contaced for more info",
    "value": 72
  }, {
    "title": "Purchased",
    "value": 35
  }, {
    "title": "Contacted for support",
    "value": 15
  }, {
    "title": "Purchased additional products",
    "value": 8
  } ],
  "balloon": {
    "fixedPosition": true
  },
  "valueField": "value",
  "titleField": "title",
  "marginRight": 240,
  "marginLeft": 50,
  "startX": -500,
  "rotate": true,
  "labelPosition": "right",
  "balloonText": "[[title]]: [[value]]n[[description]]",
  "export": {
    "enabled": true
  }
} );
             
            });
         });
    }]);