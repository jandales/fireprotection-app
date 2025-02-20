import DefaultLayout from '@/Layouts/DefaultLayout';
import { Link, router } from '@inertiajs/react';
import React, { useEffect,useState } from "react";

import {
  CCard,
  CCardHeader,
  CCol,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CAvatar,
  CButton,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import {  cilPeople, cilFilterX  } from '@coreui/icons'
import DefaultAvatar from  '@/assets/images/avatars/user.png';
import Pagination from '@/Components/Pagination';
import Search from '@/Components/Search';
import echo from "../../../js/echo.js"
import ViewAlert from '@/Pages/Admin/Notification/ViewAlert.jsx';

const Notification = (res, filter) => { 
    
    const notifications  = res.notifications  

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [alert, setAlert] = useState("");      
    
    const onPageChange = (url) => {
        router.get(url, {}, { preserveScroll: true, preserveState: true });
    } 

    useEffect(() => {
        echo.channel("notification-channel").listen("NotificationEvent", (e) => {  
            router.get('/notifications', {}, { preserveScroll: true, preserveState: true });
        });

        return () => {
            echo.leaveChannel("notification-channel"); 
        };
        
    }, []);

    const handleOpenModal = (state, item) => {
        setIsModalOpen(state);   
        setAlert(item);        
    }

    const handleCloseModal = () => {
        setIsModalOpen(false); 
    }

  return (
      <DefaultLayout     
      >
        <div className="py-12">
        <CRow>
            <CCol xs>
            <CCard className="mb-4">
                <CCardHeader>    
                    <Search route={route('notifications')} filter={filter} />  
                </CCardHeader>        
                <CTable align="middle" className="mb-0 border" hover responsive>
                    <CTableHead className="text-nowrap">
                    <CTableRow>  
                        <CTableHeaderCell className="bg-body-tertiary text-center">
                        <CIcon icon={cilPeople} />
                        </CTableHeaderCell>                
                        <CTableHeaderCell className="bg-body-tertiary">
                            Name
                        </CTableHeaderCell> 
                        {/* <CTableHeaderCell className="bg-body-tertiary">
                            Device 
                        </CTableHeaderCell>                   */}
                        <CTableHeaderCell className="bg-body-tertiary">
                            Location
                        </CTableHeaderCell>                      
                        <CTableHeaderCell className="bg-body-tertiary">
                            Date & Time
                        </CTableHeaderCell>
                        <CTableHeaderCell className="bg-body-tertiary">
                            Status
                        </CTableHeaderCell> 
                        <CTableHeaderCell className="bg-body-tertiary">
                            Action
                        </CTableHeaderCell> 
                    </CTableRow>
                    </CTableHead>
                    <CTableBody>
                    {notifications.data.map((item, index) => (
                        <CTableRow v-for="item in tableItems" key={index}>
                        <CTableDataCell className="text-center">
                            <CAvatar size="md" src={item.user.avatar ? item.user.avatar : DefaultAvatar} />
                        </CTableDataCell>
                        <CTableDataCell>
                            <div>{item.name}</div>
                            <div>
                                <small className='font'>{item.user.email}</small>
                                { item.user.phonenumber && (<small className='mx-1'>|</small>)}
                                <small>{item.user.phonenumber}</small>
                            </div>
                        </CTableDataCell>
                        {/* <CTableDataCell>
                            <div>{item.deviceName + ':' + item.macAddress}</div>                       
                        </CTableDataCell>                      */}
                        <CTableDataCell>
                            <div>{item.deviceLocation}</div>                       
                        </CTableDataCell> 
                        <CTableDataCell>
                            <div>{item.created_at}</div>                       
                        </CTableDataCell> 
                        <CTableDataCell >
                            <div className='text-capitalize small'>{item.status}</div>                       
                        </CTableDataCell> 
                        <CTableDataCell>
                            <div className='btn-gap'>
                                <CButton color="info" variant="outline" size="sm"  onClick={(e) => handleOpenModal(true, item)}>View</CButton> 
                            </div>                  
                        </CTableDataCell>                            
                        </CTableRow>
                        
                    ))}
                    </CTableBody>
                </CTable> 

                 { notifications.last_page > 1 && (
                    <Pagination
                        currentpage={notifications.current_page}
                        nextpage={notifications.next_page_url}
                        prevpage={notifications.prev_page_url}
                        firstpage={notifications.first_page_url}
                        lastpage={notifications.last_page_url}
                        totalRecord={notifications.total}
                        totalPage={notifications.last_page}
                        onPageChange={onPageChange}
                     />
                 )}
                
            </CCard>
            </CCol>
        </CRow>             
            <ViewAlert visible={isModalOpen} notification={alert} onClose={handleCloseModal} />
        </div>
     </DefaultLayout>
  )
}

export default Notification
