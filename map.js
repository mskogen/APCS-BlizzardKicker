var map;
function initMap() {
  // For now, this is the location of Copper mountain
  //We will need to figure out how to pull the recommended lat/long from the algorithm
  //and put it in here. PS slash comments are sick, shut up
  var mtRecommend = {lat: 39.502, lng: -106.151};
  // The map, centered at our recommendation (CURRENTLY JUST COPPER, #IKONFTW)
  var map = new google.maps.Map(
    document.getElementById('map'), {zoom: 8, center: mtRecommend});
    // The marker, positioned at Uluru
    var marker = new google.maps.Marker({position: mtRecommend, map: map});
}
