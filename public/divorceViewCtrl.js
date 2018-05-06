/*global angular*/
/*global Highcharts*/
/*global zingchart*/
/*global google*/


angular.module("ManagerApp").controller("divorceViewtCtrl", ["$scope", "$http", function($scope, $http) {
        console.log("View Ctrl initialized!");
        var api = "/api/v1/divorces-an";
        
         $http.get("/api/v1/divorces-an").then(function(response){
             
             
           //////////////////////////////////////
           //                                  //
           //            Highcharts            //
           //                                  //
           //                                  //
           //////////////////////////////////////
             
               Highcharts.chart('divorcegraphic', {
            chart: {
                type: 'spline'
            },
    
            title: {
                text: 'Divorces, breaks and nullity for province in year'
            },
        
        
            xAxis: {
                
                categories:  response.data.map(function(divorce){return divorce.province +" "+ (parseInt(divorce.year))})
               
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
                data: response.data.map(function(divorce){return divorce["divorce"]})
            }, {
                name: 'Break',
                data:  response.data.map(function(divorce){return divorce["break"]})
            }, {
                name: 'nullity',
                data: response.data.map(function(divorce){return divorce["nullity"]})
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
             
             
        
           //////////////////////////////////////
           //                                  //
           //            Zingchart             //
           //                                  //
           //                                  //
           //////////////////////////////////////
           
           
           var myConfig = {
  type: "hbar",
  title: {
    align: "left",
    text: "Expenditures in Tech",
    fontColor: "#555",
    fontSize: 30,
    fontFamily: "Roboto",
    fontWeight: 'normal',
    offsetX: 10
  },
    subtitle: {
    offsetY: 15,
    text: "R&D costs from 2013-2015",
    fontFamily: "Roboto",
    fontSize: 16,
    align: 'left',
    fontColor: "#777",
    offsetX: 10
  },
  tooltip:{
    padding: 10,
    fontSize: 14,
    text: "%v <br>in %t",
    backgroundColor: "#fff",
    fontColor: "#444",
    borderRadius: "5px",
    borderColor: "#333",
    borderWidth: 1
  },

  legend: {
    offsetY: 80,
    offsetX: 0,
    padding: 10,
    backgroundColor: "transparent",
    borderWidth: "0px",
    highlightPlot: true,
    item: {
      fontSize: 18,
      fontColor: "#666",
      fontFamily: "Roboto",
      
    },
    marker:{
      borderRadius: 10,
      borderWidth: "0px",
    },
    cursor: "hand"
  },
  plotarea:{
    margin: "100 130 70 100"
  },
  plot:{
    borderRadius: "0 5 5 0",
    hightlightMarker: {
      backgroundColor:"red"
    },
    highlightState: {
      backgroundColor:"red"
    },
     animation:{
 	    effect: 4,
 	    method: 0,
 	    sequence: 1
 	  }
  },
  source: {
    text: "Source: sec.gov",
    fontColor: "#666",
    fontFamily: 'Roboto'
  },
 	scaleX: {
 	  labels: response.data.map(function(divorce){return divorce.province +" "+ (parseInt(divorce.year))}),
 	  item: {
 	    fontFamily: "Roboto",
 	    fontSize: 14
 	  },
 	  lineColor: "#DDD",
 	  tick:{
 	    visible: false
 	  }
 	},
 	scaleY: {
 	  label:{
 	    offsetY: 5,
 	    text: "Investment in Billions (USD)",
 	    fontColor: "#777",
 	    fontSize: 14,
 	    fontFamily: "Roboto",
 	  },
 	  item: {
 	    // fontColor: "#fff",
 	    fontFamily: "Roboto",
 	    fontSize: 14
 	  },
 	  lineWidth: 0,
 	  tick: {
 	    visible: false
 	  },
 	  guide:{
 	    lineStyle: "solid",
 	    lineColor: "#DDD"
 	  },
 	  values: "5000"
 	},
	series : [
	  {
		  text: "Divorce",
		  // values: [4820, 8067, 12000, 12100, 12282, 12540],
		  values: response.data.map(function(divorce){return divorce["divorce"]}),
		  backgroundColor: "#d6d6d6",
		  rules: [
		    { rule: '%i==0', backgroundColor: '#f98377'},
		    { rule: '%i==1', backgroundColor: '#fbd972'},
		    { rule: '%i==2', backgroundColor: '#78e5d2'},
		    { rule: '%i==3', backgroundColor: '#7ad8e5'},
		    { rule: '%i==4', backgroundColor: '#d2f27c'},
		    { rule: '%i==5', backgroundColor: '#e572ec'},
		    { rule: '%i==6', backgroundColor: '#f98377'},
		    { rule: '%i==7', backgroundColor: '#fbd972'},
		    { rule: '%i==8', backgroundColor: '#78e5d2'},
		    { rule: '%i==9', backgroundColor: '#7ad8e5'},
		    { rule: '%i==10', backgroundColor: '#d2f27c'},
		    { rule: '%i==11', backgroundColor: '#e572ec'},
		    { rule: '%i==12', backgroundColor: '#f98377'},
		    { rule: '%i==13', backgroundColor: '#fbd972'},
		    { rule: '%i==14', backgroundColor: '#78e5d2'},
		    { rule: '%i==15', backgroundColor: '#7ad8e5'},
		    { rule: '%i==16', backgroundColor: '#d2f27c'},
		    { rule: '%i==17', backgroundColor: '#e572ec'},
		    { rule: '%i==18', backgroundColor: '#7ad8e5'},
		    { rule: '%i==19', backgroundColor: '#d2f27c'},
		    { rule: '%i==20', backgroundColor: '#e572ec'},
		  ]
		},

		{
		  text: "Break",
		  // values: [2670, 6041, 11400, 11500,9832, 9275],
		  values: response.data.map(function(divorce){return divorce["break"]}),
		  backgroundColor: "#8e8e8e",
		  rules: [
		    { rule: '%i==0', backgroundColor: '#F55443'},
		    { rule: '%i==1', backgroundColor: '#FFCC33'},
		    { rule: '%i==2', backgroundColor: '#44b6a2'},
		    { rule: '%i==3', backgroundColor: '#10A5BA'},
		    { rule: '%i==4', backgroundColor: '#96BD2C'},
		    { rule: '%i==5', backgroundColor: '#b42cbd'},
		    { rule: '%i==6', backgroundColor: '#F55443'},
		    { rule: '%i==7', backgroundColor: '#FFCC33'},
		    { rule: '%i==8', backgroundColor: '#44b6a2'},
		    { rule: '%i==9', backgroundColor: '#10A5BA'},
		    { rule: '%i==10', backgroundColor: '#96BD2C'},
		    { rule: '%i==11', backgroundColor: '#b42cbd'},
		    { rule: '%i==12', backgroundColor: '#F55443'},
		    { rule: '%i==13', backgroundColor: '#FFCC33'},
		    { rule: '%i==14', backgroundColor: '#44b6a2'},
		    { rule: '%i==15', backgroundColor: '#10A5BA'},
		    { rule: '%i==16', backgroundColor: '#96BD2C'},
		    { rule: '%i==17', backgroundColor: '#b42cbd'},
		    { rule: '%i==18', backgroundColor: '#F55443'},
		    { rule: '%i==19', backgroundColor: '#FFCC33'},
		    { rule: '%i==20', backgroundColor: '#44b6a2'},
		    
		  ]
		},
		{
		  text: "Nullity",
		  values: response.data.map(function(divorce){return divorce["nullity"]}),
		  // values: [1420, 4475, 10400, 10600, 7137, 6565],
		  backgroundColor: "#494949",
		  rules: [
		    { rule: '%i==0', backgroundColor: '#EB1C12'},
		    { rule: '%i==1', backgroundColor: '#FBA30A'},
		    { rule: '%i==2', backgroundColor: '#1c8976'},
		    { rule: '%i==3', backgroundColor: '#016B88'},
		    { rule: '%i==4', backgroundColor: '#588C08'},
		    { rule: '%i==5', backgroundColor: '#781c7e'},
		    { rule: '%i==6', backgroundColor: '#EB1C12'},
		    { rule: '%i==7', backgroundColor: '#FBA30A'},
		    { rule: '%i==8', backgroundColor: '#1c8976'},
		    { rule: '%i==9', backgroundColor: '#016B88'},
		    { rule: '%i==10', backgroundColor: '#588C08'},
		    { rule: '%i==11', backgroundColor: '#781c7e'},
		    { rule: '%i==12', backgroundColor: '#EB1C12'},
		    { rule: '%i==13', backgroundColor: '#FBA30A'},
		    { rule: '%i==14', backgroundColor: '#1c8976'},
		    { rule: '%i==15', backgroundColor: '#016B88'},
		    { rule: '%i==16', backgroundColor: '#588C08'},
		    { rule: '%i==17', backgroundColor: '#781c7e'},
		    { rule: '%i==18', backgroundColor: '#016B88'},
		    { rule: '%i==19', backgroundColor: '#588C08'},
		    { rule: '%i==20', backgroundColor: '#781c7e'},
		  ]
		}
	]
};

zingchart.render({ 
	id : 'myChart', 
	data : myConfig, 
	height:800 , 
	width: 1000 
});
         
              
           //////////////////////////////////////
           //                                  //
           //          GOOGLE MAPS             //
           //                                  //
           //                                  //
           //////////////////////////////////////
             
            
             google.charts.load('current', {'packages': ['geochart'],
       // Note: you will need to get a mapsApiKey for your project.
       // See: https://developers.google.com/chart/interactive/docs/basic_load_libs#load-settings
       'mapsApiKey': 'AIzaSyBePfYoBL0sHvka8e0Y-cMhu9zWG-7TpIQ'
     });
             
             google.charts.setOnLoadCallback(drawMarkersMap);

      function drawMarkersMap() {
      var data = google.visualization.arrayToDataTable([
        ['City',   'Population', 'Area'],
        ['Sevilla',      2761477,    1285.31],
        ['Cadiz',     1324110,    181.76],
        ['Almeria',    959574,     117.27],
        ['Cordoba',     907563,     130.17],
        ['Granada',   655875,     158.9],
        ['Huelva',     607906,     243.60],
        ['Jaen',   380181,     140.7],
        ['Malaga',  371282,     102.41],
      ]);

      var options = {
        region: 'ES',
        displayMode: 'markers',
        colorAxis: {colors: ['red', 'blue']}
      };

      var chart = new google.visualization.GeoChart(document.getElementById('chart_div'));
      chart.draw(data, options);
    };
         });
        
   }]);
