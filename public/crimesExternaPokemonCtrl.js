 /* global angular */
 angular
     .module("ManagerApp")
     .controller("ViewCtrlPokemon", ["$scope", "$http", function($scope, $http) {
         console.log("View Controller initialited");

      
         //############################################################
        
        $http.get("/api/v2/crimes-an/").then(function(response) {
                $http.get('proxyPokemons/api/v2/pokemon/').then(function(pokeres){
                console.log("Datos: " + response.data);
                console.log("Datoss: " + response.data.map(function(d) { return new Array(d.province, d.onecrime) }));
                console.log("POKEMONES: " +pokeres.data.count +JSON.stringify(pokeres.data.count));
                console.log("POKEMONES: " +pokeres.data.count +JSON.stringify(pokeres.data.results[0].name));

                google.charts.load('current', { packages: ["orgchart"] });
                google.charts.setOnLoadCallback(drawChart);

                function drawChart() {
                    var data = new google.visualization.DataTable();
                    data.addColumn('string', 'Name');
                    data.addColumn('string', 'Manager');
                    data.addColumn('string', 'ToolTip');

                    // For each orgchart box, provide the name, manager, and tooltip to show.
                    data.addRows([
                        [{ v: pokeres.data.results[0].name, f: pokeres.data.results[0].name+'<div style="color:blue; font-style:italic">'+ response.data.map(function(d) { return new Array(d.province) })[0]+'</div>' },
                            '', 'The President'
                        ],
                        [{ v: pokeres.data.results[1].name, f: pokeres.data.results[1].name+'<div style="color:brown; font-style:italic">'+response.data.map(function(d) { return new Array(d.province) })[1]+'</div>' },
                            pokeres.data.results[0].name, 'VP'
                        ],
                        [{v:pokeres.data.results[2].name,f: pokeres.data.results[2].name+'<div style="color:green; font-style:italic">'+response.data.map(function(d) { return new Array(d.province) })[2]+'</div>'} ,pokeres.data.results[0].name, ''],
                        [{v:pokeres.data.results[3].name,f: pokeres.data.results[3].name+'<div style="color:yellow; font-style:italic">'+response.data.map(function(d) { return new Array(d.province) })[3]+'</div>'}, pokeres.data.results[1].name, 'Bob Sponge'],
                        [{v:pokeres.data.results[4].name,f: pokeres.data.results[4].name+'<div style="color:orange; font-style:italic">'+response.data.map(function(d) { return new Array(d.province) })[4]+'</div>'}, pokeres.data.results[3].name, ''],
                        [{v:pokeres.data.results[5].name,f: pokeres.data.results[5].name+'<div style="color:red; font-style:italic">'+response.data.map(function(d) { return new Array(d.province) })[5]+'</div>'}, pokeres.data.results[2].name, ''],
                        [{v:pokeres.data.results[6].name,f: pokeres.data.results[6].name+'<div style="color:pink; font-style:italic">'+response.data.map(function(d) { return new Array(d.province) })[6]+'</div>'}, pokeres.data.results[5].name, '']
                    ]);

                    // Create the chart.
                    var chart = new google.visualization.OrgChart(document.getElementById('chart_div'));
                    // Draw the chart, setting the allowHtml option to true for the tooltips.
                    chart.draw(data, { allowHtml: true });
                }

                });
        });







 }]);