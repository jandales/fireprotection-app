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
import CIcon from '@coreui/icons-react'
import {  cilWarning  } from '@coreui/icons'
const NotificationAlert = () => {
    const [message, setMessage] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        echo.channel("notification-channel").listen("NotificationEvent", (e) => {
            setMessage(e.message);
            setIsModalOpen((prev) => {
                console.log("Before state update:", prev);
                return true;
            });
            console.log(isModalOpen);
            console.log(e.message);
        });

        return () => {
            echo.leaveChannel("notification-channel"); // Cleanup when unmounting
        };
    }, []);

    useEffect(() => {
        console.log("Modal state updated:", isModalOpen);
    }, [isModalOpen]);

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
                                    <p>{message}</p>
                                    <p>Name     : Jesus Andales</p>
                                    <p>Contact  : 04124124124</p>
                                    <p>Location : Allen Northern Samar</p>
                                    <p>Device   : Device-1</p>
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
