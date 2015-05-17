
$(document).ready(function(){/* google maps -----------------------------------------------------*/
google.maps.event.addDomListener(window, 'load', initialize);

function initialize() {
  /* position Amsterdam */
  var latlng = new google.maps.LatLng(37.803473, -122.408160);
  var image = 'img/bikeicon1.png';
  var mapOptions = {
    center: latlng,
    scrollWheel: false,
    zoom: 13
  };
  var marker = new google.maps.Marker({
    position: latlng,
    url: '/',
    icon: image,
    animation: google.maps.Animation.DROP
  });

  var map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);
  marker.setMap(map);

  google.maps.event.addListener(marker, 'click', function() {
    foo(map);
  });

  
  

};
/* end google maps -----------------------------------------------------*/
});

function foo(map){
  $.ajax({
  type: "GET",
  url: "xml/route679110.gpx",
  dataType: "xml",
  success: function(xml) {
  var points = [];
  var bounds = new google.maps.LatLngBounds ();
  $(xml).find("trkpt").each(function() {
    var lat = $(this).attr("lat");
    var lon = $(this).attr("lon");
    var p = new google.maps.LatLng(lat, lon);
    points.push(p);
    bounds.extend(p);
  });

  var poly = new google.maps.Polyline({
    // use your own style here
    path: points,
    strokeColor: "#FF00AA",
    strokeOpacity: .7,
    strokeWeight: 4
  });
  
  poly.setMap(map);
  
  // fit bounds to track
  map.fitBounds(bounds);
  }
});
}