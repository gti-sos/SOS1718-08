/* global angular */
angular
    .module("ManagerApp")
    .controller("divorceTwitter", ["$scope","$http",'$sce', function($scope,$http,$sce) {
        console.log("Twitter Api Ctrl initialized!");
        console.log("entrando")
        
        //https://publish.twitter.com/oembed?url=https://twitter.com/TwitterDev
        
        ////////////////
        //            //
        //  TWITTER   //
        //            //
        ////////////////
             twttr.widgets.load(
  document.getElementById('show')
);
        
            var tweet="";
            var tweetfinal="";
            var cuenta=""
        
         $scope.searchTweet = function(){
           
        
         $http.get("proxyTwitter/oembed?url=https://twitter.com/"+$scope.widget).then(function(response){
             tweet=(response.data.html)
             console.log(tweet)
             tweetfinal= "<twitter-timeline>"+tweet+"<twitter-timeline>"
             $scope.tweetfinal=$sce.trustAsHtml(tweetfinal);
             $scope.tweet=$sce.trustAsHtml(tweet);
             
           
             
             
        
         });
     /*   $scope.renderHtml = function (htmlCode) {
            return $sce.trustAsHtml(htmlCode);
        };*/



         
    
         
         }
         
         
         
         
         
         twttr.widgets.createTweet(
  '1001640191214440449',
  document.getElementById('container'),
  {
    theme: 'ligth'
  }
);


        
        
    }]);