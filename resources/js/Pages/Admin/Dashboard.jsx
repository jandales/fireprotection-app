import React, { useState,  useEffect } from 'react';
import DefaultLayout from '@/Layouts/DefaultLayout';
import FireMarker from '@/Components/FireMarker';
import ClickMarker from '@/Components/ClickMarker';
import FireStationIcon from '@/assets/images/fire-station.png';
import MapDirectionsRenderer from '@/Components/DirectionsRenderer'
import { usePage } from '@inertiajs/react';
import Alert from '@/Components/Alert'
import { useJsApiLoader, GoogleMap, Circle } from "@react-google-maps/api";

import {  
    CRow,
    CCard,
    CCardHeader,
    CCol,       
   
} from '@coreui/react'


const Dashboard = ({notifications}) => { 
    const recentAlerts  = notifications 
   
    const station = usePage().props.station;
  
    const [markerPosition, setMarkerPosition] = useState({ lat: 12.512838007591398 , lng: 124.28890301755825 });
    const [origin, setOrigin] = useState(
      {
        id: 1,
        name : station.name,      
        position: {
          lat: station.latitude,
          lng: station.longitude,
        },
        location : station.address,
        icon: FireStationIcon 
      }
    );
    const status = 'active';


   const { isLoaded } = useJsApiLoader({
         id: 'google-map-script',
         googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
   })

    const [opacity, setOpacity] = useState(0.35);

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setOpacity((prev) => (prev === 0.35 ? 0.1 : 0.35));
  //   }, 500); // Toggle every 500ms

  //   return () => clearInterval(interval);
  // }, []);

  const handleAlertClick = (message, device, date, status, type) => {
    console.log('Alert clicked:', { message, device, date, status, type });  
  };

  return (
      <DefaultLayout     
      >
        <div className="py-12">
        <CRow>
            <CCol xs md={9}>
                <CCard className="mb-4">
                    <CCardHeader>
                        <CRow>
                            <CCol md={11}>
                              <div className='device-header'>
                                    Maps
                              </div>
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
                                          <ClickMarker
                                                marker={{
                                                    name: origin.name,
                                                    location: origin.location,
                                                    position: origin.position,
                                                    icon : origin.icon
                                                }} 
                                            />
                                            <Circle
                                            center={origin.position}
                                            radius={150} // 200 meters
                                            options={{
                                              strokeColor: '#0000FF',    // Blue border
                                              strokeOpacity: 0.8,
                                              strokeWeight: 2,
                                              fillColor: '#0000FF',      // Blue fill
                                              fillOpacity: 0.35,
                                          }}
                                          />

                                      {status == 'active'   && 
                                          <>
                                          <FireMarker
                                                marker={{
                                                    name: "Jess",
                                                    location: "Allen",
                                                    position: markerPosition
                                                }} 
                                            />
                                        
                                        <Circle
                                            center={markerPosition}
                                            radius={150} // 200 meters
                                            options={{
                                              strokeColor: '#FF0000',    // Red border
                                              strokeOpacity: 0.8,
                                              strokeWeight: 2,
                                              fillColor: '#FF0000',      // Red fill
                                              fillOpacity: opacity,
                                            }}
                                          />
                                          </>
                                            }
                                            <MapDirectionsRenderer origin={origin.position} destination={markerPosition} />
                                </GoogleMap>}
                </CCard>
            </CCol>
            <CCol xs md={3}>
            <CCard className="mb-4">
                    <CCardHeader>
                        <CRow>
                            <CCol md={11}>
                              <div className='device-header'>
                                    Recent Alert
                              </div>
                            </CCol>                            
                        </CRow>                      
                    </CCardHeader>                        
                      {recentAlerts.data.map((notification, index) => (
                          <Alert 
                            key={index} 
                            type={notification.type}
                            message={notification.message}
                            date={notification.created_at}
                            device={notification.deviceName}
                            status={notification.status} 
                            onAlertClick={handleAlertClick}                                            
                          />
                      ))}           
                </CCard>
            </CCol>
        </CRow>
        </div>             
     </DefaultLayout>
  )
}

export default Dashboard
