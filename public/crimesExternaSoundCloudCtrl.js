 /* global angular */
 angular
     .module("ManagerApp")
     .controller("ViewCtrlSoundCloud", ["$scope", "$http", function($scope, $http) {
         console.log("View Controller initialited");

       $scope.playMusic = function(){
           
           $(document).ready(function() {
            SC.get('/tracks', {q: $scope.cancion} , function(track) {
                //$('#player').html(track.title)
                SC.oEmbed(track[0].permalink_url,
                document.getElementById('player'));
            });
        });
         
       };
         
         //############################################################
         


          SC.initialize({
            client_id: '340f063c670272fac27cfa67bffcafc4'
        });
   

         //Titulo de canción
        $(document).ready(function() {
            SC.get('/tracks', {q: 'Seventh Inning Stretch | Fontaine Bleu | Legend of Zelda'}, function(track) {
                $('#song').html("Song: " + track[0].title + " ID:" + track[0].id)
            });
        });
        
        
        //Reproductor de canciones por botones
        $(document).ready(function() {
            SC.stream('/tracks/332445858', function(sound) {
                autoPlay: true,
                $('#start').click(function(e) {
                    e.preventDefault();
                    sound.start();
                });
                $('#stop').click(function(e) {
                    e.preventDefault();
                    sound.stop();
                });
            });
        });

        
        //############################################################
        /*var ctx = document.getElementById("myChart");
        var myChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
                datasets: [{
                    label: '# of Votes',
                    data: [12, 19, 3, 5, 2, 3],
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)'
                    ],
                    borderColor: [
                        'rgba(255,99,132,1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }]
                }
            }
        });
        */
        
         $http.get("/api/v2/crimes-an/").then(function(response) {
             SC.get('/tracks', { q: "Bad Bunny"}, function(tracks) {
                
                var cri = Number(response.data.filter(function(m) {return m.year==2017}).filter(function(g) {return g.province=="sevilla"}).filter(function(h) {return h.gender=="male"}).map(function(d) { return d.onecrime })[0]);
                var bad = Number(tracks.length); 
                
                console.log("Crimenes 2017: " + cri);
                console.log("Numero de canciones Bad Bunny: " + bad);
                
                var ctx = document.getElementById("myDoughnutChart");
                var myDoughnutChart = new Chart(ctx, {
                type: 'doughnut',
                data: {
                    datasets: [{
                        data: [cri, bad],
                        backgroundColor: [
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(75, 192, 192, 0.2)'
                    ]
                    }],
                
                    // These labels appear in the legend and in the tooltips when hovering different arcs
                    labels: [
                        'Crímenes Sevilla 2017',
                        'Canciones lanzadas por Bad Bunny'
                    ]
                },
                options: {
                    scales: {
                        yAxes: [{
                            ticks: {
                                beginAtZero: true
                            }
                        }]
                    }
                }
              });
        
         });
     });







 }]);