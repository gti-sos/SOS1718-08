/* global angular */
angular
    .module("ManagerApp")
    .controller("divorceTwitter", ["$scope","$http", function($scope,$http) {
        console.log("Twitter Api Ctrl initialized!");
        console.log("entrando")
        
        //https://publish.twitter.com/oembed?url=https://twitter.com/TwitterDev
        
        ////////////////
        //            //
        //  TWITTER   //
        //            //
        ////////////////
        //NO FUNCIONA //
         $scope.searchTweet = function(){
             var tweet;
        
         $http.get("https://publish.twitter.com/oembed?url=https://twitter.com/"+$scope.widget+"?").then(function(response){
             
             tweet= response.data.html
             
             
        
         });
         
         }
         
         twttr.widgets.createTweet(
  '20',
  document.getElementById('container'),
  {
    theme: 'ligth'
  }
);

twttr.widgets.load(
  document.getElementById("container2")
);
        
        
    }]);