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

import user from  '@/assets/images/avatars/user.png';
import Pagination from '@/Components/Pagination';
import Search from '@/Components/Search';
import { toast } from 'react-toastify';

import CIcon from '@coreui/icons-react'; 
import {
    cilMagnifyingGlass,
    cilMap,
    cilList
 } from '@coreui/icons'; 



const Index = ({ devices, filter }) => {
    const [visible, setVisible] = useState(false)
    const [device, setDevice] = useState({});

    const onPageChange = (url) => {
        router.get(url, filter ? { search: filter } : {}, { preserveScroll: true, preserveState: true });
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
                        <CCol md={11}>
                            <Search route={route('devices')} filter={filter} />  
                        </CCol> 
                        <CCol md={1} className='nav-list-icon'>                          
                            <Link  className='nav-list-icon float-right' href={route('devices.maps')} >
                                    <CIcon icon={cilMap} size='lg' />
                            </Link>
                            <Link  className='nav-list-icon  mx-2 float-right' href={route('devices')} >
                                    <CIcon icon={cilList} size='lg' />
                            </Link>
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
                    {devices.data.length ? devices.data.map((item) => (
                        <CTableRow key={item.id}>
                        <CTableDataCell>
                            <div className="table-primary-value">{item.name}</div>
                        </CTableDataCell>
                        <CTableDataCell>
                            <div className="table-secondary-value">{item.macAddress}</div>
                        </CTableDataCell>
                        <CTableDataCell>
                            <div className='capitalize'>{item.user?.name}</div>
                        </CTableDataCell>
                        <CTableDataCell>
                            <div>{item.ysnLocation === 1 ? item.user?.location : item.location}</div>                       
                        </CTableDataCell> 
                        <CTableDataCell>  
                            <div className="table-actions">
                                <CButton className="table-action-button" title="View device" aria-label={`View ${item.name}`} onClick={() => handleOpenModal(true, item)}><CIcon icon={cilMagnifyingGlass} /></CButton>
                            </div> 
                        </CTableDataCell>                                 
                        </CTableRow>
                    )) : (
                      <CTableRow>
                        <CTableDataCell colSpan={5} className="table-empty-cell">No devices found.</CTableDataCell>
                      </CTableRow>
                    )}
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
                        perPage={devices.per_page}
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
                                            id="name" 
                                            label="Name"
                                            value={device.name}
                                            readOnly={true}                                     
                                             />
                                    </CCol>  
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
