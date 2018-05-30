/* global angular */
/*global Highcharts*/
var apikey="f10b03e8ec48d7871cebf065e6153645"

var FlickrURL="https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key="+apikey+"&user_id=&tags="




angular
    .module("ManagerApp")
    .controller("divorceExterna", ["$scope","$http", function($scope,$http) {
        console.log("Flickr Api Ctrl initialized!");
        console.log("entrando")
        
       
       
      ///////////////////////
      //                   //
      //      Flickr       //
      //                   //
      ///////////////////////
       
       
        $scope.searchImage = function(){
        //province=$scope.widget;
        console.log("pulso")
       
       
       
       
       $http.get("https://sos1718-08.herokuapp.com/api/v1/divorces-an/"+$scope.widget).then(function(responsedivorces){
        $http.get(FlickrURL+$scope.widget+"&format=json&nojsoncallback=1").then(function(response){
            
var div=[]
var br=[]
var nullity=[]
var dataPlace=[]
var divorcios;
var photos;
var photo;
var id="";
var secret_id="";
var farm="";
var server="";
var urlfinal="";



var urlimg="";
var imagenes=[];
var imagen1="";
var imagen2="";

var imagenfinal1='';

           
           photos=response.data.photos.photo;
           $scope.fotos=photos
           
           console.log(photos)
            for (var i = 0; i < 8; i++) {
                id=photos[i].id
                farm=photos[i].farm
                secret_id=photos[i].secret
                server=photos[i].server
                urlfinal="http://farm"+farm+".staticflickr.com/"+server+"/"+id+"_"+secret_id+".jpg"
                
                urlimg=urlfinal
                imagenes.push(urlimg);
                $scope.imagenes=imagenes;
                imagen1="http://farm"+photos[i].farm+".staticflickr.com/"+photos[i].server+"/"+photos[i].id+"_"+photos[i].secret+".jpg"
                imagen2="http://farm"+photos[0].farm+".staticflickr.com/"+photos[0].server+"/"+photos[0].id+"_"+photos[0].secret+".jpg"
                imagenfinal1=""+imagen2+""
                $scope.imagen1=imagen1;
                $scope.imagen2=imagen2;
                
            }
            
             divorcios=responsedivorces.data
            console.log(divorcios)
           
           for (var i = 0; i < responsedivorces.data.length; i++) {
                    dataPlace.push("'"+responsedivorces.data[i].province + " " + parseInt(responsedivorces.data[i].year)+"'");
                    div.push(responsedivorces.data[i].divorce)
                    br.push(responsedivorces.data[i].break)
                    nullity.push(responsedivorces.data[i].nullity)
            }
            console.log(div)
           
            //"background-image": imagenfinal1,
            
            
          zingchart.THEME="classic";
var myConfig = 
        {
            "background-image": imagenfinal1,
            "type": "bar",
            "background-color": "#898d95 #4f4f4f",
            "border-radius-top-left": 13,
            "border-radius-top-right": 13,
            "border-radius-bottom-right": 10,
            "border-radius-bottom-left": 10,
            "title": {
                "text": "Divorces data province",
                "align": "right",
                "background-color": "#f7f7f7 #e3e3e9",
                "font-family": "Passion One",
                "font-size": "24px",
                "font-color": "#4f4f4f",
                "border-radius-top-left": 10,
                "border-radius-top-right": 10
            },
            "plot": {
                "border-radius-top-left": 10,
                "border-radius-top-right": 10,
                "value-box": {
                    "visible": true,
                    "font-color": "#fff",
                    "placement": "in",
                    "font-angle": -90,
                    "offset-y": "20px",
                    "font-size": "10px",
                    "font-weight": "normal"
                }
            },
            "plotarea": {
                "background-color": "#6c6e72",
                "margin": "80px 60px 60px 80px"
            },
            "tooltip":{
              "border-radius":6
            },
            "scale-x": {
                "values": dataPlace
                ,
                "item": {
                    "font-color": "#fff"
                },
                "line-color": "#fff",
                "line-width": "1px",
                "tick": {
                    "visible": false
                },
                "guide": {
                    "line-width": "1px",
                    "line-color": "#fff",
                    "line-style": "solid",
                    "alpha": 0.2
                },
                "markers": [
                    {
                        "type": "area",
                        "range": [
                            3.5,
                            5
                        ],
                        "background-color": "#000",
                        "alpha": 0.3
                    }
                ]
            },
            "scale-y": {
                "label": {
                    "text": "UNITS",
                    "font-color": "#fff",
                    "offset-x": "-10px"
                },
                "multiplier": true,
                "item": {
                    "font-color": "#fff"
                },
                "line-color": "#fff",
                "line-width": "1px",
                "tick": {
                    "visible": false
                },
                "guide": {
                    "line-width": "1px",
                    "line-color": "#fff",
                    "line-style": "solid",
                    "alpha": 0.2
                }
            },
            "legend": {
                "layout": "h",
                "background-color": "none",
                "border-width": 0,
                "shadow": 0,
                "y": "46px",
                "toggle-action": "remove",
                "item": {
                    "font-color": "#fff"
                },
                "marker": {
                    "type": "circle",
                    "size": 6
                }
            },
            "series": [
                {
                    "values": div,
                    "text": "DIV",
                    "background-color": "#38353c",
                    "background-image": "https://cdn.pixabay.com/photo/2017/02/16/16/27/radial-2071767_960_720.jpg",
                    "background-fit": "xy"
                },
                {
                    "values": br,
                    "text": "Break",
                    "background-color": "#a50617",
                    "background-image": "https://cdn.pixabay.com/photo/2017/02/16/16/27/radial-2071769_960_720.jpg",
                    "background-fit": "xy"
                },{
                    "values": nullity,
                    "text": "Nullity",
                    "background-color": "#006BFB",
                    "background-image": "https://cdn.pixabay.com/photo/2017/02/16/16/27/radial-2071769_960_720.jpg",
                    "background-fit": "xy"
                }
            ]
        };
 
zingchart.render({ 
	id : 'myChart', 
	data : myConfig, 
	height: 500, 
	width: 725 
});
           
           
        });

       });        
        
        
     
        }
        ///////////////////////////////////////////////////////////////////////////
        ///////////////////////// FIN FLICKR //////////////////////////////////////
        ///////////////////////////////////////////////////////////////////////////
        
        
        
        
       
        
    }]);
    
    