/* global angular */
/*global Highcharts*/

angular
    .module("ManagerApp")
    .controller("studentViewCtrl", ["$scope", "$http", function($scope, $http) {
        console.log("View Ctrl initialized!");

        var api = "/api/v2/students-an";

        var sort_by = function(field, reverse, primer) {

            var key = primer ?
                function(x) { return primer(x[field]) } :
                function(x) { return x[field] };

            reverse = !reverse ? 1 : -1;

            return function(a, b) {
                return a = key(a), b = key(b), reverse * ((a > b) - (b > a));
            }
        }


        $http.get(api).then(function(response) {
            console.log(response.data.sort(sort_by('province', false, function(a) { return a.toUpperCase()})));

            var colors = Highcharts.getOptions().colors;
            Highcharts.chart('container', {

                chart: {
                    type: 'streamgraph',
                    marginBottom: 30,
                    zoomType: 'x'
                },

                // Make sure connected countries have similar colors
                colors: [
                    colors[0],
                    colors[1],
                    colors[2],
                    colors[3],
                    colors[4],
                    // East Germany, West Germany and Germany
                    Highcharts.color(colors[5]).brighten(0.2).get(),
                    Highcharts.color(colors[5]).brighten(0.1).get(),

                    colors[5],
                    colors[6],
                    colors[7],
                    colors[8],
                    colors[9],
                    colors[0],
                    colors[1],
                    colors[3],
                    // Soviet Union, Russia
                    Highcharts.color(colors[2]).brighten(-0.1).get(),
                    Highcharts.color(colors[2]).brighten(-0.2).get(),
                    Highcharts.color(colors[2]).brighten(-0.3).get()
                ],

                title: {
                    floating: true,
                    align: 'left',
                    text: 'Winter Olympic Medal Wins'
                },
                subtitle: {
                    floating: true,
                    align: 'left',
                    y: 30,
                    text: 'Source: <a href="https://www.sports-reference.com/olympics/winter/1924/">sports-reference.com</a>'
                },

                xAxis: {
                    maxPadding: 0,
                    type: 'category',
                    crosshair: true,

                    categories: response.data.map(function(student) { return student.province + " " + (parseInt(student.year)) }),

                    labels: {
                        align: 'left',
                        reserveSpace: false,
                        rotation: 270
                    },
                    lineWidth: 0,
                    margin: 20,
                    tickWidth: 0
                },

                yAxis: {
                    visible: false,
                    startOnTick: false,
                    endOnTick: false
                },

                legend: {
                    enabled: false
                },

                plotOptions: {
                    series: {
                        label: {
                            minFontSize: 5,
                            maxFontSize: 15,
                            style: {
                                color: 'rgba(255,255,255,0.75)'
                            }
                        }
                    }
                },

                // Data parsed with olympic-medals.node.js
                series:  [{
                name: 'Illiterate',
                data: response.data.map(function(divorce){return divorce["popilliterate"]})
            }, {
                name: 'High education',
                data:  response.data.map(function(divorce){return divorce["pophigheducation"]})
            }, {
                name: 'University',
                data: response.data.map(function(divorce){return divorce["popinuniversity"]})
            }],

                exporting: {
                    sourceWidth: 800,
                    sourceHeight: 600
                }

            });
        });



    }]);
