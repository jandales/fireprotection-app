import React, { useState, useEffect } from "react";
import { useJsApiLoader, GoogleMap, LoadScript, DirectionsService, DirectionsRenderer,  Marker } from "@react-google-maps/api";
import { compileString } from "sass";


const MapComponent = ({ origin, destination }) => {

    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
      })

    const [directionsResponse, setDirectionsResponse] = useState(null);
    const [error, setError] = useState(null);
 
    useEffect(() => {
        if ( isLoaded && origin && destination) {
     
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
    }, [origin, destination, isLoaded]);

    return (
       <>
            {isLoaded && <GoogleMap
                center={{ lat: 39.5, lng: -76 }} // Default center
                zoom={7}
                mapContainerStyle={{ width: "100%", height: "500px" }}
                options={{
                    zoomControl : false,
                    mapTypeControl : false,
                    streetViewControl : false,
                    fullscreenControl: false,
                }}
            >         
                    {directionsResponse && <DirectionsRenderer directions={directionsResponse} />}
                    {error && <p style={{ color: "red" }}>{error}</p>}
            </GoogleMap>}
       </>
    );
};

export default MapComponent;
