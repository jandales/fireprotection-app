import React, { useState } from 'react';
import DefaultLayout from '@/Layouts/DefaultLayout';
import { Link, router, useForm } from '@inertiajs/react';
import NotificationAlert from '@/Components/NotificationAlert';
import ConfirmDelete from '@/Components/ConfirmDelete';
import {  
    CRow,
    CCard,
    CCardHeader,
    CButton,
    CCol,         
    CTable,
    CTableBody,
    CTableDataCell,
    CTableHead,
    CTableHeaderCell,
    CTableRow,      
    CModal,
    CModalBody,
    CModalFooter,
    CModalHeader,
    CModalTitle, 
    CFormInput,
    CFormCheck  
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import {  cilPeople  } from '@coreui/icons'
import user from  '@/assets/images/avatars/user.png';
import Pagination from '@/Components/Pagination';
import Search from '@/Components/Search';
import { toast } from 'react-toastify';



const Index = (res, filter) => {    
   
    const devices = res.devices 
    const [visible, setVisible] = useState(false)
    const [device, setDevice] = useState({});

    const onPageChange = (url) => {
        router.get(url, {}, { preserveScroll: true, preserveState: true });
    } 

    const handleOpenModal = (state, data) => {
        setDevice(data);
        setVisible(state);        
    }

    const handleCloseModal = (state) => {
        setDevice({});
        setVisible(state); 
    }

  return (
      <DefaultLayout     
      >
        <div className="py-12">
        <CRow>
            <CCol xs>
            <CCard className="mb-4">
                <CCardHeader>
                    <CRow>
                        <CCol md={10}>
                            <Search route={route('devices')} filter={filter} />  
                        </CCol>                        
                    </CRow>                    
                </CCardHeader>        
                <CTable align="middle" className="mb-0 border" hover responsive>
                    <CTableHead className="text-nowrap">
                    <CTableRow>  
                        <CTableHeaderCell className="bg-body-tertiary">
                            Name
                        </CTableHeaderCell> 
                        <CTableHeaderCell className="bg-body-tertiary">
                            Device
                        </CTableHeaderCell> 
                        <CTableHeaderCell className="bg-body-tertiary">
                            Owner
                        </CTableHeaderCell> 
                        <CTableHeaderCell className="bg-body-tertiary">
                            Location
                        </CTableHeaderCell>                       
                        <CTableHeaderCell className="bg-body-tertiary">
                            Action
                        </CTableHeaderCell>                   
                    </CTableRow>
                    </CTableHead>
                    <CTableBody>
                    {devices.data.map((item, index) => (
                        <CTableRow v-for="item in tableItems" key={index}>                       
                        <CTableDataCell>
                            <div>{item.name}</div>
                        </CTableDataCell>
                        <CTableDataCell>
                            <div>{item.macAddress}</div>
                        </CTableDataCell>
                        <CTableDataCell>
                            <div className='capitalize'>{item.user?.name}</div>
                        </CTableDataCell>
                        <CTableDataCell>
                            <div>{item.ysnLocation === 1 ? item.user?.location : item.location}</div>                       
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

                 { devices.last_page > 1 && (
                    <Pagination
                        currentpage={devices.current_page}
                        nextpage={devices.next_page_url}
                        prevpage={devices.prev_page_url}
                        firstpage={devices.first_page_url}
                        lastpage={devices.last_page_url}
                        totalRecord={devices.total}
                        totalPage={devices.last_page}
                        onPageChange={onPageChange}
                     />
                 )}
                   <NotificationAlert/> 
            </CCard>
            </CCol>
        </CRow>
        </div>  
         <CModal                
                        visible={visible}
                        onClose={(e) =>handleCloseModal(false)}
                        aria-labelledby="LiveDemoExampleLabel"
                      >
                        <CModalHeader>
                          <CModalTitle id="LiveDemoExampleLabel">Device</CModalTitle>
                        </CModalHeader>
                        <CModalBody>
                            <div className="row g-3"> 
                                    <CCol md={12}>
                                        <CFormInput 
                                            type="text" 
                                            id="macAddress" 
                                            label="Mac Address"
                                            value={device.macAddress}
                                            readOnly={true}                                     
                                             />
                                    </CCol>
                                    <CCol md={12}>
                                        <CFormInput 
                                            type="text" 
                                            id="ipAddress" 
                                            label="IP Address"
                                            value={device.ipAddress}
                                            readOnly={true}                           
                                         />                               
                                    </CCol>
                                    <CCol md={12}>
                                        <CFormInput 
                                            type="text" 
                                            id="latitude" 
                                            label="Latitude" 
                                            value={device.latitude}
                                            readOnly={true}                                    
                                        />                             
                                    </CCol> 
                                    <CCol md={12}>
                                        <CFormInput 
                                            type="text" 
                                            id="longitude" 
                                            label="Longitude"
                                            value={device.longitude} 
                                            readOnly={true}                                 
                                            />
                                    </CCol>  
                                    <CCol xs={12}>
                                        <CFormInput 
                                            id="location" 
                                            label="Location" 
                                            placeholder="1234 Main St" 
                                            value={device.location} 
                                            readOnly={true}  
                                             />
                                    </CCol> 
                                    <CCol xs={12}>
                                        <CFormCheck 
                                                id="flexCheckDefault" 
                                                label="Use the main address"
                                                name="override"
                                                checked={device.ysnLocation} 
                                                readOnly={true}                                      
                                            />   
                                    </CCol>                   
                              
                                    </div>                     
                                
                        </CModalBody>
                        <CModalFooter>
                          <CButton color="secondary" onClick={(e) => handleCloseModal(false)}>
                            Close
                          </CButton>                 
                        </CModalFooter>          
                    </CModal>         
     </DefaultLayout>
  )
}

export default Index
