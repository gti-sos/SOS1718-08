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
        
         $scope.searchTweet = function(){
             var tweet=[];
        
         $http.get("proxyTwitter/oembed?url=https://twitter.com/"+$scope.widget).then(function(response){
             
             tweet.push(response.data.html)
             console.log(tweet)
             $scope.tweet=tweet
             
             
        
         });
         
         }
         
         
         
         
         
         twttr.widgets.createTweet(
  '1001640191214440449',
  document.getElementById('container'),
  {
    theme: 'ligth'
  }
);

twttr.widgets.load(
  document.getElementById("twit")
);
        
        
    }]);