import DefaultLayout from '@/Layouts/DefaultLayout';
import InputError from '@/Components/InputError';
import { router, useForm} from '@inertiajs/react';
import React, { useState } from 'react'
import Pagination from '@/Components/Pagination';


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
  CButton,
  CFormInput,
  CFormCheck,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CPagination,
  CPaginationItem
} from '@coreui/react'
import Search from '@/Components/Search';

const Device = (response, filter) => {
    const devices = response.devices
    const [search, setSearch] = useState(filter || "");
    const { data, setData, post, get, patch, delete: destroy, errors, processing, recentlySuccessful, reset } =
                useForm({
                    id : '',
                    macAddress: '',
                    ipAddress: '',
                    latitude: '',
                    longitude: '',
                    ysnLocation: false,
                    location: ''                   
                });
        
    const [visible, setVisible] = useState(false)
    const [override, setOverride] = useState(false)
    const [isEdit, setIsEdit] = useState(false)
    const [visibleDelete, setVisibleDelete] = useState(false)
    
    const onCheckChange = (state) => {
        setData('ysnLocation', state)
        setOverride('override', state)
    }

    const onOpenModal = (isEdit, device) => {
        reset();       
        setVisible(!visible); 
        setIsEdit(isEdit);
     
        if(isEdit) {
            data.id = device.id
            data.macAddress = device.macAddress
            data.ipAddress = device.ipAddress
            data.latitude = device.latitude
            data.longitude = device.longitude
            data.ysnLocation = device.ysnLocation
            data.location =  device.location
        } else {
            data.macAddress = null
            data.ipAddress = null
            data.latitude = null
            data.longitude = null
            data.ysnLocation = false
            data.location = null
        }
    }

    const submit = (e) => {
        e.preventDefault();        
        if (!isEdit) {           
            post(route('user.device.store'))
            return;
        }          
        patch(route('user.device.update'))
       
          
    };  

    const handleDelete = (device) => {
        setVisibleDelete(!visibleDelete)
        data.id = device.id  
    }
    
    const handleCloseDeleteModal = () =>{
        setVisibleDelete(false)     
        data.id = null       
    }
    const deleteDevice = () => {  
        destroy(route('user.device.destroy', {id : data.id }), {
            preserveScroll: true,
            onSuccess: () => handleCloseDeleteModal(),         
            onFinish: () => reset(),
        });
    };
   
    const onPageChange = (url) => {
        router.get(url, {}, { preserveScroll: true, preserveState: true });
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
                        <Search route={route('user.devices')} filter={filter} /> 
                        </CCol>
                        <CCol md={2}>
                            <CButton color="primary" className='mx-2 float-end' onClick={() => onOpenModal(false)}>
                                New Device
                            </CButton>
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
                            Mac Address
                        </CTableHeaderCell> 
                        <CTableHeaderCell className="bg-body-tertiary">
                            IP Address
                        </CTableHeaderCell> 
                        <CTableHeaderCell className="bg-body-tertiary">
                            Latitude
                        </CTableHeaderCell> 
                        <CTableHeaderCell className="bg-body-tertiary">
                            Longitude
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
                            <div>{item.ipAddress}</div>                       
                        </CTableDataCell> 
                        <CTableDataCell>
                            <div>{item.latitude}</div>                       
                        </CTableDataCell>
                        <CTableDataCell>
                            <div>{item.longitude}</div>                       
                        </CTableDataCell>
                        <CTableDataCell>
                            <div>{item.location}</div>                       
                        </CTableDataCell>                       
                        <CTableDataCell>
                            <div className='btn-gap'>
                            <CButton color="primary" variant="outline" size="sm" onClick={(e) => onOpenModal(true, item)}>Edit</CButton>  
                            <CButton color="danger" variant="outline" size="sm" onClick={(e) => handleDelete(item)}>Delete</CButton>   
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
            </CCard>
            </CCol>
        </CRow>
        </div>
        {/* Create and edit Modal */}
        <CModal
        //  size="sm"
        visible={visible}
        onClose={() => setVisible(false)}
        aria-labelledby="LiveDemoExampleLabel"
      >
        <form  onSubmit={submit}>
        <CModalHeader>
        <CModalTitle id="LiveDemoExampleLabel"> {isEdit == true ? 'Edit Device' : 'Add Device'}</CModalTitle>
        </CModalHeader>
        <CModalBody>
            <div className="row g-3"> 
                <CCol md={12}>
                {recentlySuccessful && (<div class="alert alert-success" role="alert">
                    Successfully Saved
                </div>)
                }   
                </CCol>                       
                    <CCol md={12}>
                        <CFormInput 
                            type="text" 
                            id="macAddress" 
                            label="Mac Address"
                            value={data.macAddress}
                            onChange={(e) => setData('macAddress', e.target.value)}      
                             />
                        <InputError message={errors.macAddress} className="mt-1" />    
                    </CCol>
                    <CCol md={12}>
                        <CFormInput 
                            type="text" 
                            id="ipAddress" 
                            label="IP Address"
                            value={data.ipAddress}
                            onChange={(e) => setData('ipAddress', e.target.value)}
                         />
                        <InputError message={errors.ipAddress} className="mt-1" />    
                    </CCol>
                    <CCol md={12}>
                        <CFormInput 
                            type="text" 
                            id="latitude" 
                            label="Latitude" 
                            value={data.latitude}
                            onChange={(e) => setData('latitude', e.target.value)}
                        />
                          <InputError message={errors.latitude} className="mt-1" />    
                    </CCol> 
                    <CCol md={12}>
                        <CFormInput 
                            type="text" 
                            id="longitude" 
                            label="Longitude"
                            value={data.longitude}
                            onChange={(e) => setData('longitude', e.target.value)} 
                            />
                            <InputError message={errors.longitude} className="mt-1" />    
                    </CCol>  
                    <CCol xs={12}>
                        <CFormInput 
                            id="location" 
                            label="Location" 
                            placeholder="1234 Main St" 
                            value={data.location}
                            onChange={(e) => setData('location', e.target.value)}                           
                         />
                        <InputError message={errors.location} className="mt-1" />    
                    </CCol> 
                    <CCol xs={12}>
                        <CFormCheck 
                                id="flexCheckDefault" 
                                label="Use the main address"
                                name="override"
                                checked={data.ysnLocation}
                                onChange={(e) =>                                   
                                    onCheckChange(e.target.checked)                                                                   
                                }
                            />   
                    </CCol>  
                    </div>                     
                
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setVisible(false)}>
            Close
          </CButton>
          <CButton color="primary" type="submit" disabled={processing} >
            Save changes 
          </CButton>
        </CModalFooter>
        </form>
        </CModal>
        
        <CModal
            visible={visibleDelete}
            onClose={handleCloseDeleteModal}
            aria-labelledby="LiveDemoExampleLabel"
        >  
            <CModalHeader>
            <CModalTitle id="delete">Delete</CModalTitle>
            </CModalHeader>
            <CModalBody>Are you sure want to delete this Device!</CModalBody>
            <CModalFooter>
            <CButton color="secondary" onClick={handleCloseDeleteModal}>
                No
            </CButton>
             <CButton color="danger" type='submit' onClick={deleteDevice}>Yes</CButton>
            </CModalFooter>
            
      </CModal>   

     </DefaultLayout>
  )
}

export default Device
