/*global angular*/
/*global Highcharts*/

angular.module("ManagerApp").controller("divorceViewtCtrl", ["$scope", "$http", function($scope, $http) {
        console.log("View Ctrl initialized!");
        var api = "/api/v1/divorces-an";
        
         $http.get("/api/v1/divorces-an").then(function(response){
             
             
               Highcharts.chart('divorcegraphic', {
            chart: {
                type: 'spline'
            },
    
            title: {
                text: 'Divorces, breaks and nullity for province in year'
            },
        
        
            xAxis: {
                
                categories:  response.data.map(function(d){return d.province +" "+ (parseInt(d.year))})
               
            },
            yAxis: {
                title: {
                    text: 'pass rate'
                }
            },
            legend: {
                layout: 'vertical',
                align: 'left',
                verticalAlign: 'middle'
            },
        
            plotOptions: {
                spline: {
                    marker: {
                        enabled: true
                    }
                }
            },
            series: [{
                name: 'Divorce',
                data: response.data.map(function(d){return d["divorce"]
                })
            }, {
                name: 'Break',
                data:  response.data.map(function(d){return d["break"]})
            }, {
                name: 'nullity',
                data: response.data.map(function(d){return d["nullity"]})
            }],
            
        
            responsive: {
                rules: [{
                    condition: {
                        maxWidth: 500
                    },
                    chartOptions: {
                        legend: {
                            layout: 'horizontal',
                            align: 'left',
                            verticalAlign: 'bottom'
                        }
                    }
                }]
            }
        
        });
             
             
             
         
         });
        
   }]);
