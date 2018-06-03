/* global angular */
    angular
        .module("ManagerApp")
        .controller("ViewCtrlFull", ["$scope", "$http", function($scope, $http) {
            console.log("View Controller initialited");
    
    
            
            $http.get("/api/v2/crimes-an/").then(function (responseCrimes){
               
               $http.get("/api/v2/students-an").then(function (responseStudents){
                   
                   $http.get("/api/v1/divorces-an/").then(function(responseDivorces){
               
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
               console.loc("Divorcios: " + responseDivorces.data.map(function(d) { return d.divorces }));
               console.loc("Divorcios: " + responseDivorces.data.map(function(d) { return Number(d.divorces)/1000 }));
               
                Highcharts.chart('integracion', {
                    title: {
                        text: 'Combination chart Students-Divorces-Crimes'
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
                        name: 'Illiterate',
                        data: responseStudents.data.map(function(d) { return d.popilliterate })
                    }, {
                        type: 'column',
                        name: 'High education',
                        data: responseStudents.data.map(function(d) { return d.pophigheducation })
                    }, {
                        type: 'column',
                        name: 'University',
                        data: responseStudents.data.map(function(d) { return d.popinuniversity })
                    }, {
                        type: 'spline',
                        name: 'Numero de divorcios',
                        data: responseDivorces.data.map(function(d) { return d.divorces }),
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
               
               
            });
            
            
            
            

            }]);