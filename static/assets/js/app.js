    // Set map options
    var myLatLng = { lat: 0.349998, lng: 32.567164398 };
    var mapOptions = {
      center: myLatLng,
      zoom: 7,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
    };

    // Create map
    var map = new google.maps.Map(document.getElementById("googleMap"), mapOptions);

    // Create a DirectionsService object to use the route method and get a result for our request
    var directionsService = new google.maps.DirectionsService();

    // Create a DirectionsRenderer object which we will use to display the route
    var directionsDisplay = new google.maps.DirectionsRenderer();

    // Bind the DirectionsRenderer to the map
    directionsDisplay.setMap(map);

    // Define calcRoute function
    function calcRoute() {
      // Create request
      var request = {
        origin: document.getElementById("from").value,
        destination: document.getElementById("to").value,
        travelMode: google.maps.TravelMode.WALKING, // DRIVING, BICYCLING, TRANSIT
        unitSystem: google.maps.UnitSystem.IMPERIAL,
      };

      // Pass the request to the route method
      directionsService.route(request, function (result, status) {
        if (status == google.maps.DirectionsStatus.OK) {
          // Get distance and time
          const output = document.querySelector("#output");
          output.innerHTML =
            "<div class='alert-info'>From: " +
            document.getElementById("from").value +
            ".<br />To: " +
            document.getElementById("to").value +
            ".<br /> Walking distance <i class='fas fa-road'></i> : " +
            result.routes[0].legs[0].distance.text +
            ".<br />Duration <i class='fas fa-hourglass-start'></i> : " +
            result.routes[0].legs[0].duration.text +
            ".</div>";

          // Display route
          directionsDisplay.setDirections(result);
        } else {
          // Delete route from map
          directionsDisplay.setDirections({ routes: [] });
          // Center map in London
          map.setCenter(myLatLng);

          // Show error message
          output.innerHTML =
            "<div class='alert-danger'><i class='fas fa-exclamation-triangle'></i> Could not retrieve driving distance.</div>";
        }
      });
    }

    // checking and requesting for permissions on gprs locaction
    function checkGeolocationPermission() {
        if ("permissions" in navigator) {
          navigator.permissions
            .query({ name: "geolocation" })
            .then(function (permissionStatus) {
              if (permissionStatus.state === "granted") {
                // Geolocation permission is granted
                console.log("Geolocation permission granted.");
                // Your code to use geolocation goes here
              } else if (permissionStatus.state === "prompt") {
                // Geolocation permission is not determined yet; user will be prompted to allow or deny
                console.log("Geolocation permission prompt.");
              } else if (permissionStatus.state === "denied") {
                // Geolocation permission is denied
                console.log("Geolocation permission denied.");
              }
            })
            .catch(function (error) {
              // Error occurred while checking geolocation permission
              console.error("Error checking geolocation permission:", error);
            });
        } else {
          // Browser does not support the permissions API
          console.error("Browser does not support navigator.permissions API.");
        }
    }

    // New function to get user's geolocation
    function getUserLocation() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          function (position) {
            const userLatLng = {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            };

            // Center the map to the user's current location
            map.setCenter(userLatLng);

            // Optionally, you can add a marker at the user's location
            new google.maps.Marker({
              position: userLatLng,
              map: map,
              title: "Your Location",
            });

            // Call the calcRoute function to update the route with the user's current location
            document.getElementById("from").value = "Your Current Location";
            calcRoute();
          },
          function () {
            // Handle geolocation error, e.g., permissions denied
            alert("Error: The Geolocation service failed.");
          }
        );
      } else {
        // Browser doesn't support geolocation
        alert("Error: Your browser doesn't support geolocation.");
      }
    }