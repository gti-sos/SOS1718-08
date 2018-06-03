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
        var dato
         $http.get("https://ec.europa.eu/eurostat/wdds/rest/data/v2.1/json/en/demo_ndivind?time=2015&precision=1&indic_de=DIV").then(function(responseeuro){
              $http.get("/api/v1/divorces-an").then(function(responsediv){
                  
             
                console.log(responseeuro.data.value)
                for (var i = 0; i < 57; i++) {
                  valor.push(responseeuro.data.value[i])
                  
                }
                
            
              
              pais=(responseeuro.data.dimension.geo.category.label)
              
              $scope.pais=pais
              $scope.valor=valor
              dato=responseeuro.data.value[21]
             
             
             
             
             
             
             var chart = AmCharts.makeChart( "chartdiv2", {
  "type": "funnel",
  "theme": "light",
  "dataProvider":  [  {
    "title": "Divorces Spain",
    "value": dato
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
  "titleField": "title",
  "marginRight": 160,
  "marginLeft": 15,
  "labelPosition": "right",
  "funnelAlpha": 0.9,
  "valueField": "value",
  "startX": 0,
  "neckWidth": "40%",
  "startAlpha": 0,
  "outlineThickness": 1,
  "neckHeight": "30%",
  "balloonText": "[[title]]:<b>[[value]]</b>",
  "export": {
    "enabled": true
  }
} );
             
            
             
            });
         });
    }]);