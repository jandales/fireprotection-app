import React, { useState,  useEffect } from 'react';
import DefaultLayout from '@/Layouts/DefaultLayout';
import HoverMarker from '@/Components/HoverMarker';
import { Link } from '@inertiajs/react';
import { useJsApiLoader, GoogleMap, LoadScript, DirectionsService, DirectionsRenderer, Marker, Circle } from "@react-google-maps/api";
import CIcon from '@coreui/icons-react'; 
import { 
    cilMap,
    cilList
 } from '@coreui/icons'; 
import {  
    CRow,
    CCard,
    CCardHeader,
    CCol,         
   
} from '@coreui/react'
import ClickMarker from '@/Components/ClickMarker';

const Maps = (res) => { 

    const devices = res.devices.map(device => ({
        id: device.id,
        name : device.user.name,
        position: {
          lat: device.latitude,
          lng: device.longitude,
        },
        location : device.location,
        icon: 'https://maps.google.com/mapfiles/ms/icons/blue-dot.png', 
      }));
  
    const [markerPosition, setMarkerPosition] = useState({ lat: 12.502073940630082, lng: 124.2888540898605 });


   const { isLoaded } = useJsApiLoader({
         id: 'google-map-script',
         googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
   })

    const [opacity, setOpacity] = useState(0.35);

  useEffect(() => {
    const interval = setInterval(() => {
      setOpacity((prev) => (prev === 0.35 ? 0.1 : 0.35));
    }, 500); // Toggle every 500ms

    return () => clearInterval(interval);
  }, []);


 

  return (
      <DefaultLayout     
      >
        <div className="py-12">
        <CRow>
            <CCol xs>
            <CCard className="mb-4">
                <CCardHeader>
                    <CRow>
                        <CCol md={11}>
                           <div className='device-header'>
                                 Maps
                           </div>
                        </CCol>
                        <CCol md={1} className='nav-list-icon'>                            
                            <Link  className='float-right' href={route('devices.maps')} >
                                    <CIcon icon={cilMap} size='lg' />
                            </Link>
                            <Link  className='mx-2 float-right' href={route('devices')} >
                                    <CIcon icon={cilList} size='lg' />
                            </Link>
                        </CCol>
                    </CRow>                      
                </CCardHeader>        
                 {isLoaded && <GoogleMap
                                center={markerPosition} // Default center
                                zoom={15}
                                mapContainerStyle={{ width: "100%", height: "700px" }}
                                options={{
                                    zoomControl : false,
                                    mapTypeControl : false,
                                    streetViewControl : false,
                                    fullscreenControl: false,
                                }}
                            >         
                                  {devices.map((marker) => (
                                        <>
                                   
                                       <ClickMarker
                                            marker={{
                                                name: marker.name,
                                                location: marker.location,
                                                position: marker.position
                                            }} 
                                        />
                                         <Circle
                                            center={marker.position}
                                            radius={200} // Smaller radius (100 meters)
                                            options={{
                                                strokeColor: '#0000FF',    // Blue border
                                                strokeOpacity: 0.8,
                                                strokeWeight: 2,
                                                fillColor: '#0000FF',      // Blue fill
                                                fillOpacity: 0.35,
                                            }}
                                            />
                                           
                                     </>
                                   ))}


                            </GoogleMap>}
            </CCard>
            </CCol>
        </CRow>
        </div>             
     </DefaultLayout>
  )
}

export default Maps
