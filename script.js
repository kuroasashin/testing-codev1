function getLocationAndCheck() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition, showError);
  } else {
    alert("Geolocation is not supported by this browser.");
  }
}

function showPosition(position) {
  const lat = position.coords.latitude;
  const lng = position.coords.longitude;
  
  // --- Geofencing Logic Example ---
  // Check if within a hypothetical zone (e.g., 10.0 to 11.0 latitude, 100.0 to 101.0 longitude)
  const inZone = (lat > 10.0 && lat < 11.0) && (lng > 100.0 && lng < 101.0);
  
  if (inZone) {
    // If in zone, redirect or prepare to submit to Google Form
    // Example: Redirect with coordinates as URL parameters
    window.location.href = `https://docs.google.com/forms/d/e/1FAIpQLSc56AKRjO-izKZIV2Vum1GnfX1yOyt_AH-TuVNmkFqTH_kceA/viewform?latitude=${lat}&longitude=${lng}`;
    // Or submit data to a backend script/Sheet
    // submitToGoogleForm(lat, lng); 
  } else {
    alert("You are outside the allowed location.");
  }
}

function showError(error) {
  switch(error.code) {
    case error.PERMISSION_DENIED:
      alert("User denied the request for Geolocation.");
      break;
    case error.POSITION_UNAVAILABLE:
      alert("Location information is unavailable.");
      break;
    case error.TIMEOUT:
      alert("The request to get user location timed out.");
      break;
    case error.UNKNOWN_ERROR:
      alert("An unknown error occurred.");
      break;
  }
}

// Call this function when your page loads or a button is clicked
// getLocationAndCheck(); 

