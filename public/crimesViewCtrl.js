/* global angular */
 angular
     .module("ManagerApp")
     .controller("ViewCtrl", ["$scope", "$http", function($scope, $http) {
         console.log("View Controller initialited");
         
         
         $http.get("/api/v2/crimes-an/").then(function(response) {


            Highcharts.chart('contenedor', {
            chart: {
                type: 'area'
            },
            title: {
                text: 'Crimes'
            },

            yAxis: {
                title: {
                    text: 'Valor'
                }
            },
            xAxis: {
                categories: response.data.map(function(d) { return d.year,d.province })
            },
            tooltip: {
                pointFormat: '{series.name} had stockpiled <b>{point.y:,.0f}</b><br/>warheads in {point.x}'
            },
            plotOptions: {
                area: {
                    //pointStart: 1940,
                    marker: {
                        enabled: false,
                        symbol: 'circle',
                        radius: 2,
                        states: {
                            hover: {
                                enabled: true
                            }
                        }
                    }
                }
            },
            series: [{
                    name: 'OneCrime',
                    data: response.data.map(function(d) { return d.onecrime })
                },
                {
                    name: 'TwoCrime',
                    data: response.data.map(function(d) { return d.twocrime })
                },
                {
                    name: 'ThreeCrime',
                    data: response.data.map(function(d) { return d.threecrime })
                },
                {
                    name: 'MoreThreeCrime',
                    data: response.data.map(function(d) { return d.morethreecrime })
                }
            ]
            });

            });
         
         
         //############################################################
         
         $scope.searchWidget = function(){
            
            $http.get("/api/v2/crimes-an/").then(function(response) {
             
            Highcharts.chart('femalecontainer', {
                chart: {
                    type: 'bar'
                },
                title: {
                    text: 'Historic Andalucia Crimes by Province (Female)'
                },
                subtitle: {
                    text: 'Source: <a href="https://www.juntadeandalucia.es/institutodeestadisticaycartografia/indsoc/indicadores/1070.htm">juntadeandalucia</a>'
                },
                xAxis: {
                    categories: response.data.filter(function(m) {return m.gender=="female"}).filter(function(y) {return y.year==$scope.widget}).map(function (d) {return d.province})
                },
                yAxis: {
                        min: 0,
                        title: {
                            text: 'Crimes (thousand)',
                            align: 'high'
                        },
                        labels: {
                            overflow: 'justify'
                        }
                },
                tooltip: {
                    valueSuffix: ' thousand'
                },
                plotOptions: {
                    bar: {
                        dataLabels: {
                            enabled: true
                        }
                    }
                },
                legend: {
                    layout: 'vertical',
                    align: 'right',
                    verticalAlign: 'top',
                    x: -40,
                    y: 80,
                    floating: true,
                    borderWidth: 1,
                    backgroundColor: ((Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'),
                    shadow: true
                },
                credits: {
                    enabled: false
                },
                series: [{
                    name: 'OneCrime',
                    data: response.data.filter(function(m) {return m.year==$scope.widget}).filter(function(g) {return g.gender=="female"}).map(function(d) {return d.onecrime})
                    }, 
                    {
                    name: 'TwoCrime',
                    data: response.data.filter(function(m) {return m.year==$scope.widget}).filter(function(g) {return g.gender=="female"}).map(function(d) { return d.twocrime })
                    }, 
                    {
                    name: 'ThreeCrime',
                    data: response.data.filter(function(m) {return m.year==$scope.widget}).filter(function(g) {return g.gender=="female"}).map(function(d) { return d.threecrime })
                    }, 
                    {
                    name: 'MoreThreeCrime',
                    data: response.data.filter(function(m) {return m.year==$scope.widget}).filter(function(g) {return g.gender=="female"}).map(function (d) {return d.morethreecrime})
                    }]
            });


         });
         
         //
         
         $http.get("/api/v2/crimes-an/").then(function(response) {
             
            Highcharts.chart('malecontainer', {
                chart: {
                    type: 'bar'
                },
                title: {
                    text: 'Historic Andalucia Crimes by Province (Male)'
                },
                subtitle: {
                    text: 'Source: <a href="https://www.juntadeandalucia.es/institutodeestadisticaycartografia/indsoc/indicadores/1070.htm">juntadeandalucia</a>'
                },
                xAxis: {
                    categories: response.data.filter(function(m) {return m.gender=="male"}).filter(function(y) {return y.year==$scope.widget}).map(function (d) {return d.province})
                },
                yAxis: {
                        min: 0,
                        title: {
                            text: 'Crimes (thousand)',
                            align: 'high'
                        },
                        labels: {
                            overflow: 'justify'
                        }
                },
                tooltip: {
                    valueSuffix: ' thousand'
                },
                plotOptions: {
                    bar: {
                        dataLabels: {
                            enabled: true
                        }
                    }
                },
                legend: {
                    layout: 'vertical',
                    align: 'right',
                    verticalAlign: 'top',
                    x: -40,
                    y: 80,
                    floating: true,
                    borderWidth: 1,
                    backgroundColor: ((Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'),
                    shadow: true
                },
                credits: {
                    enabled: false
                },
                series: [{
                    name: 'OneCrime',
                    data: response.data.filter(function(m) {return m.year==$scope.widget}).filter(function(g) {return g.gender=="male"}).map(function(d) {return d.onecrime})
                    }, 
                    {
                    name: 'TwoCrime',
                    data: response.data.filter(function(m) {return m.year==$scope.widget}).filter(function(g) {return g.gender=="male"}).map(function(d) { return d.twocrime })
                    }, 
                    {
                    name: 'ThreeCrime',
                    data: response.data.filter(function(m) {return m.year==$scope.widget}).filter(function(g) {return g.gender=="male"}).map(function(d) { return d.threecrime })
                    }, 
                    {
                    name: 'MoreThreeCrime',
                    data: response.data.filter(function(m) {return m.year==$scope.widget}).filter(function(g) {return g.gender=="male"}).map(function (d) {return d.morethreecrime})
                    }]
            });


         });
            
        };
         
         
         
         
         
         


     }]);