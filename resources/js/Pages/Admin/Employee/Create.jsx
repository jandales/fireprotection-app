import React, { useState } from 'react';
import DefaultLayout from '@/Layouts/DefaultLayout';
import {  CRow, CCard, CCardHeader, CFormLabel, CButton, CCol, CForm, CFormInput, CFormSelect, CCardBody } from '@coreui/react'
import {  useForm } from '@inertiajs/react';
import {  toast } from 'react-toastify';

const Create = () => {   

    const { data, setData, post  } =
        useForm({
            name: null,
            email: null,
            role: null,
            phonenumber: null,
            address1: null,          
            address2: null,
            city: null,                
            province: null,       
            zipcode : null,
        });   
    
        const submit = (e) => {
            e.preventDefault(); 

            post(route('employees.store'), {
                preserveScroll: true,
                onSuccess: () => {                        
                    toast.success("Successfully Created", {
                        autoClose: 1000,
                    });
                },
                onError: (errors) => {              
                    Object.keys(errors).forEach((field) => { 
                        toast.error(errors[field], {                          
                            autoClose: 1000,
                        });                      
                    });
                }
            });
            
        };  


    
    

  return (
      <DefaultLayout     
      >
        <div className="py-12">
        <CRow>
            <CCol xs>
            <CCard className="mb-4"> 
                <CCardHeader>
                    Create Employee
                </CCardHeader>      
                <CCardBody>
                <CForm className="row g-3" onSubmit={submit}>                   
                    <CCol md={12}>
                        <CRow className="mb-3">
                            <CFormLabel htmlFor="name" className="col-sm-2 col-form-label">
                                Name
                            </CFormLabel>
                            <CCol sm={10}>
                                <CFormInput 
                                    type="text" 
                                    id="name" 
                                    value={data.name}
                                    onChange={(e) => setData('name', e.target.value)}
                                     />
                            </CCol>
                        </CRow>
                        
                    </CCol>
                    <CCol md={12}>
                        <CRow className="mb-3">
                            <CFormLabel htmlFor="email" className="col-sm-2 col-form-label">
                                Email
                            </CFormLabel>
                            <CCol sm={10}>
                            <CFormInput 
                                type="email" 
                                id="email" 
                                value={data.email}
                                onChange={(e) => setData('email', e.target.value)}                              
                                 />
                            </CCol>
                        </CRow>
                    </CCol> 

                    <CCol md={12}>
                        <CRow className="mb-3">
                            <CFormLabel htmlFor="contactnumber" className="col-sm-2 col-form-label">
                            Contact Number
                            </CFormLabel>
                            <CCol sm={10}>
                            <CFormInput 
                                type="text" 
                                id="contactnumber" 
                                value={data.phonenumber}
                                onChange={(e) => setData('phonenumber', e.target.value)} 
                                />
                            </CCol>
                        </CRow>
                    </CCol> 

                         <CCol md={12}>
                            <CRow className="mb-3">
                                <CFormLabel htmlFor="role" className="col-sm-2 col-form-label">
                                    Role
                                </CFormLabel>
                                <CCol sm={10}>
                                <CFormSelect 
                                    id="role"
                                    value={data.role}
                                    onChange={(e) => setData('role', e.target.value)}
                                    >
                                    <option>Choose...</option>
                                    <option value='administrator'>Administrator</option>
                                    <option value='dispatcher'>Dispatcher</option>                                   
                                </CFormSelect>
                                </CCol>
                            </CRow>
                    </CCol> 


                    <CCol md={12}>
                        <CRow className="mb-3">
                            <CFormLabel htmlFor="Address" className="col-sm-2 col-form-label">
                             Address
                            </CFormLabel>  
                        </CRow>
                    </CCol>                     

                    <CCol md={12}>
                        <CRow className="mb-3">
                            <CFormLabel htmlFor="address" className="col-sm-2 col-form-label">
                                Street
                            </CFormLabel>
                            <CCol sm={10}>
                            <CFormInput 
                                type="text" 
                                id="address2" 
                                value={data.address2}
                                onChange={(e) => setData('address2', e.target.value)}
                                 />
                            </CCol>
                        </CRow>
                    </CCol> 

                    <CCol md={12}>
                        <CRow className="mb-3">
                            <CFormLabel htmlFor="address1" className="col-sm-2 col-form-label">
                                Barrangay
                            </CFormLabel>
                            <CCol sm={10}>
                            <CFormInput
                                    id="address1"
                                    value={data.address1}
                                    onChange={(e) => setData('address1', e.target.value)}                                
                                />                                  
                       
                            </CCol>
                        </CRow>
                    </CCol>


                    <CCol md={12}>
                            <CRow className="mb-3">
                                <CFormLabel htmlFor="city" className="col-sm-2 col-form-label">
                                    Municipality
                                </CFormLabel>
                                <CCol sm={10}>
                                <CFormInput
                                    id="city"
                                    value={data.city}
                                    onChange={(e) => setData('city', e.target.value)}
                                />
                                </CCol>
                            </CRow>
                    </CCol> 
                    
               
                    <CCol md={12}>
                            <CRow className="mb-3">
                                <CFormLabel htmlFor="province" className="col-sm-2 col-form-label">
                                    Province
                                </CFormLabel>
                                <CCol sm={10}>
                                <CFormInput
                                    id="province"
                                    value={data.province}
                                    onChange={(e) => setData('province', e.target.value)}                                 
                                />
                                </CCol>
                            </CRow>
                    </CCol> 

                                 
                    <CCol md={12}>
                            <CRow className="mb-3">
                                <CFormLabel htmlFor="zipcode" className="col-sm-2 col-form-label">
                                   Zip Code
                                </CFormLabel>
                                <CCol sm={10}>
                                <CFormInput 
                                    type="number" 
                                    id="zipcode" 
                                    value={data.zipcode} 
                                    onChange={ (e) => setData('zipcode', e.target.value) }
                                />
                                </CCol>
                            </CRow>
                    </CCol>                         
                    <CCol xs={12}>
                       <CButton color="primary" type="submit" >Save</CButton>
                    </CCol>                    
                </CForm>
                </CCardBody>
            </CCard>            
            </CCol>          
        </CRow>
        </div>
     </DefaultLayout>
  )
}

export default Create
