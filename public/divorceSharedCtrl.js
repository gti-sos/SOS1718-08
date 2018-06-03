/* global angular */
/*global Highcharts*/


angular
    .module("ManagerApp")
    .controller("divorceSharedCtrl", ["$scope","$http", function($scope,$http) {
        console.log("Shared Api Ctrl initialized!");
        
        
        var dataPlace=[];
        var salaried=[];
        var divorce=[];
        
        var dataPlace2=[];
        var divorce2=[];
        var schoolrate=[];
       
        // API G02 Employments
        
        $http.get("https://sos1718-02.herokuapp.com/api/v2/employments").then(function(responseEmp){
             $http.get("https://sos1718-08.herokuapp.com/api/v1/divorces-an/").then(function(responseDiv){
                 
                 
                 for (var i = 0; i < responseEmp.data.length; i++) {
                    dataPlace.push(responseEmp.data[i].country + " " + parseInt(responseEmp.data[i].year));
                    salaried.push(responseEmp.data[i].totalsalaried);
                    divorce.push("");
                }
                
                 for (var i = 0; i < responseDiv.data.length; i++) {
                    dataPlace.push(responseDiv.data[i].province + " " + parseInt(responseDiv.data[i].year));
                    salaried.push("");
                    divorce.push(responseDiv.data[i].divorce);
                }
                
               
                
                
                
                 
                 
             
        
         Highcharts.chart('divemp', {
    chart: {
        type: 'areaspline'
    },
    title: {
        text: 'Divorces and Salaried'
    },
    subtitle: {
        text: ''
    },
    xAxis: {
        categories: dataPlace
    },
    yAxis: {
        title: {
            text: ''
        }
    },
    plotOptions: {
        line: {
            dataLabels: {
                enabled: true
            },
            enableMouseTracking: false
        }
    },
    series: [{
        name: 'Divorces',
        data: divorce //responseDiv.data.map(function(d) { return d.divorce })
    }, {
        name: 'Salaried',
        data: salaried//responseEmp.data.map(function(d) { return d.totalsalaried })
    }]
});
                    
       
});
});
        
        // API G04 Graduation rates
        $http.get("proxyJA/api/v2/graduation-rates/").then(function(responseGraduation){
         $http.get("/api/v1/divorces-an/").then(function(responseDivorce){
             
                 
                 
                    for (var i = 0; i < responseGraduation.data.length; i++) {
                    dataPlace2.push(responseGraduation.data[i].province + " " + parseInt(responseGraduation.data[i].year));
                   // schoolrate.push(responseGraduation.data[i].publicschool); 
                    divorce2.push("0");
                    
                    
                    
                }
                
                    for (var i = 0; i < responseDivorce.data.length; i++) {
                    dataPlace2.push(responseDivorce.data[i].province + " " + parseInt(responseDivorce.data[i].year));
                   // schoolrate.push("");
                    divorce2.push(responseDivorce.data[i].divorce);
                }
                 
                 
                 Highcharts.chart('container', {
    chart: {
        type: 'scatter'
    },
    title: {
        text: 'Divorces and Graduation rate'
    },
    subtitle: {
        text: ''
    },
    xAxis: {
        categories: dataPlace2,
        crosshair: true
    },
    yAxis: {
        min: 0,
        title: {
            text: ''
        }
    },
    tooltip: {
        headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
        pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
            '<td style="padding:0"><b>{point.y:.1f} mm</b></td></tr>',
        footerFormat: '</table>',
        shared: true,
        useHTML: true
    },
    plotOptions: {
        column: {
            pointPadding: 0.2,
            borderWidth: 0
        }
    },
    series: [{
        name: 'Divorces',
        data: divorce2

    }, {
        name: 'School',
        data: responseGraduation.data.map(function(d){return (parseInt(d["public-school"]))})

    }]
});
                 
             });
});
        
        
    
}]);
    