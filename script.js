document.getElementById('checkLocationBtn').addEventListener('click', function() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition, showError);
    } else {
        document.getElementById('result').innerHTML = "Geolocation is not supported by this browser.";
    }
});

// Define your geofence area (e.g., a simple circle around a specific point)
const geofenceCenter = {
    latitude: 1.3500,  // Example: Tokyo, Japan
    longitude: 103.8991
};
const geofenceRadius = 500; // Radius in meters (1 km)

function showPosition(position) {
    const userLat = position.coords.latitude;
    const userLon = position.coords.longitude;

    if (isWithinGeofence(userLat, userLon, geofenceCenter, geofenceRadius)) {
        document.getElementById('result').innerHTML = "You are **INSIDE** the geofenced area!";
    } else {
        document.getElementById('result').innerHTML = "You are **OUTSIDE** the geofenced area.";
    }
}

function showError(error) {
    switch(error.code) {
        case error.PERMISSION_DENIED:
            document.getElementById('result').innerHTML = "User denied the request for Geolocation.";
            break;
        case error.POSITION_UNAVAILABLE:
            document.getElementById('result').innerHTML = "Location information is unavailable.";
            break;
        case error.TIMEOUT:
            document.getElementById('result').innerHTML = "The request to get user location timed out.";
            break;
        case error.UNKNOWN_ERROR:
            document.getElementById('result').innerHTML = "An unknown error occurred.";
            break;
    }
}

// Function to calculate distance between two points (Haversine formula)
function isWithinGeofence(userLat, userLon, center, radius) {
    const R = 6371e3; // metres
    const φ1 = userLat * Math.PI/180; // φ, λ in radians
    const φ2 = center.latitude * Math.PI/180;
    const Δφ = (center.latitude - userLat) * Math.PI/180;
    const Δλ = (center.longitude - userLon) * Math.PI/180;

    const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
              Math.cos(φ1) * Math.cos(φ2) *
              Math.sin(Δλ/2) * Math.sin(Δλ/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

    const distance = R * c; // Distance in metres

    return distance < radius;
}
