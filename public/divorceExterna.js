/* global angular */
/*global Highcharts*/

var FlickrURL="https://api.flickr.com/services/rest/?method=flickr.tags.getClusterPhotos&api_key=61f4f111be70d75000aec635d1c7f5ed&tag="
var photos;
var photo;
var id="";
var secret_id="";
var farm="";
var server="";
var urlfinal="";


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
           photos=response.data;
           console.log(photos)
            for (var j = 0; j < photos.length; j++) {
                this.photo=photos.photo[j]
                
                for (var i = 0; i < this.photo.length; i++) {
               
                    
                id=photo.id[i]
                farm=photo.farm[i]
                secret_id=photo.secret[i]
                server=photo.server[i]
                urlfinal="http://farm"+farm+".staticflickr.com/"+server+"/"+id+"_"+secret_id+".jpg"
                return "<img src="+urlfinal+">"
                    
                
               
                
            }
                
            }
           
           
        });
     
        }
        
        
    }]);