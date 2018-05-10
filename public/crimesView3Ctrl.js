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
            
            var k = response.data.filter(function(m) {return m.year==2012}).filter(function(g) {return g.province=="sevilla"}).filter(function(h) {return h.gender=="male"}).map(function(d) { return d.onecrime })[0];
            var l = i.toString();
            
            var m = response.data.filter(function(m) {return m.year==2013}).filter(function(g) {return g.province=="sevilla"}).filter(function(h) {return h.gender=="male"}).map(function(d) { return d.onecrime })[0];
            var n = i.toString();
            
            var o = response.data.filter(function(m) {return m.year==2014}).filter(function(g) {return g.province=="sevilla"}).filter(function(h) {return h.gender=="male"}).map(function(d) { return d.onecrime })[0];
            var p = i.toString();
            
            var q = response.data.filter(function(m) {return m.year==2015}).filter(function(g) {return g.province=="sevilla"}).filter(function(h) {return h.gender=="male"}).map(function(d) { return d.onecrime })[0];
            var r = i.toString();
            
            var s = response.data.filter(function(m) {return m.year==2016}).filter(function(g) {return g.province=="sevilla"}).filter(function(h) {return h.gender=="male"}).map(function(d) { return d.onecrime })[0];
            var t = i.toString();
            
            var u = response.data.filter(function(m) {return m.year==2017}).filter(function(g) {return g.province=="sevilla"}).filter(function(h) {return h.gender=="male"}).map(function(d) { return d.onecrime })[0];
            var v = i.toString();
            
            var w = response.data.filter(function(m) {return m.year==2018}).filter(function(g) {return g.province=="sevilla"}).filter(function(h) {return h.gender=="male"}).map(function(d) { return d.onecrime })[0];
            var y = i.toString();
            //########################################################
             var nodes = [
        {id: 1, label: "Tasa criminal Sevilla 2007: " + b},
        {id: 2, label: "Tasa criminal Sevilla 2008: " + d},
        {id: 3, label: "Tasa criminal Sevilla 2009: " + f},
        {id: 4, label: "Tasa criminal Sevilla 2010: " + h},
        {id: 5, label: "Tasa criminal Sevilla 2011: " + j},
        {id: 6, label: "Tasa criminal Sevilla 2012: " + l},
        {id: 7, label: "Tasa criminal Sevilla 2013: " + n},
        {id: 8, label: "Tasa criminal Sevilla 2014: " + p},
        {id: 9, label: "Tasa criminal Sevilla 2015: " + r},
        {id: 10, label: "Tasa criminal Sevilla 2016: " + t},
        {id: 11, label: "Tasa criminal Sevilla 2017: " + v},
        {id: 12, label: "Tasa criminal Sevilla 2018: " + y}
    ];

    // create an array with edges
    var edges = [
        {from: 1, to: 2},
        {from: 2, to: 3},
        {from: 3, to: 4},
        {from: 4, to: 5},
        {from: 5, to: 6},
        {from: 6, to: 7},
        {from: 7, to: 8},
        {from: 8, to: 9},
        {from: 9, to: 10},
        {from: 10, to: 11},
        {from: 11, to: 12}
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