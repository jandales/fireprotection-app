import { useEffect, useState } from "react";
import {  useForm, usePage  } from '@inertiajs/react';
import {  toast } from 'react-toastify';

import {   
    CRow,
    CCard,
    CCardHeader,
    CCol, 
    CButton,
    CCardBody,  
    CFormLabel,
    CFormInput 
 
  } from '@coreui/react'

import CIcon from '@coreui/icons-react'; 

import { 
  cilWarning
 } from '@coreui/icons'; 

const CurrenctAlert = ({notification, onUpdatedStatus}) => {  


    const { patch } = useForm(); 
    
    const onUpdateStatus = (status) => { 

      if (!notification || !notification.id) return;
    
        if(status == 'dispatch') {        
            patch(route('notifications.update.status.dispatch', {id : notification.id}), {
                preserveScroll: true,
                onSuccess: () => {                        
                    toast.success("Successfully Update status", {
                        autoClose: 1000,
                    });
                    notification.status = 'dispatched'
                    onUpdatedStatus(notification)
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
                notification.status = 'closed'
                onUpdatedStatus(notification)
            
              
            }                        
        });



       

    } 

    return (
        <CCard className="mb-4">
                    <CCardHeader>
                        <CRow>
                            <CCol md={11}>
                              <div className='device-header capitalize'>
                                    {notification.message}
                              </div>
                            </CCol>                            
                        </CRow>                      
                    </CCardHeader>  
                      <CCardBody>
                        <CCol md={12}>
                                  <CRow>
                                     
                                        <CFormLabel htmlFor="province" className="col-sm-2 col-md-3 col-form-label">
                                            Name
                                        </CFormLabel>
                                      <CCol sm={9}>
                                      <CFormInput
                                          id="province" 
                                          plainText  
                                          readOnly 
                                          className='capitalize'  
                                          value={`: ${notification?.user?.name ?? '' }`}            
                                      />
                                      </CCol>
                                  </CRow>
                        </CCol> 

                        <CCol md={12}>
                                  <CRow>
                                     
                                        <CFormLabel htmlFor="province" className="col-sm-2 col-md-3 col-form-label">
                                            Location
                                        </CFormLabel>
                                        
                                  
                                      <CCol sm={9}>
                                      <CFormInput
                                          id="province" 
                                          plainText  
                                          readOnly 
                                          className='capitalize'                                     
                                          value={`: ${notification?.device.location ?? '' }`}             
                                      />
                                      </CCol>
                                  </CRow>
                        </CCol> 

                        <CCol md={12}>
                                  <CRow>                                     
                                        <CFormLabel htmlFor="province" className="col-sm-2 col-md-3 col-form-label">
                                            Contact
                                        </CFormLabel>   
                                      <CCol sm={9}>
                                      <CFormInput
                                          id="contact"  
                                          readOnly
                                          plainText
                                          className='capitalize'                                     
                                          value={`: ${notification?.user.phonenumber ?? '' }`}
                                                   
                                      />
                                      </CCol>
                                  </CRow>
                        </CCol> 

                        <CCol md={12}>
                                  <CRow className="mb-1">                                     
                                        <CFormLabel htmlFor="province" className="col-sm-2 col-md-3 col-form-label">
                                            Status:
                                        </CFormLabel>
                                      <CCol sm={8}>
                                      <CFormInput
                                          id="status" 
                                          readOnly
                                          className='capitalize'
                                          value={`: ${notification?.status ?? '' }`}
                                          plainText             
                                      />
                                      </CCol>
                                  </CRow>
                        </CCol> 

                        <CCol md={12} className='flex justify-content-end gap-10'>
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
                        </CCol>

                      </CCardBody>      
            </CCard>
    );
};

export default CurrenctAlert;
