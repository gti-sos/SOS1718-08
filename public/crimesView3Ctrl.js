/* global angular */
angular
    .module("ManagerApp")
    .controller("ViewCtrl3", ["$scope", "$http", function($scope, $http) {
        console.log("View Controller initialited");

        $http.get("/api/v2/crimes-an/").then(function(response) {
            console.log("Datos: " + response.data);
            console.log("Datoss: " + response.data.map(function(d) { return new Array(d.province, d.onecrime) }));
            console.log(response.data.filter(function(m) {return m.year==2007}).filter(function(g) {return g.province=="almeria"}).filter(function(h) {return h.gender=="male"}).map(function(d) { return d.onecrime }));
           //########################################################
            var a = response.data.filter(function(m) {return m.year==2007}).filter(function(g) {return g.province=="sevilla"}).filter(function(h) {return h.gender=="male"}).map(function(d) { return d.onecrime })[0];
            var b = a.toString();
            
            var c = response.data.filter(function(m) {return m.year==2008}).filter(function(g) {return g.province=="sevilla"}).filter(function(h) {return h.gender=="male"}).map(function(d) { return d.onecrime })[0];
            var d = c.toString();
            
            var e = response.data.filter(function(m) {return m.year==2009}).filter(function(g) {return g.province=="sevilla"}).filter(function(h) {return h.gender=="male"}).map(function(d) { return d.onecrime })[0];
            var f = e.toString();
            
            var g = response.data.filter(function(m) {return m.year==2010}).filter(function(g) {return g.province=="sevilla"}).filter(function(h) {return h.gender=="male"}).map(function(d) { return d.onecrime })[0];
            var h = g.toString();
            
            var i = response.data.filter(function(m) {return m.year==2011}).filter(function(g) {return g.province=="sevilla"}).filter(function(h) {return h.gender=="male"}).map(function(d) { return d.onecrime })[0];
            var j = i.toString();
            //########################################################
             var nodes = [
        {id: 1, label: "Tasa criminal Sevilla 2007: " + b},
        {id: 2, label: "Tasa criminal Sevilla 2008: " + d},
        {id: 3, label: "Tasa criminal Sevilla 2009: " + f},
        {id: 4, label: "Tasa criminal Sevilla 2010: " + h},
        {id: 5, label: "Tasa criminal Sevilla 2011: " + j}
    ];

    // create an array with edges
    var edges = [
        {from: 1, to: 2},
        {from: 2, to: 3},
        {from: 3, to: 4},
        {from: 4, to: 5}
    ];

    // create a network
    var container = document.getElementById('mynetwork');
    var data = {
        nodes: nodes,
        edges: edges
    };
    var network = new vis.Network(container, data, {});

        });
        //############################################################




    }]);