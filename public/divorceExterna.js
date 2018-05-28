/* global angular */
/*global Highcharts*/
var apikey="f10b03e8ec48d7871cebf065e6153645"

var FlickrURL="https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key="+apikey+"&user_id=&tags="
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
var imagen3="";
var imagen4="";


angular
    .module("ManagerApp")
    .controller("divorceExterna", ["$scope","$http", function($scope,$http) {
        console.log("Flickr Api Ctrl initialized!");
        console.log("entrando")
        
       
        $scope.searchImage = function(){
        //province=$scope.widget;
        console.log("pulso")
       
       
       
       
       
       $http.get(FlickrURL+$scope.widget+"&format=json&nojsoncallback=1").then(function(response){
           console.log("get")
           
               
           photos=response.data.photos.photo;
           $scope.fotos=photos
           console.log(photos)
            for (var i = 0; i < photos.length; i++) {
                id=photos[i].id
                console.log(id)
                farm=photos[i].farm
                secret_id=photos[i].secret
                server=photos[i].server
                urlfinal="http://farm"+farm+".staticflickr.com/"+server+"/"+id+"_"+secret_id+".jpg"
                
                urlimg=urlfinal
                imagenes.push(urlimg);
                $scope.imagenes=imagenes;
                imagen1="http://farm"+photos[i].farm+".staticflickr.com/"+photos[i].server+"/"+photos[i].id+"_"+photos[i].secret+".jpg"
                $scope.imagen1=imagen1;
            }
            
            console.log(imagenes)
           
            
        
            
           
           
        });
        
        
        
     
        }
        
        
       
        
    }]);
    
    