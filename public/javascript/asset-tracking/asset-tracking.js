//var app = angular.module('blockchainApp', ['ngRoute']);
//AIzaSyAdF4y0AjJujQ248MSKd8KC41wm9fIvpgc
app.controller('assetTrackingController', ['$scope', '$http', 'NgMap', function($scope, $http, NgMap) {
    var vm = $scope;
    $scope.product = {};
    console.log('loaded');

    $scope.googleMapsUrl = "https://maps.googleapis.com/maps/api/js?key=AIzaSyAdF4y0AjJujQ248MSKd8KC41wm9fIvpgc";


    NgMap.getMap().then(function(map) {
        console.log(map.getCenter());
        console.log('markers', map.markers);
        console.log('shapes', map.shapes);

        var flightPlanCoordinates = [];
        var markers = [];
        var infoWindows = [];

        for (var i = 0; i < vm.states.length; i++) {

            var myLatlng = new google.maps.LatLng(vm.states[i].lat, vm.states[i].lang);

            flightPlanCoordinates[flightPlanCoordinates.length] = myLatlng;
            console.log(vm.states[i].lat);
            console.log(vm.states[i].lang);
            // var myLatLng = {
            //     lat: vm.states[i].lat,
            //     lng: vm.states[i].lang
            // };

            markers[markers.length] = new google.maps.Marker({
                position: myLatlng,
                map: map,
                title: 'Hello World!'
            });



            infoWindows[infoWindows.length] = new google.maps.InfoWindow({
                content: "<strong>STEP " + i + "</strong><br>" + JSON.stringify(vm.states[i].tests)
            });


            //
            // marker.addListener('click', function() {
            // 		infoWindows[i].open(map, markers[i]);
            // });


            // markers[markers.length - 1].addListener('click', function() {
            // 				infoWindows[markers.length-1].open(map, markers[markers.length - 1]);
            //
            // });
        }

				console.log("infoWindows");
				console.log(infoWindows);

        for (var i = 0; i < markers.length; i++) {

            //  infowindow.open(map, marker);

            // markers[i].addListener('click', function() {
            // 		infoWindows[i].open(map, markers[i]);
            // });
            var marker = markers[i];
            google.maps.event.addListener(marker, 'click', function() {
                // where I have added .html to the marker object.
                infoWindows[i].setContent("<strong>STEP " + i + "</strong><br>" + JSON.stringify(vm.states[i].tests));
                infoWindows[i].open(map, this);
            });
        }



        console.log(markers);
        var flightPath = new google.maps.Polyline({
            path: flightPlanCoordinates,
            geodesic: true,
            strokeColor: '#FF0000',
            strokeOpacity: 1.0,
            strokeWeight: 2
        });

        flightPath.setMap(map);
    });

    $scope.states = [];



    $scope.states[$scope.states.length] = {
        text: "sdffsfsf",
        lat: "37.335719",
        lang: "-121.886708",
        address: "101 E San Fernando St #103, San Jose, CA, 95112",
        tests: [{
                objective: "Check if the packing is intact",

                expectedResult: "It is intact",
                actualResult: "It isn't",
                status: "VERIFIED"
            },
            {
                objective: "Check if the packing is intact",

                expectedResult: "It is intact",
                actualResult: "It isn't",
                status: "VERIFIED"
            }

        ]


    }

    $scope.states[$scope.states.length] = {
        text: "sdffsfsf",
        lat: "12.862807",
        lang: "30.217636",
        address: "101 E San Fernando St #103, San Jose, CA, 95112",
        tests: [{
                objective: "Check if the packing is intact",

                expectedResult: "It is intact",
                actualResult: "It isn't",
                status: "VERIFIED"
            },
            {
                objective: "Check if the packing is intact",

                expectedResult: "It is intact",
                actualResult: "It isn't",
                status: "VERIFIED"
            }



        ]


    }

    $scope.states[$scope.states.length] = {
        text: "sdffsfsf",
        lat: "44.314844",
        lang: "-85.602364",
        address: "101 E San Fernando St #103, San Jose, CA, 95112",
        tests: [{
            objective: "Check if the packing is intact",

            expectedResult: "It is intact",
            actualResult: "It isn't",
            status: "VERIFIED"
        }]


    }
    // $scope.register = function(){
    // 	console.log($scope.product);
    // 	console.log('sending product register post');
    // 	var data = {
    // 			productName: $scope.product.name,
    // 			description: $scope.product.description,
    // 			category: $scope.product.category,
    // 			qrCode: $scope.product.id
    //           };
    //
    //       $http.post("/register-product", data).then(function(data, status) {
    //          console.log(data);
    //       });
    //
    // };
}]);
