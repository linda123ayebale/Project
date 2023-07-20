// set map options

var myLatLng = {lat: .328, lng: 32.5674}
var mapOptions = {
	center: myLatLng,
	zoom: 7,
	mapTypeId: google.maps.MapTypeId.ROADMAP
}



// creat map

var map = new google.maps.Map(document.getElementById("googleMap"), mapOptions)

// create a direction service to object use with the route and a result for our request

var directionsService = new google.maps.DirectionsService();

// create a directionsRender objects to display route

var directionsdisplay = new google.maps.DirectionsRenderer();

// bind the directionsRenderer to the map

directionsdisplay.setMap(map);

// function to disply distance,where we are going, places and time

function calcRoute() {
	// create request

	var request = {
		origin: document.getElementById("from").value,
		destination: document.getElementById("to").vaue,
		travelMode:google.maps.TravelMode.DRIVING,// walking,bycling,and transit
		unitSystem: google.maps.UnitSystem.IMPERIAL
	}

	// PASS THE REQUEST TO THE ROUTE METHOD
	directionsService.route(request, (result, status) => {
		if(status == google.maps.DirectionsStatus.OK) {
			// get distance and time
			const output = document.querySelector('#output');
			output.innerHTML = "<div class='alert-info'> from: " + document.getElementById("from").value + ".<br />To: " + document.getElementById("to").value + ". <br /> Driving distance <i class='fas fa-road'></i>:" + result.routes[0].legs[0].distance.text + ".<br />Duration <i class='fas fa-hourglass-start'></i> : " + result.routes[0].legs[0].duration.text + ". </div>";

			 // display route
			 directionsDisplay.setDirections(result);
		}else {
			// delete rotes from the map
			directionsDisplay.setDirections({ routes: []});

			// center the map in makerere
			map.setCenter(myLatLng);

			// show error message
			output.innerHTML = "<div class='alert-danger'><i class='fas fa-exclamation-triangle'></i> could not driving distance. </div>";
		}
	});

}

// setting auto complete

var options = {
	types: ['(cities)']
}

var input1 = document.getElementById("from");
var autocomplete1 = new google.maps.places.Autocomplete(input1, options)

var input2 = document.getElementById("to");
var autocomplete2 = new google.maps.places.Autocomplete(input2, options)


