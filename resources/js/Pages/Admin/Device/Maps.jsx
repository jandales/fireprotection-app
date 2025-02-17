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
import { usePage } from '@inertiajs/react';

const Maps = (res) => { 

    const station = usePage().props.station;

    let devices = res.devices.map(device => ({
        id: device.id,
        name : device.user.name,
        contact  : device.user.phonenumber,
        position: {
          lat: device.latitude,
          lng: device.longitude,
        },
        location : device.location,
        icon: 'https://maps.google.com/mapfiles/ms/icons/red-dot.png', 
        //icon: 'https://maps.google.com/mapfiles/ms/icons/blue-dot.png', 
        origin : false
    }));

    const markerPosition  = { 
      contact  : station.contact,
      location : station.address,
      position : { lat: station.latitude, lng:  station.longitude} 
    }

    devices.push({
        id       : -999,
        name     : 'Fire Station',
        contact  : markerPosition.contact,
        position : markerPosition.position,
        location : markerPosition.location,
        icon     : 'https://maps.google.com/mapfiles/ms/icons/red-dot.png', 
        origin   : true
    })  

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
                                center={markerPosition.position} // Default center
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
                                                contact: marker.contact,
                                                location: marker.location,
                                                position: marker.position
                                            }} 
                                        />
                                         <Circle
                                            center={marker.position}
                                            radius={150} // Smaller radius (100 meters)
                                            options={{
                                                strokeColor: marker.origin ? '#0000FF' : '#008000',  
                                                strokeOpacity: 0.8,
                                                strokeWeight: 2,
                                                fillColor: marker.origin ? '#0000FF' : '#008000', 
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
