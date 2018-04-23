/* global angular */

angular
    .module("ManagerApp", ["ngRoute"])
    .config(function ($routeProvider){
        $routeProvider
            .when("/",{
                templateUrl: "oldindex.html"
            })
            .when("/students-an",{
                templateUrl: "studentList.html",
                controller: "studentListCtrl"
            })
            .when("/students-an/:province/:year/:gender",{
                templateUrl: "studentEdit.html",
                controller: "studentEditCtrl"
<<<<<<< HEAD
                
            }).when("/students-an/search",{
                templateUrl: "studentSearch.html",
                controller: "studentSearchCtrl"
=======
            })
             .when("/divorces-an",{
                templateUrl: "divorceList.html",
                controller: "divorceListCtrl"
            })
            .when("/divorces-an/:province/:year/",{
                templateUrl: "divorceEdit.html",
                controller: "divorceEditCtrl"
            })
            .when("/crimes-an",{
                templateUrl: "listCrimes.html",
                controller: "ListCtrl"
            })
            .when("/crimes-an/:province/:year/:gender",{
                templateUrl: "editCrimes.html",
                controller: "EditCtrl"
>>>>>>> 19782c37fcf892cea4c436476252f1caad772f7a
            });
            
            
    });