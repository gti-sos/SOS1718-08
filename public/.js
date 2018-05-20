// UserInfo.js
angular.module('ManagerApp').controller('divorcesUser', function(auth) {
  // Using a promise
  auth.profilePromise.then(function(profile) {
    $scope.profile = profile;
  });
  // Or using the object
  $scope.profile = auth.profile;
});