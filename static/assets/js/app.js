var map;
var placesService;
var directionsService;
var directionsDisplay;

function initMap() {
  var myLatLng = { lat: 0.349998, lng: 32.567164398 }; 
  var mapOptions = {
    center: myLatLng,
    zoom: 7,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };

  // create map
  map = new google.maps.Map(document.getElementById("googleMap"), mapOptions);

  // create a PlacesService object
  placesService = new google.maps.places.PlacesService(map);

  // create a direction service object to use with the route and a result method for our request
  directionsService = new google.maps.DirectionsService();

  // create a DirectionsRenderer object to display the route
  directionsDisplay = new google.maps.DirectionsRenderer();

  // bind the DirectionsRenderer to the map
  directionsDisplay.setMap(map);

  // setting autocomplete
  var options = {
    types: ['(cities)']
  };

  var input1 = document.getElementById("from");
  var autocomplete1 = new google.maps.places.Autocomplete(input1, options);

  var input2 = document.getElementById("to");
  var autocomplete2 = new google.maps.places.Autocomplete(input2, options);

  autocomplete1.addListener("place_changed", function() {
    var place = autocomplete1.getPlace();
    // Do something with the selected place
  });

  autocomplete2.addListener("place_changed", function() {
    var place = autocomplete2.getPlace();
    // Do something with the selected place
  });
}

function calcRoute() {
  // create request
  var request = {
    origin: document.getElementById("from").value,
    destination: document.getElementById("to").value,
    travelMode: google.maps.TravelMode.DRIVING, // walking, bicycling, and transit
    unitSystem: google.maps.UnitSystem.IMPERIAL
  };

  // pass the request to the route method
  directionsService.route(request, function(result, status) {
    if (status == google.maps.DirectionsStatus.OK) {
      // get distance and time
      var output = document.querySelector('#output');
      output.innerHTML = "<div class='alert-info'> from: " + document.getElementById("from").value + ".<br />To: " + document.getElementById("to").value + ". <br /> Driving distance <i class='fas fa-road'></i>:" + result.routes[0].legs[0].distance.text + ".<br />Duration <i class='fas fa-hourglass-start'></i> : " + result.routes[0].legs[0].duration.text + ". </div>";

      // display route
      directionsDisplay.setDirections(result);
    } else {
      // delete routes from the map
      directionsDisplay.setDirections({ routes: [] });

      // center the map to myLatLng
      map.setCenter(myLatLng);

      // show error message
      output.innerHTML = "<div class='alert-danger'><i class='fas fa-exclamation-triangle'></i> could not calculate driving distance. </div>";
    }
  });
}
