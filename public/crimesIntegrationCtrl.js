/* global angular */
    angular
        .module("ManagerApp")
        .controller("ViewCtrl4", ["$scope", "$http", function($scope, $http) {
            console.log("View Controller initialited");
    
    
            
            $http.get("/api/v2/crimes-an/").then(function (responseCrimes){
               
               $http.get("proxyJE/api/v1/global-terrorism-data/").then(function (responseTerrorism){
               
               var suma = 0;
               var cosa = responseCrimes.data.map(function(d) { return d.onecrime });
               for(var i=0; i<cosa.length;i++){
                   suma = suma + cosa[i];
               }
               console.log("Suma crimen: "+suma);
               
               var suma2 = 0;
               var cosaa = responseCrimes.data.map(function(d) { return d.twocrime });
               for(var i=0; i<cosaa.length;i++){
                   suma2 = suma2 + cosaa[i];
               }
               console.log("Suma crimen2: "+suma2);
               
               var suma3 = 0;
               var cosaaa = responseCrimes.data.map(function(d) { return d.threecrime });
               for(var i=0; i<cosa.length;i++){
                   suma3 = suma3 + cosaaa[i];
               }
               console.log("Suma crimen3: "+suma3);
               
               
                Highcharts.chart('integracion', {
                    title: {
                        text: 'Combination chart'
                    },
                    xAxis: {
                        categories: responseCrimes.data.map(function(d) {return d.year + " " + d.province + " " + d.gender})
                    },
                    labels: {
                        items: [{
                            html: 'Total crimes',
                            style: {
                                left: '50px',
                                top: '18px',
                                color: (Highcharts.theme && Highcharts.theme.textColor) || 'black'
                            }
                        }]
                    },
                    series: [{
                        type: 'column',
                        name: 'OneCrime',
                        data: responseCrimes.data.map(function(d) { return d.onecrime })
                    }, {
                        type: 'column',
                        name: 'TwoCrime',
                        data: responseCrimes.data.map(function(d) { return d.twocrime })
                    }, {
                        type: 'column',
                        name: 'ThreeCrime',
                        data: responseCrimes.data.map(function(d) { return d.threecrime })
                    }, {
                        type: 'spline',
                        name: 'Numero de fallecidos',
                        data: responseTerrorism.data.map(function(d) { return d.nkill }),
                        marker: {
                            lineWidth: 2,
                            lineColor: Highcharts.getOptions().colors[3],
                            fillColor: 'white'
                        }
                    }, {
                        type: 'pie',
                        name: 'Total consumption',
                        data: [{
                            name: 'OneCrime',
                            y: parseInt(suma),
                            color: Highcharts.getOptions().colors[0] 
                        }, {
                            name: 'TwoCrime',
                            y: parseInt(suma2),
                            color: Highcharts.getOptions().colors[1]
                        }, {
                            name: 'ThreeCrime',
                            y: parseInt(suma3),
                            color: Highcharts.getOptions().colors[2] 
                        }],
                        center: [100, 80],
                        size: 100,
                        showInLegend: false,
                        dataLabels: {
                            enabled: false
                        }
                    }]
                });

               
            });
               
               
            });
            
            
            
            
            
            $http.get("/api/v2/crimes-an/").then(function (responseCrimes){
               
               $http.get("https://sos1718-01.herokuapp.com/api/v1/tvfees-stats").then(function (responseTvfees){
                   

                Highcharts.chart('integracion2', {
                
                    chart: {
                        polar: true,
                        type: 'line'
                    },
                
                    title: {
                        text: 'Budget vs spending',
                        x: -80
                    },
                
                    pane: {
                        size: '80%'
                    },
                
                    xAxis: {
                        categories: responseCrimes.data.map(function(d) {return d.year + " " + d.province + " " + d.gender}),
                        tickmarkPlacement: 'on',
                        lineWidth: 0
                    },
                
                    yAxis: {
                        gridLineInterpolation: 'polygon',
                        lineWidth: 0,
                        min: 0
                    },
                
                    tooltip: {
                        shared: true,
                        pointFormat: '<span style="color:{series.color}">{series.name}: <b>${point.y:,.0f}</b><br/>'
                    },
                
                    legend: {
                        align: 'right',
                        verticalAlign: 'top',
                        y: 70,
                        layout: 'vertical'
                    },
                
                    series: [{
                        name: 'Capacity',
                        data: responseTvfees.data.map(function(d) { return d["capacity"] }),
                        pointPlacement: 'on'
                    }, {
                        name: 'Attotal',
                        data: responseTvfees.data.map(function(d) { return d["attotal"] }),
                        pointPlacement: 'on'
                    }]
                
                });
               
               

               
            });
               
               
            });
            
            
            

            }]);