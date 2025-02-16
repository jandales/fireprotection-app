import { useEffect, useState } from "react";
import {   
    CButton,
    CModal,
    CModalBody,
    CModalFooter,
    CModalHeader,
    CModalTitle,
 
  } from '@coreui/react'
import warningIcon from '@/assets/images/warning.png'
import MapComponent from '@/Components/MapComponent';
import { usePage } from '@inertiajs/react';
import CIcon from '@coreui/icons-react'; 
import { 
  cilWarning
 } from '@coreui/icons'; 

const ViewAlert = ({visible, notification, onClose}) => { 
    const location = usePage().props.location;

    const [isModalOpen, setIsModalOpen] = useState(false); 
    const [origin, setOrigin] = useState("");
    const [destination, setDestination] = useState("Lagundi Allen Northern Samar");
  
    useEffect(() => {
        setIsModalOpen(visible)
        setOrigin(location.address)
        setDestination(notification.location)
  
    }, [visible, isModalOpen]);

    return (
        <div>           
             <CModal
                    size="lg"
                    visible={isModalOpen}
                    onClose={() => onClose()}
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
                      
                      <MapComponent origin={origin} destination={destination} />
                    </CModalBody>
                    <CModalFooter>
                      <CButton color="secondary"  onClick={(e) => onClose()}>
                        Close
                      </CButton>                     
                    </CModalFooter>
                
                    </CModal>           
        </div>
    );
};

export default ViewAlert;
