angular
    .module("ManagerApp")
    .controller("studentImgurCtrl", function($scope) {

    $scope.login = function() {
        console.log(window.localStorage);
        window.location.href = "https://api.imgur.com/oauth2/authorize?client_id=" + "8abd6e7b9d4d3e8" + "&response_type=token"
        
    }

});;
