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
            .when("/students-an/stadistics",{
                templateUrl: "studentView.html",
                controller: "studentViewCtrl"
            })
            .when("/students-an/:province/:year/:gender",{
                templateUrl: "studentEdit.html",
                controller: "studentEditCtrl"

            }).when("/students-an/search",{
                templateUrl: "studentSearch.html",
                controller: "studentSearchCtrl"
                
            })
             .when("/divorces-an",{
                templateUrl: "divorceList.html",
                controller: "divorceListCtrl"
            })
            .when("/divorces-an/:province/:year/",{
                templateUrl: "divorceEdit.html",
                controller: "divorceEditCtrl"
            })
            
            .when("/divorces-an/stadistics",{
                templateUrl: "divorceView.html",
                controller: "divorceViewtCtrl"
            })
            .when("/crimes-an",{
                templateUrl: "listCrimes.html",
                controller: "ListCtrl"
            })
            .when("/crimes-an/:province/:year/:gender",{
                templateUrl: "editCrimes.html",
                controller: "EditCtrl"
            })
            .when("/crimesView",{
                templateUrl: "crimesView.html",
                controller: "ViewCtrl"
            });
    });
