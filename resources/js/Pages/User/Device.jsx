import DefaultLayout from '@/Layouts/DefaultLayout';
import InputError from '@/Components/InputError';
import { Transition } from '@headlessui/react';

import { Link} from '@inertiajs/react';
import { useForm } from '@inertiajs/react';
import React, { useState } from 'react'

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
  CForm,
  CFormInput,
  CFormCheck,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle
} from '@coreui/react'

const Device = (response) => {
    const devices = response.devices   
    const { data, setData, post, patch, errors, processing, recentlySuccessful, reset } =
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
    
    const onCheckChange = (state) => {
        setData('ysnLocation', state)
        setOverride('override', state)
    }

    const onOpenModal = (state, isEdit, device) => {
        reset();       
        setVisible(state); 
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
   
    
  return (
      <DefaultLayout     
      >
        <div className="py-12">
        <CRow>
            <CCol xs>
            <CCard className="mb-4">
                <CCardHeader>
                    Devices 
                    <CButton color="primary" className='mx-2' onClick={() => onOpenModal(!visible, false)}>
                       Add new Device
                    </CButton>
                    </CCardHeader>        
                <CTable align="middle" className="mb-0 border" hover responsive>
                    <CTableHead className="text-nowrap">
                    <CTableRow>                                        
                        <CTableHeaderCell className="bg-body-tertiary">
                            Device
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
                    {devices.map((item, index) => (
                        <CTableRow v-for="item in tableItems" key={index}>                        
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
                            <CButton color="primary" variant="outline" size="sm" onClick={(e) => onOpenModal(!visible, true, item)}>Edit</CButton>  
                            <CButton color="danger" variant="outline" size="sm">Delete</CButton>   
                            </div>                  
                        </CTableDataCell>                                 
                        </CTableRow>
                    ))}
                    </CTableBody>
                </CTable>       
            </CCard>
            </CCol>
        </CRow>
        </div>
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
                    </CCol>
                    <CCol md={12}>
                        <CFormInput 
                            type="text" 
                            id="latitude" 
                            label="Latitude" 
                            value={data.latitude}
                            onChange={(e) => setData('latitude', e.target.value)}
                        />
                    </CCol> 
                    <CCol md={12}>
                        <CFormInput 
                            type="text" 
                            id="longitude" 
                            label="Longitude"
                            value={data.longitude}
                            onChange={(e) => setData('longitude', e.target.value)} 
                            />
                    </CCol>  
                    <CCol xs={12}>
                        <CFormCheck 
                                id="flexCheckDefault" 
                                label="Override Location"
                                name="override"
                                checked={data.ysnLocation}
                                onChange={(e) =>                                   
                                    onCheckChange(e.target.checked)                                                                   
                                }
                            />   
                    </CCol>                    
                    <CCol xs={12}>
                        <CFormInput id="location" label="Location" placeholder="1234 Main St" readOnly={!data.ysnLocation} />
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
     </DefaultLayout>
  )
}

export default Device
