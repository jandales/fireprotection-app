import React, { useState,  useEffect } from 'react';
import DefaultLayout from '@/Layouts/DefaultLayout';
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

const Index = () => {      
    const [markerPosition, setMarkerPosition] = useState({ lat: 12.502073940630082, lng: 124.2888540898605 });
    const [highlightedMarker, setHighlightedMarker] = useState(null);
    const [markers, setMarkers] = useState(
        [
            { id: 1, position: { lat: 12.502073940630082, lng: 124.2888540898605 }, icon: 'https://maps.google.com/mapfiles/ms/icons/red-dot.png',  }, 
            { id: 1, position: { lat: 12.510587, lng: 124.285195 }, icon: 'https://maps.google.com/mapfiles/ms/icons/blue-dot.png', }, 
        ]
        
    );  
    
     // Handle marker click to highlight it
     const handleMarkerClick = (marker) => {
        setHighlightedMarker(marker.position);
    };



   const { isLoaded } = useJsApiLoader({
         id: 'google-map-script',
         googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
   })

 

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
                                  {markers.map((marker) => (
                                        <>
                                        <Marker 
                                            key={marker.id} 
                                            position={marker.position}
                                            icon={{
                                                url: marker.icon,
                                                scaledSize: new window.google.maps.Size(40, 40), // Adjust icon size
                                            }}
                                            onClick={() => handleMarkerClick(marker)}
                                         />
                                         {/* <Circle
                                         center={marker.position}
                                         radius={500} // Radius in meters
                                         options={{
                                             strokeColor: '#FF0000',
                                             strokeOpacity: 0.8,
                                             strokeWeight: 2,
                                             fillColor: '#FF0000',
                                             fillOpacity: 0.35,
                                         }}                                         
                                     /> */}
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

export default Index
