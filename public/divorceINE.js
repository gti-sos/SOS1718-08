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
        var andalucia
         $http.get("https://servicios.ine.es/wstempus/js/ES/DATOS_TABLA/6529?nult=1").then(function(responseine){
              $http.get("/api/v1/divorces-an").then(function(responsediv){
                  
              ine=responseine.data
              div=responsediv.data
              andalucia=responseine.data[1].Data[0].Valor
              
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
  "dataProvider": [  {
    "title": "Marriage Andalucia",
    "value": andalucia
  },{
    "title": "Divorces Sevilla",
    "value":  parseFloat(responsediv.data.filter(d => d.province == "sevilla" && d.year == 2016).map(divorce => { return divorce['divorce'] })) 
  }, {
    "title": "Divorces Cadiz",
    "value": parseFloat(responsediv.data.filter(d => d.province == "cadiz" && d.year == 2016).map(divorce => { return divorce['divorce'] }))
  }, {
    "title": "Divorces Almeria",
    "value": parseFloat(responsediv.data.filter(d => d.province == "almeria" && d.year == 2016).map(divorce => { return divorce['divorce'] }))
  }, {
    "title": "Divorces Cordoba",
    "value": parseFloat(responsediv.data.filter(d => d.province == "cordoba" && d.year == 2016).map(divorce => { return divorce['divorce'] }))
  }, {
    "title": "Divorces Granada",
    "value": parseFloat(responsediv.data.filter(d => d.province == "granada" && d.year == 2016).map(divorce => { return divorce['divorce'] }))
  }, {
    "title": "Divorces Huelva",
    "value": parseFloat(responsediv.data.filter(d => d.province == "huelva" && d.year == 2016).map(divorce => { return divorce['divorce'] }))
  }, {
    "title": "Divorces Jaen",
    "value": parseFloat(responsediv.data.filter(d => d.province == "jaen" && d.year == 2016).map(divorce => { return divorce['divorce'] }))
  }, {
    "title": "Divorces Malaga",
    "value": parseFloat(responsediv.data.filter(d => d.province == "malaga" && d.year == 2016).map(divorce => { return divorce['divorce'] }))
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