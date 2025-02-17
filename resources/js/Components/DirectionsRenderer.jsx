import React, { useState, useEffect } from "react";
import { useJsApiLoader,  DirectionsRenderer  } from "@react-google-maps/api";

const MapDirectionsRenderer = ({ origin, destination }) => {

    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
      })

    const [directionsResponse, setDirectionsResponse] = useState(null);

 
    useEffect(() => {
        if ( isLoaded) {
            
            const origin1 = new window.google.maps.LatLng(origin.lat, origin.lng);
            const destination1 = new window.google.maps.LatLng(12.512838, 124.288903); 
      
            const directionsService = new window.google.maps.DirectionsService();
   
            directionsService.route(
                {
                    origin : origin1,
                    destination : destination1,
                    travelMode: window.google.maps.TravelMode.DRIVING
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
            {isLoaded &&  directionsResponse && <DirectionsRenderer directions={directionsResponse} />}       
       </>
    );
};

export default MapDirectionsRenderer;
