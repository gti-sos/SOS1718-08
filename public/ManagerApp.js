/* global angular */

angular
    .module("ManagerApp", ["ngRoute"])
    .config(function ($routeProvider){
        $routeProvider
            .when("/",{
                templateUrl: "oldindex.html"
            })
            .when("/analytics",{
                templateUrl: "analytics.html"
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
                
            }).when("/students-an/partner",{
                templateUrl: "studentPartner.html",
                controller: "studentPartnerCtrl"
                
            })
             .when("/divorces-an",{
                templateUrl: "divorceList.html",
                controller: "divorceListCtrl"
            })
            .when("/divorces-an/:province/:year/",{
                templateUrl: "divorceEdit.html",
                controller: "divorceEditCtrl"
            })
            
            .when("/divorces-an/view",{
                templateUrl: "divorceView.html",
                controller: "divorceViewtCtrl"
            })
            .when("/divorces-an/shared",{
                templateUrl: "divorceShared.html",
                controller: "divorceSharedCtrl"
            })
            .when("/divorces-an/flickr",{
                templateUrl: "divorceExterna.html",
                controller: "divorceExterna"
            })
            .when("/divorces-an/twitter",{
                templateUrl: "divorceTwitter.html",
                controller: "divorceTwitter"
            })
            .when("/divorces-an/ine",{
                templateUrl: "divorceINE.html",
                controller: "divorceINE"
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
            })
            .when("/crimesIntegration",{
                templateUrl: "crimesIntegration.html",
                controller: "ViewCtrl4"
            })
            .when("/crimesExternaNasa",{
                templateUrl: "crimesExternaNasa.html",
                controller: "ViewCtrlNasa"
            })
            .when("/crimesExternaSoundCloud",{
                templateUrl: "crimesExternaSoundCloud.html",
                controller: "ViewCtrlSoundCloud"
            })
            .when("/crimesExternaPokemon",{
                templateUrl: "crimesExternaPokemon.html",
                controller: "ViewCtrlPokemon"
            });
    });
