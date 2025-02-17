import React, { useEffect, useState, useRef } from 'react';
import { usePage } from '@inertiajs/react';
import echo from "../echo.js"
import {   
    CButton,
    CModal,
    CModalBody,
    CModalFooter,
    CModalHeader,
    CModalTitle,
 
  } from '@coreui/react'
import MapComponent from '@/Components/MapComponent';
import CIcon from '@coreui/icons-react'; 
import { 
  cilWarning
 } from '@coreui/icons'; 
import { compileString } from 'sass';

const NotificationAlert = () => {
    const station= usePage().props.station;
   
    const [notification, setNotification] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [destination, setDestination] = useState("");
    const childRef = useRef();

    const origin = {
       location : station.address,
       position : { 
            lat : station.latitude,
            lng : station.longitude 
        } 
    };
 

    useEffect(() => {
        echo.channel("notification-channel").listen("NotificationEvent", (e) => {
            const device = e.notification.device; 

            const coordinates = { 
              location : device.location,
              position : {lat : device.latitude, lng : device.longitude }
            } 
            
            setNotification(null); 
            setDestination(null);
            
            setDestination({ ...coordinates });   
            setNotification(e.notification);  
            setIsModalOpen(true);             
            childRef.current?.rerenderDirection();     
        });

        return () => {
            echo.leaveChannel("notification-channel"); 
        };
    }, []);

    

    return (
        <div>           
             <CModal
                    size="lg"
                    visible={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    aria-labelledby="LiveDemoExampleLabel"
                  >               
                    <CModalHeader>
                    <CModalTitle id="LiveDemoExampleLabel">
                      <div className="alert-header">
                          <CIcon icon={cilWarning} size="3xl" style={{'--ci-primary-color': 'red'}} />
                          <div className="capitalize">{notification.message}</div>
                      </div>
                      </CModalTitle>
                    </CModalHeader>
                    <CModalBody>
                            <div className="alert-wrapper mb-2">
                                {/* <div className="alert-icon">
                                     <img src={warningIcon} width="120px" height="120px"  />
                                </div>                                  */}
                                <div className="alert-body">                                
                                    <p>Name     : {notification.user?.name && notification.user.name}</p> 
                                    <p>Contact  : {notification.user?.phonenumber}</p> 
                                    <p>Location : {notification.device?.ysnLocation == true ? notification.user?.location : notification.device?.location}</p>
                                    <p>Device   : {notification.device?.name}</p>
                                </div>
                            </div> 
                 
                      <MapComponent origin={origin} destination={destination} ref={childRef}  />
                            
                    </CModalBody> 
                    <CModalFooter>
                      <CButton color="secondary" onClick={() => setIsModalOpen(false)}>
                        Close
                      </CButton>                     
                    </CModalFooter>
                
                    </CModal>           
        </div>
    );
};

export default NotificationAlert;
