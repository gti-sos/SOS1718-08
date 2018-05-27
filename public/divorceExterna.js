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

var id2="";
var secret_id2="";
var farm2="";
var server2="";
var urlfinal2="";


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
                imagenes=urlfinal;
                $scope.imagenes=imagenes;
                
                id2=photos[2].id
                farm2=photos[2].farm
                secret_id2=photos[2].secret
                server2=photos[2].server
                urlfinal2="http://farm"+farm2+".staticflickr.com/"+server2+"/"+id2+"_"+secret_id2+".jpg"
                $scope.imagen2=urlfinal2
                
                
               
            }
            
            console.log(imagenes)
           
            
        
            
           
           
        });
        
        
        
     
        }
        
        
       
        
    }]);
    
    