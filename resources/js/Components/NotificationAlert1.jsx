import React, { useEffect, useState, useRef } from 'react';
import {  useForm  } from '@inertiajs/react';
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

import CIcon from '@coreui/icons-react'; 
import { 
  cilWarning
 } from '@coreui/icons'; 

const NotificationAlert1 = () => {
    
    const [notification, setNotification] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);

    const childRef = useRef();
    const { patch } = useForm(); 

    useEffect(() => {
     
        echo.channel("notification-channel").listen("NotificationEvent", (e) => {
            const device = e.notification.device;  
          
            setIsModalOpen(true);             
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
                }                        
            });
    
        } 

    

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

export default NotificationAlert1;
