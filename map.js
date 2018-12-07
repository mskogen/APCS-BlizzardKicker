  function initMap() {
    var directionsService = new google.maps.DirectionsService();
    var directionsDisplay = new google.maps.DirectionsRenderer();
    var copperMountain = new google.maps.LatLng(lat: 39.502, lng: -106.151);
    var mapOptions = {
      zoom:7,
      center: copperMountain
    }
    var map = new google.maps.Map(document.getElementById('map'), mapOptions);
    directionsDisplay.setMap(map);
  }

  function calcRoute() {
    var start = {lat: 40.0076, lng:105.2659};//User's current location, starting point
    var end = {lat: 39.502, lng: -106.151};
    var request = {
      origin: start,
      destination: end,
      travelMode: 'DRIVING'
    };
    directionsService.route(request, function(result, status) {
      if (status == 'OK') {
        directionsDisplay.setDirections(result);
      }
    });
  }

  <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyC-QwVCYVzGxcwYP1MFAIBEG5Jav0hDNa8&callback=initMap"
      async defer></script>
//This call is what's supposed to make the functions above work. I'm struggling right now though, big time

//currently trying to figure out why this doesn't work for directions:
/* 
function initMap() {
    var directionsService = new google.maps.DirectionsService();
    var directionsDisplay = new google.maps.DirectionsRenderer();
    var copperMountain = new google.maps.LatLng(lat: 39.502, lng: -106.151);
    var mapOptions = {
      zoom:7,
      center: copperMountain
    }
    var map = new google.maps.Map(document.getElementById('map'), mapOptions);
    directionsDisplay.setMap(map);
  }

  function calcRoute() {
    var start = new google.maps.LatLng(lat: 40.0076, lng: 105.2659);
    var end = new google.maps.LatLng(lat: 39.502, lng: -106.151);
    var request = {
      origin: start,
      destination: end,
      travelMode: 'DRIVING'
    };
    directionsService.route(request, function(result, status) {
      if (status == 'OK') {
        directionsDisplay.setDirections(result);
      }
    });
    */



//Drive Time Stuff:

/*
This call would get us directions from CU to Copper. You can just use the location names which is cool. We'd need to put in an origina and a destination from the algo
Call: https://maps.googleapis.com/maps/api/directions/json?origin=University+Of+Colorado+Boulder&destination=Copper+Mountain&key=AIzaSyCPVjWJlNNRi_u7NB2KC1R4IEW44h_wJeE

not sure the best way to run this. XMLHttpRequest() maybe? or request.open? just ajax?

on some blog I read that Google Maps API won't allow this request if we're not also showing data in the the 
map somewhere on our page. Depending how they enforce that, this shouldn't be a problem but we should be aware.





