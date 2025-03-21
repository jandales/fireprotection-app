import React, { useEffect, useState, useRef } from 'react';
import {  useForm, usePage  } from '@inertiajs/react';
import echo from "../echo.js"
import {  toast } from 'react-toastify';
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
import { useSelector, useDispatch } from "react-redux";
import { 
  cilWarning
 } from '@coreui/icons'; 

const NotificationAlert = () => {
    const station= usePage().props.station;
    const dispatch = useDispatch()
    const [notification, setNotification] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [destination, setDestination] = useState("");
    const childRef = useRef();
    const { patch } = useForm(); 
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
            dispatch({ type: "set", isPlaying: true });       
            childRef.current?.rerenderDirection();     
        });

        return () => {
            echo.leaveChannel("notification-channel"); 
        };
    }, []);

       const onUpdateStatus = (status) => { 
    
          if (!notification || !notification.id) return;

          const alert = notification;
        
            if(status == 'dispatch') {        
                patch(route('notifications.update.status.dispatch', {id : notification.id}), {
                    preserveScroll: true,
                    onSuccess: () => {                        
                        toast.success("Successfully Update status", {
                            autoClose: 1000,
                        });     
                        alert.status = 'dispatched'
                        setNotification(alert)   
                        dispatch({ type: "set", isPlaying: false });           
                    }                        
                });
                return;
            }          
    
            patch(route('notifications.update.status.close', {id : notification.id}), {
                preserveScroll: true,
                onSuccess: () => {                        
                    toast.success("Successfully Update status", {
                        autoClose: 1000,
                    });   
                    alert.status = 'closed'
                    setNotification(alert) 
                    dispatch({ type: "set", isPlaying: false });              
                }                        
            });
    
        } 

    const handleCloseAlert = () => {
      setIsModalOpen(false)
      dispatch({ type: "set", isPlaying: false });
    }
    

    return (
        <div>           
             <CModal
                    size="lg"
                    visible={isModalOpen}
                    onClose={() => handleCloseAlert()}
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
                                    <p className="capitalize">Status   : {notification.status}</p>
                                </div>
                                <div className="alert-button-wrapper">
                                  { !['dispatched', 'dispatch', 'closed'].includes(notification.status) &&
                                    <CButton color="warning" variant="outline" size="sm"  onClick={() => onUpdateStatus("dispatch")}>
                                            Dispatch
                                    </CButton>
                                  } 
                                  { !['closed'].includes(notification.status) &&
                                    <CButton color="success" variant="outline" size="sm"  onClick={() => onUpdateStatus("close")}>
                                            Close
                                    </CButton>  
                                  }
                               </div>

                            </div> 
                 
                      <MapComponent origin={origin} destination={destination} ref={childRef}  />
                            
                    </CModalBody> 
                    <CModalFooter>
                      <CButton color="secondary" onClick={() => handleCloseAlert()}>
                        Close
                      </CButton>                     
                    </CModalFooter>
                
                    </CModal>           
        </div>
    );
};

export default NotificationAlert;
