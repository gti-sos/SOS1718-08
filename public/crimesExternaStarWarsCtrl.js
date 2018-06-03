 /* global angular */
 angular
     .module("ManagerApp")
     .controller("ViewCtrlStarWars", ["$scope", "$http", function($scope, $http) {
         console.log("View Controller initialited");


           
         
        //############################################################
        
        
        $http.get("/api/v2/crimes-an/").then(function(response) {
             $http.get("https://swapi.co/api/people/").then(function(starresponse) {
                 
                 console.log("Star Wars: " + starresponse.data.results[0].name);
                 //console.log(response.data.map(function(d) { return new Array(d.onecrime) })[0]);
                 
                 //x1 = starresponse.data.results[0].mass
                 
                 var x1 = starresponse.data.results[0].mass;
                 var y1 = response.data.map(function(d) { return d.onecrime })[0];
                 var x2 = starresponse.data.results[1].mass;
                 var y2 = response.data.map(function(d) { return d.onecrime })[1];
                 var x3 = starresponse.data.results[2].mass;
                 var y3 = response.data.map(function(d) { return d.onecrime })[2];
                 var x4 = starresponse.data.results[3].mass;
                 var y4 = response.data.map(function(d) { return d.onecrime })[3];
                 var x5 = starresponse.data.results[4].mass;
                 var y5 = response.data.map(function(d) { return d.onecrime })[4];
                 var x6 = starresponse.data.results[5].mass;
                 var y6 = response.data.map(function(d) { return d.onecrime })[5];
                 var x7 = starresponse.data.results[6].mass;
                 var y7 = response.data.map(function(d) { return d.onecrime })[6];
                 var x8 = starresponse.data.results[7].mass;
                 var y8 = response.data.map(function(d) { return d.onecrime })[7];
        
                        
                var ctx = document.getElementById("myDoughnutChart");

                var scatterChart = new Chart(ctx, {
                type: 'scatter',
                    data: {
                        datasets: [{
                            label: 'Peso Personajes StarWars - Tasa un crimen',
                            data: [{x: x1,y: y1}, {x: x2,y: y2}, {x: x3,y: y3}, {x: x4,y: y4}, {x: x5,y: y5}, {x: x6,y: y6}, {x: x7,y: y7}, {x: x8,y: y8}],
                            pointBackgroundColor: [
                        'rgba(255, 99, 132, 0.7)',
                        'rgba(54, 162, 235, 0.7)',
                        'rgba(255, 206, 86, 0.7)',
                        'rgba(75, 192, 192, 0.7)',
                        'rgba(153, 102, 255, 0.7)',
                        'rgba(255, 159, 64, 0.7)'
                    ]
                        }],
                        pointBorderColor: [
                        'rgba(255,99,132,1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)'
                    ],
                    pointBorderWidth: [222,222,222,222,222,222,222,222],
                    pointHitRadius: [222,222,222,222,222,222,222,222]
                    },
                    options: {
                        scales: {
                            xAxes: [{
                                type: 'linear',
                                position: 'bottom'
                            }]
                        }
                    }
                });
                
                
             });
        });
        
    


 }]);
 
 