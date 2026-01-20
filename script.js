document.addEventListener('DOMContentLoaded', function() {
    const geoButton = document.getElementById('geoButton');
    const contentFrame = document.getElementById('contentFrame');
    // Example: Geofence around a specific area (e.g., your office)
    const centerLat = 1.3500; // Los Angeles
    const centerLng = 103.8991;
    const radius = 500; // 1000 meters (1 km)

    // Function to calculate distance (Haversine formula - simplified)
    function calculateDistance(lat1, lon1, lat2, lon2) {
        // Basic Euclidean distance approximation for small radii in meters
        const R = 6371000; // Earth's radius in meters
        const dLat = (lat2 - lat1) * Math.PI / 180;
        const dLon = (lon2 - lon1) * Math.PI / 180;
        const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
                  Math.cos(lat1 * Math.PI/180) * Math.cos(lat2 * Math.PI/180) *
                  Math.sin(dLon/2) * Math.sin(dLon/2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
        return R * c; // Distance in meters
    }

    // Request location
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const userLat = position.coords.latitude;
                const userLng = position.coords.longitude;
                const distance = calculateDistance(centerLat, centerLng, userLat, userLng);

                if (distance <= radius) {
                    // Inside the geofence
                    geoButton.disabled = false; // Enable the button
                    contentFrame.removeAttribute('hidden'); // Unhide the iframe
                    // Optional: Add click listener to the button now
                    geoButton.addEventListener('click', () {
                        console.log("Inside geofence, iframe should be visible!");
                        // If you want the iframe to appear *only* on click:
                        // contentFrame.style.display = 'block';
                    });
                } else {
                    // Outside the geofence
                    console.log("Outside geofence. Distance:", distance, "m");
                    // Optionally show a message or keep hidden
                    // geoButton.textContent = "You are outside the area.";
                }
            },
            (error) => {
                // Handle geolocation errors (permission denied, etc.)
                console.error("Geolocation error:", error.message);
                // geoButton.textContent = "Location services failed.";
            }
        );
    } else {
        console.log("Geolocation not supported by browser.");
        // geoButton.textContent = "Location not supported.";
    }
});
