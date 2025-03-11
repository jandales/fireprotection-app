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
import { useSelector, useDispatch } from "react-redux";
import {  
    CRow,
    CCard,
    CCardHeader,
    CCol, 
    CButton   
} from '@coreui/react'
import { motion } from "framer-motion";

const Dashboard = ({notifications}) => { 

    const isPlaying = useSelector((state) => state.isPlaying);
    const dispatch = useDispatch()
    const recentAlerts  = notifications    
    const station = usePage().props.station; 
    const [activceAlerts, setActivceAlerts] = useState([]); 
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [alertData, setAlertData] = useState(null);
    const [destination, setDestination] = useState();   
    const [radius, setRadius] = useState(); 

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
          dispatch({ type: "set", isPlaying: true });
      });

      return () => {
          echo.leaveChannel("notification-channel"); 
      };
      
  }, []); 

  const onHandleClearDirection = () => {
      setDestination(null)  
      setAlertData(null)      
      setZoom(zoom == 15 ? 14 : 15); 
      getActiveAlerts();        
  }

  const onHandleCloseModal = () => {
      setIsModalOpen(false);
      dispatch({ type: "set", isPlaying: false }); 
  };
  
  useEffect(() => {

    if (!notifications || !notifications.data) return;

    getActiveAlerts();
    
  
  }, [notifications]);


  const getActiveAlerts =() => {
  const locationSet = new Set();
  
  const reconstructedAlerts = notifications.data
      .filter((notification) => notification.status === 'active' || notification.status === 'dispatched') 
      .map((notification) => {
        const location = notification?.device?.location;  
      
        if (locationSet.has(location)) return null;
  
        locationSet.add(location);
  
        return {
          id: notification.id,
          location: location,
          position: { 
            lat: notification?.device?.latitude, 
            lng: notification?.device?.longitude 
          },
          status: notification.status
        };
      })
      .filter(Boolean); 
    setActivceAlerts(reconstructedAlerts); 
  } 

  useEffect(() => {
    const interval = setInterval(() => {
      setRadius((prev) => (prev === 200 ? 250 : 200)); 
    }, 500); 
  
    return () => clearInterval(interval);
  }, []);

  const handleAlertClick = (notification) => {
    if(notification){ 
      setDestination({
        id : notification.id,
        location : notification?.device?.location,
        position : { 
              lat : notification?.device?.latitude,
              lng : notification?.device?.longitude 
        },
        status : notification.status
      }) 
      setAlertData(notification); 
      setActivceAlerts([])
      window.scrollTo({ top: 0, behavior: 'smooth' }); 
    }   
  }; 

  const handleSetDirections = (item) => {
    setDestination(item)
    setActivceAlerts([])
  }

  const handleUpdateStatus = (data) => {
    setAlertData(data); 
    setDestination({
      id : data.id,
      location : data?.device?.location,
      position : { 
            lat : data?.device?.latitude,
            lng : data?.device?.longitude 
      },
      status : data.status
    })    
  }

  return (
      <DefaultLayout     
      >
        <div className="py-12">
        <CRow>
            <CCol xs={12} md={9}>
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
                                                                          
                                          { activceAlerts.map((item, index) => (
                                            <motion.div 
                                                  key={index}
                                                  animate={{
                                                    scale: [1, 1.3, 1], 
                                                  }}
                                                  transition={{
                                                    duration: 1.2,
                                                    repeat: Infinity, 
                                                    ease: "easeInOut",
                                                  }}
                                                  style={{ display: "inline-block" }}
                                                >
                                              <Circle
                                                key={index}
                                                center={item.position}
                                                radius={radius} 
                                                options={{
                                                  strokeColor: item.status === 'active' ? '#FF0000' : '#FFA500',
                                                  strokeOpacity: 0.8,
                                                  strokeWeight: 2,
                                                  fillColor: item.status === 'active' ? '#FF0000' : '#FFA500',
                                                  fillOpacity: opacity,
                                                }}
                                                onClick={() => handleSetDirections(item)}
                                              />
                                            </motion.div>
                                            )) }   

                              { 
                                destination  
                                && <>
                                <MapDirectionsRenderer origin={origin.position} destination={destination} isLoaded={isLoaded} />
                                <motion.div 
                                      animate={{
                                        scale: [1, 1.3, 1], 
                                      }}
                                      transition={{
                                        duration: 1.2,
                                        repeat: Infinity, 
                                        ease: "easeInOut",
                                      }}
                                      style={{ display: "inline-block" }}
                                    >
                                <Circle                                  
                                      center={destination.position}
                                      radius={radius} 
                                      options={{
                                        strokeColor: 
                                            destination.status === "active"
                                          ? "#FF0000"
                                          : destination.status === "closed"
                                          ? "#008000"
                                          : "#FFA500",
                                        strokeOpacity: 0.8,
                                        strokeWeight: 2,
                                        fillColor:
                                        destination.status === "active"
                                          ? "#FF0000"
                                          : destination.status === "closed"
                                          ? "#008000"
                                          : "#FFA500",
                                        fillOpacity: opacity,
                                      }}                                      
                                />
                                </motion.div>
                                </>
                          
                               }
                                </GoogleMap>}
                </CCard>

            </CCol>
            <CCol xs={12} md={3}>
              
              { alertData && <CurrenctAlert notification={alertData} onUpdatedStatus={handleUpdateStatus} /> }

              <RecentAlerts alerts={recentAlerts} id={destination?.id} handleAlertClick={handleAlertClick}  />

            </CCol>
        </CRow>
        </div>   
        { alertData && <ViewAlert visible={isModalOpen} notification={alertData} onUpdatedStatus={setAlertData} onClose={() => onHandleCloseModal()  } /> }

         {isPlaying && <BackgroundAudio /> }
     </DefaultLayout>
  )
}

export default Dashboard
