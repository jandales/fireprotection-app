import React, { useState,  useEffect } from 'react';
import DefaultLayout from '@/Layouts/DefaultLayout';
import FireMarker from '@/Components/FireMarker';
import ClickMarker from '@/Components/ClickMarker';
import FireStationIcon from '@/assets/images/fire-station.png';
import MapDirectionsRenderer from '@/Components/DirectionsRenderer'
import { usePage } from '@inertiajs/react';
import RecentAlerts from '@/Components/RecentAlerts.jsx'
import { useJsApiLoader, GoogleMap, Circle } from "@react-google-maps/api";
import { router } from '@inertiajs/react';
import ViewAlert from '@/Components/ViewAlert'
import CurrenctAlert from '@/Components/CurrenctAlert'
import echo from "../../../js/echo.js"
import BackgroundAudio from '@/Components/BackgroundAudio';
import {  
    CRow,
    CCard,
    CCardHeader,
    CCol, 
    CButton   
} from '@coreui/react'



const Dashboard = ({notifications}) => { 

    const recentAlerts  = notifications    
    const station = usePage().props.station; 
    const [activceAlerts, setActivceAlerts] = useState([]); 
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [alertData, setAlertData] = useState(null);
    const [destination, setDestination] = useState();
    const [audio] = useState(new Audio("/storage/fire-alarm.mp3"));
    const [isPlaying, setIsPlaying] = useState(false);
    const [zoom, setZoom] = useState(13);

    const [origin] = useState(
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
          
          router.get('/dashboard', {}, { preserveScroll: true, preserveState: true });        

          const _alert = {
            id : e.notification.id,
            location : e.notification?.device?.location,
            position : { 
                  lat : e.notification?.device?.latitude,
                  lng : e.notification?.device?.longitude 
            } 
          }

          setDestination(_alert);
          setAlertData(e.notification);
          setIsModalOpen(true);

      });

      return () => {
          echo.leaveChannel("notification-channel"); 
      };
      
  }, []); 

  const onHandleClearDirection = () => {
      setDestination(null)  
      setAlertData(null)      
      setZoom(zoom == 15 ? 14 : 15);         
  }

  useEffect(() => {
    if (!notifications || !notifications.data) return;
  
    const locationSet = new Set();
  
    const reconstructedAlerts = notifications.data
      .filter((notification) => notification.status === 'active') // ✅ Filter active alerts
      .map((notification) => {
        const location = notification?.device?.location;
  
        // If location already exists, return null (we will filter it out later)
        if (locationSet.has(location)) return null;
  
        locationSet.add(location); // ✅ Track unique locations
  
        return {
          id: notification.id,
          location: location,
          position: { 
            lat: notification?.device?.latitude, 
            lng: notification?.device?.longitude 
          }
        };
      })
      .filter(Boolean); // ✅ Remove `null` values from duplicates
  console.log(reconstructedAlerts)
    setActivceAlerts(reconstructedAlerts); // ✅ Update state
  
  }, [notifications]); // ✅ Runs when `notifications` changes
  
  
  

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setOpacity((prev) => (prev === 0.35 ? 0.1 : 0.35));
  //   }, 500); // Toggle every 500ms

  //   return () => clearInterval(interval);
  // }, []);

  const handleAlertClick = (notification) => {
    if(notification){ 
      setDestination({
        id : notification.id,
        location : notification?.device?.location,
        position : { 
              lat : notification?.device?.latitude,
              lng : notification?.device?.longitude 
        } 
      }) 
      setAlertData(notification); 
      window.scrollTo({ top: 0, behavior: 'smooth' }); 
    }   
  }; 

  const handleSetDirections = (item) => {
    setDestination(item)
  }

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
                              <div className='container-center-items justify-content-end'>                                
                                  <CButton color="info" variant="outline" size="sm" onClick={() => onHandleClearDirection() } >Clear Map</CButton>  
                              </div>
                              }
                            </CCol>                            
                        </CRow>                      
                    </CCardHeader>   
                                 
                    {isLoaded && <GoogleMap
                                    center={origin.position} // Default center
                                    zoom={zoom}
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
                                            
{/* 
                                        <Circle
                                            center={origin.position}
                                            radius={200} // 200 meters
                                            options={{
                                              strokeColor: '#0000FF',    // Blue border
                                              strokeOpacity: 0.8,
                                              strokeWeight: 2,
                                              fillColor: '#0000FF',      // Blue fill
                                              fillOpacity: 0.35,
                                          }}
                                          /> */}
                                      
                                          {activceAlerts.map((item, index) => (
                                              <Circle
                                                key={index}
                                                center={item.position}
                                                radius={200}
                                                options={{
                                                  strokeColor: '#FF0000',
                                                  strokeOpacity: 0.8,
                                                  strokeWeight: 2,
                                                  fillColor: '#FF0000',
                                                  fillOpacity: opacity,
                                                }}
                                                onClick={() => handleSetDirections(item)}
                                              />
                                            ))}   
{/* 
                                       {status == 'active' && destination  && 
                                          <>                                              
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
                              } */}

                              { destination  && <MapDirectionsRenderer origin={origin.position} destination={destination} isLoaded={isLoaded} />
                               }
                                </GoogleMap>}
                </CCard>

            </CCol>
            <CCol xs md={3}>

              { alertData && <CurrenctAlert notification={alertData} onUpdatedStatus={setAlertData} /> }

              <RecentAlerts alerts={recentAlerts} id={destination?.id} handleAlertClick={handleAlertClick}    />

            </CCol>
        </CRow>
        </div>   
        { alertData && <ViewAlert visible={isModalOpen} notification={alertData} onClose={() => setIsModalOpen(false)} /> }
        {/* <BackgroundAudio play={isPlaying} /> */}
     </DefaultLayout>
  )
}

export default Dashboard
