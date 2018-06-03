/* global angular */
/*global Highcharts*/
/*global google*/
/*global Plotly*/
/*global CanvasJS*/

angular
    .module("ManagerApp")
    .controller("studentBikeCtrl", ["$scope", "$http", function($scope, $http) {
        console.log("Bike Ctrl initialized!");

        var api = "https://sos1718-08.herokuapp.com/api/v2/students-an";
        var api2 = "https://api.citybik.es/v2/networks";

        var proxy = "/api/v2/students-an/";
        var proxy2 = "/proxyBI/networks";




        $http.get(proxy).then(function(responseMe) {
            $http.get(api2 + "?fields=location").then(function(responsePa) {
                var a = responsePa.data.networks;
                var b = responseMe.data;
                var datau=[]
                var provinces = ["huelva", "sevilla", "cordoba", "jaen", "cadiz", "malaga", "granada", "almeria"];
                var provincesBi = ["Huelva", "Sevilla", "Cordoba", "Jaen", "Cadiz", "Malaga", "Granada", "Almeria"];
                for (var i=0; i<a.length; i++){
                    //console.log(a[i].location.latitude);
                    for(var x=0;x<provinces.length;x++){
                        //console.log(b.filter(student => student.province==provinces[x]));
                        if(a[i].location.city==provincesBi[x] && b.filter(student => student.province==provinces[x])){
                            console.log(a[i]);
                            datau.push({x: a[i].location.latitude, y: a[i].location.longitude, z: b.filter(student => student.province==provinces[x] && student.gender == "both").map(d => { return (d['popinuniversity']) }).reduce((a, b) => a + b, 0), name:provincesBi[x]})
                            console.log(datau);
                        }
                        else{
                            datau.push({x: a[i].location.latitude, y: a[i].location.longitude, z: 0, name: a[i].location.city});
                        }
                        
                    }
                }
                    
                
                console.log(a);


                var chart = new CanvasJS.Chart("chartContainer", {
                    animationEnabled: true,
                    title: {
                        text: "Universities ubication"
                    },
                    axisX: {
                        title: "Latitude"
                    },
                    axisY: {
                        title: "Longitude"
                    },
                    legend: {
                        horizontalAlign: "left"
                    },
                    data: [{
                        type: "bubble",
                        showInLegend: true,
                        legendText: "Size of Bubble Represents Population in universities",
                        legendMarkerType: "circle",
                        legendMarkerColor: "grey",
                        toolTipContent: "<b>{name}</b><br/>Latitude: {x} yrs<br/> Longitude: {y}<br/> Population: {z}mn",

                        dataPoints: datau
                    }]
                });
                chart.render();






            });


        });

    }]);
