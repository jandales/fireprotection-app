import React, { useState, useEffect } from "react";
import { GoogleMap, LoadScript, DirectionsService, DirectionsRenderer } from "@react-google-maps/api";

const DirectionsMap = ({ origin, destination }) => {
    const [directionsResponse, setDirectionsResponse] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (origin && destination) {
            const directionsService = new window.google.maps.DirectionsService();
            
            directionsService.route(
                {
                    origin,
                    destination,
                    travelMode: window.google.maps.TravelMode.DRIVING, // Can change to WALKING, BICYCLING, TRANSIT
                },
                (result, status) => {
                    if (status === window.google.maps.DirectionsStatus.OK) {
                        setDirectionsResponse(result);
                    } else {
                        setError(`Error fetching directions: ${status}`);
                    }
                }
            );
        }
    }, [origin, destination]);

    return (
        <LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
            <GoogleMap
                center={{ lat: 39.5, lng: -76 }} // Default center
                zoom={7}
                mapContainerStyle={{ width: "100%", height: "500px" }}
            >
                {directionsResponse && <DirectionsRenderer directions={directionsResponse} />}
                {error && <p style={{ color: "red" }}>{error}</p>}
            </GoogleMap>
        </LoadScript>
    );
};

export default DirectionsMap;
