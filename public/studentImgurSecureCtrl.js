angular
    .module("ManagerApp")
    .controller("studentImgurSecureCtrl", function($scope) {
    
    $scope.accessToken = JSON.parse(window.localStorage.getItem("imgur")).oauth.access_token;

});;
