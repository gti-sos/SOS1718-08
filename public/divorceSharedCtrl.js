/* global angular */
/*global Highcharts*/

angular
    .module("ManagerApp")
    .controller("divorceSharedCtrl", ["$scope","$http", function($scope,$http) {
        console.log("Shared Api Ctrl initialized!");
        
        
        var dataPlace=[];
        var salaried=[];
        var divorce=[];
       
        // API G02 Employments
        
        $http.get("https://sos1718-02.herokuapp.com/api/v2/employments").then(function doneFilter(responseEmp){
             $http.get("https://sos1718-08.herokuapp.com/api/v1/divorces-an/").then(function doneFilter(responseDiv){
                 
                 
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
        
    
}]);
    