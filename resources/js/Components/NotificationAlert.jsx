import { useEffect, useState } from "react";
import echo from "../echo.js"
import {   
    CButton,
    CModal,
    CModalBody,
    CModalFooter,
    CModalHeader,
    CModalTitle,
 
  } from '@coreui/react'
import warningIcon from '@/assets/images/warning.png'

const NotificationAlert = () => {
    const [notification, setNotification] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        echo.channel("notification-channel").listen("NotificationEvent", (e) => {  
            setNotification(e.notification);     
            setIsModalOpen(true);         
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
                      <CModalTitle id="LiveDemoExampleLabel">Alerts</CModalTitle>
                    </CModalHeader>
                    <CModalBody>
                            <div className="alert-wrapper">
                                <div className="alert-icon">
                                     <img src={warningIcon} width="120px" height="120px"  />
                                </div>                                 
                                <div className="alert-body">
                                    <p>{notification.message}</p>
                                    <p>Name     : {notification.user?.name && notification.user.name}</p> 
                                    <p>Contact  : {notification.user?.phonenumber}</p> 
                                    <p>Location : {notification.device?.ysnLocation == true ? notification.user?.location : notification.device?.location}</p>
                                    <p>Device   : {notification.device?.name}</p>
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

export default NotificationAlert;
