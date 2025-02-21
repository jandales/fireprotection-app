import React, { useState,  useEffect } from 'react';
import DefaultLayout from '@/Layouts/DefaultLayout';
import FireMarker from '@/Components/FireMarker';
import ClickMarker from '@/Components/ClickMarker';
import FireStationIcon from '@/assets/images/fire-station.png';
import MapDirectionsRenderer from '@/Components/DirectionsRenderer'
import { usePage } from '@inertiajs/react';
import Alert from '@/Components/Alert'
import { useJsApiLoader, GoogleMap, Circle } from "@react-google-maps/api";
import NotificationAlert1 from '@/Components/NotificationAlert1'
import { router } from '@inertiajs/react';
import ViewAlert from '@/Components/ViewAlert'
import echo from "../../../js/echo.js"
import {  
    CRow,
    CCard,
    CCardHeader,
    CCol, 
    CButton,  
   
} from '@coreui/react'



const Dashboard = ({notifications}) => { 

    const recentAlerts  = notifications    
    const station = usePage().props.station;
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [alertData, setAlertData] = useState(null);
    const [destination, setDestination] = useState();

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

    const { isLoaded } = useJsApiLoader({
      id: 'google-map-script',
      googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
   })


    const status = 'active';


    const [opacity, setOpacity] = useState(0.35);

    useEffect(() => {
      echo.channel("notification-channel").listen("NotificationEvent", (e) => {  
          router.get('/notifications', {}, { preserveScroll: true, preserveState: true });
      });

      return () => {
          echo.leaveChannel("notification-channel"); 
      };
      
  }, []);

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setOpacity((prev) => (prev === 0.35 ? 0.1 : 0.35));
  //   }, 500); // Toggle every 500ms

  //   return () => clearInterval(interval);
  // }, []);

  const handleAlertClick = (notification) => {
    if(notification){     
   
      setDestination({
        location : notification?.device?.location,
        position : { 
              lat : notification?.device?.latitude,
              lng : notification?.device?.longitude 
        } 
      }) 
      setAlertData(notification);      
    }   
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
                            <CCol md={10}>
                              <div className='device-header'>
                                    Maps
                              </div>
                            </CCol> 
                            <CCol md={2}>
                              {destination &&
                              <div className='container-center-items'>
                                  <CButton color="info" variant="outline" size="sm" onClick={() => setIsModalOpen(true) } className='mx-2' >View/Action</CButton>  
                                  <CButton color="info" variant="outline" size="sm" onClick={() => setDestination(null) } >Clear</CButton>  
                              </div>
                              }
                            </CCol>                            
                        </CRow>                      
                    </CCardHeader>   
                                 
                    {isLoaded && <GoogleMap
                                    center={origin.position} // Default center
                                    zoom={15}
                                    mapContainerStyle={{ width: "100%", height: "700px" }}
                                    options={{
                                        zoomControl : false,
                                        mapTypeControl : false,
                                        streetViewControl : false,
                                        fullscreenControl: false,
                                    }}
                                >   
                                      {/* <ClickMarker
                                                marker={{
                                                    name: origin.name,
                                                    location: origin.location,
                                                    position: origin.position,
                                                    icon : origin.icon
                                                }} 
                                            /> */}

                                        <Circle
                                            center={origin.position}
                                            radius={50} // 200 meters
                                            options={{
                                              strokeColor: '#0000FF',    // Blue border
                                              strokeOpacity: 0.8,
                                              strokeWeight: 2,
                                              fillColor: '#0000FF',      // Blue fill
                                              fillOpacity: 0.35,
                                          }}
                                          />

                                       {status == 'active' && destination  && 
                                          <>
                                          {/* <FireMarker
                                                marker={{
                                                    name: "Jess",
                                                    location: "Allen",
                                                    position: destination?.position
                                                }} 
                                            /> */}
                                        
                                  
                                        <Circle
                                            center={destination.position}
                                            radius={100} // 200 meters
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

                              { destination  && <MapDirectionsRenderer origin={origin.position} destination={destination} isLoaded={isLoaded} /> }
                                           
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
                            alert={notification}                           
                            onAlertClick={handleAlertClick}                                            
                          />
                      ))}           
                </CCard>
            </CCol>
        </CRow>
        </div>    
        {/* <NotificationAlert1 />          */}
        { alertData && <ViewAlert visible={isModalOpen} notification={alertData} onClose={() => setIsModalOpen(false)} /> }
     </DefaultLayout>
  )
}

export default Dashboard
