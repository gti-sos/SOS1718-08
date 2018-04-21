/* global angular */

angular
    .module("ManagerApp")
    .controller("studentListCtrl", ["$scope","$http", function($scope,$http) {
        console.log("List Ctrl initialized!");
        var api = "/api/v1/students-an";

        $scope.addStudent = function (){
            $http.post(api,$scope.newStudent).then(function (response){
                $scope.status = "Status: " + response.status;
                getStudents();
            });
        }
        
        $scope.deleteStudent = function (province){
            console.log("Student to be deleted: "+ province);
    
            $http.delete(api+"/"+province).then(function (response){
                $scope.status = "Status: " + response.status;
                getStudents();
            });

        }
        
        function getStudents(){
            $http.get(api).then(function (response){
                $scope.students = response.data;
            });
        }
        
        getStudents();

        
        
}]);
