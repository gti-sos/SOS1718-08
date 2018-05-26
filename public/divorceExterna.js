/* global angular */
/*global Highcharts*/

var FlickrURL="https://api.flickr.com/services/rest/?method=flickr.tags.getClusterPhotos&api_key=f10b03e8ec48d7871cebf065e6153645&tag="
var photos;
var photo;
var id="";
var secret_id="";
var farm="";
var server="";
var urlfinal="";
var urlimg="";
var imagenes=[];


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
                
               
            }
            
            console.log(imagenes)
           
            
        
            
           
           
        });
        
        
        
     
        }
        
        
       
        
    }]);
    
    