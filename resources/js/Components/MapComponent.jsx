import React, { useEffect, useState, useImperativeHandle, forwardRef } from 'react';
import { useJsApiLoader, GoogleMap,  DirectionsRenderer } from "@react-google-maps/api";

const MapComponent = forwardRef(({origin, destination}, ref) => {

    const [renderKey, setRenderKey] = useState(0);
    const [directionsResponse, setDirectionsResponse] = useState(null);
    const [error, setError] = useState(null);

    useImperativeHandle(ref, () => ({
        rerenderDirection() {              
            getDirections();
        }
      }))   

    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    }) 

    const getDirections = () => {
        if (isLoaded && origin && destination) {
            setDirectionsResponse(null); 
            setRenderKey((prev) => prev + 1);
            const directionsService = new window.google.maps.DirectionsService();         
            directionsService.route(
                {
                    origin : origin.position,
                    destination : destination.position,
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
    }
 
    useEffect(() => {
        getDirections();
    }, [origin, destination, isLoaded]);



    return (
       <>
            {isLoaded && <GoogleMap
                center={origin.position} 
                zoom={7}
                mapContainerStyle={{ width: "100%", height: "500px" }}
                options={{
                    zoomControl : false,
                    mapTypeControl : false,
                    streetViewControl : false,
                    fullscreenControl: false,
                }}
            >  
                    {directionsResponse && <DirectionsRenderer key={renderKey} directions={directionsResponse} />}
                    {error && <p style={{ color: "red" }}>{error}</p>}
            </GoogleMap>}
       </>
    )});

export default MapComponent;
