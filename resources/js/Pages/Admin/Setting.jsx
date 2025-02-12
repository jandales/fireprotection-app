import DefaultLayout from '@/Layouts/DefaultLayout';
import {  CRow, CCard,  CFormLabel, CButton, CCol, CForm, CFormCheck, CFormInput,  CCardBody } from '@coreui/react'
import {  useForm} from '@inertiajs/react';
import { toast } from 'react-toastify';
const Setting = (response) => {      

      const setting = response.settings;
  
      const { data, setData, patch } =

            useForm({
                email : setting.email,
                phonenumber : setting.phonenumber,
                mobilenumber : setting.mobilenumber,
                latitude : setting.latitude,
                longitude : setting.longitude,
                location : setting.location,    
                oldpassword : '',
                newpassword : '',
                newpassword_confirmation : ''           
            });
               
            
            const onSaveContact = (e) => {
                e.preventDefault(); 
                patch(route('settings.update.contact'), {
                    preserveScroll: true,
                    onSuccess: (res) => {
                        toast.success('Contact saved successfully!', {                          
                            autoClose: 1000,
                        });                
                    }
                });
            }

            const onSaveLocation = (e) => {
                e.preventDefault(); 
                patch(route('settings.update.location'), {
                    preserveScroll: true,
                    onSuccess: (res) => {
                        toast.success('Location saved successfully!', {                          
                            autoClose: 1000,
                        });                
                    }
                });
            }

            const onChangePassword = (e) => {
                e.preventDefault();           
                patch(route('settings.update.password'), {
                    preserveScroll: true,
                    onSuccess: (res) => {                    
                        setData('oldpassword', '') 
                        setData('newpassword', '') 
                        setData('newpassword_confirmation', '')                     
                        toast.success('Password updated successfully!', {                          
                            autoClose: 1000,
                        });                     
                                                                      
                    },
                    onError: (res) => {                        
                        Object.keys(res).forEach((field) => {                       
                            toast.error(res[field], {                          
                                autoClose: 1000,
                            });                                              
                        });
                        setData('oldpassword', '') 
                        setData('newpassword', '') 
                        setData('newpassword_confirmation', '')     
                    }
                });
            }
 

  return (
      <DefaultLayout     
      >
      <div className="py-12">  
        <CRow>
            <CCol xs>
            <CCard className="mb-4">          
                <CCardBody>
                <CForm className="row g-3" onSubmit={onSaveContact} enctype="multipart/form-data">   
                    <CCol md={12}>
                        <CRow className="mb-3">
                            <CFormLabel htmlFor="Address" className="col-sm-2 col-form-label">
                             Contact
                            </CFormLabel>         
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
                                <CFormLabel htmlFor="phonenumber" className="col-sm-2 col-form-label">
                                  Phone Number
                                </CFormLabel>
                                <CCol sm={10}>
                                <CFormInput 
                                    type="text" 
                                    id="phonenumbere" 
                                    value={data.phonenumber}                                 
                                    onChange={(e) => setData('phonenumber', e.target.value)}
                                />
                                </CCol>
                            </CRow>                             
                    </CCol> 

                    <CCol md={12}>
                            <CRow className="mb-3">
                                <CFormLabel htmlFor="mobilenumber" className="col-sm-2 col-form-label">
                                  Mobile Number
                                </CFormLabel>
                                <CCol sm={10}>
                                <CFormInput 
                                    type="text" 
                                    id="mobilenumber" 
                                    value={data.mobilenumber}                                
                                    onChange={(e) => setData('mobilenumber', e.target.value)}
                                />
                                </CCol>
                            </CRow>                             
                    </CCol> 
                 
                       
                    <CCol xs={12}>
                       <CButton color="primary" type="submit">Save Changes</CButton>
                    </CCol>
                </CForm>
                </CCardBody>
            </CCard>            
            </CCol>          
        </CRow> 
        <CRow>
            <CCol xs>
            <CCard className="mb-4">          
                <CCardBody>
                <CForm className="row g-3" onSubmit={onSaveLocation} enctype="multipart/form-data">   
                    <CCol md={12}>
                        <CRow className="mb-3">
                            <CFormLabel htmlFor="Address" className="col-sm-2 col-form-label">
                             Location
                            </CFormLabel>         
                        </CRow>
                    </CCol> 
            
                              
                    <CCol md={12}>
                            <CRow className="mb-3">
                                <CFormLabel htmlFor="latitude" className="col-sm-2 col-form-label">
                                  Latitude
                                </CFormLabel>
                                <CCol sm={10}>
                                <CFormInput 
                                    type="text" 
                                    id="latitude" 
                                    value={data.latitude}                            
                                    onChange={(e) => setData('latitude', e.target.value)}
                                />
                                </CCol>
                            </CRow>                             
                    </CCol> 

                    <CCol md={12}>
                            <CRow className="mb-3">
                                <CFormLabel htmlFor="longitude" className="col-sm-2 col-form-label">
                                  Longitude
                                </CFormLabel>
                                <CCol sm={10}>
                                <CFormInput 
                                    type="text" 
                                    id="longitude" 
                                    value={data.longitude}                                 
                                    onChange={(e) => setData('longitude', e.target.value)}
                                />
                                </CCol>
                            </CRow>                             
                    </CCol> 

                    <CCol md={12}>
                            <CRow className="mb-3">
                                <CFormLabel htmlFor="location" className="col-sm-2 col-form-label">
                                  Location
                                </CFormLabel>
                                <CCol sm={10}>
                                <CFormInput 
                                    type="text" 
                                    id="location" 
                                    value={data.location}                                
                                    onChange={(e) => setData('location', e.target.value)}
                                />
                                </CCol>
                            </CRow>                             
                    </CCol> 
                 
                       
                    <CCol xs={12}>
                       <CButton color="primary" type="submit">Save Changes</CButton>
                    </CCol>
                </CForm>
                </CCardBody>
            </CCard>            
            </CCol>          
        </CRow>
        <CRow>
            <CCol xs>
            <CCard className="mb-4">          
                <CCardBody>
                <CForm className="row g-3" onSubmit={onChangePassword} enctype="multipart/form-data">   
                    <CCol md={12}>
                        <CRow className="mb-3">
                            <CFormLabel htmlFor="Address" className="col-sm-2 col-form-label">
                             Change Password
                            </CFormLabel>      
                        </CRow>
                    </CCol> 
            
                              
                    <CCol md={12}>
                            <CRow className="mb-3">
                                <CFormLabel htmlFor="newpassword" className="col-sm-2 col-form-label">
                                  New Password
                                </CFormLabel>
                                <CCol sm={10}>
                                <CFormInput 
                                    type="password" 
                                    value={data.newpassword}                                                            
                                    onChange={(e) => setData('newpassword', e.target.value)}
                                />
                                </CCol>
                            </CRow>                             
                             <CRow className="mb-3">
                                <CFormLabel htmlFor="newpassword_confirmation" className="col-sm-2 col-form-label">
                                  Confirm Password
                                </CFormLabel>
                                <CCol sm={10}>
                                <CFormInput 
                                    type="password"
                                    value={data.newpassword_confirmation}    
                                    onChange={(e) => setData('newpassword_confirmation', e.target.value)}
                                />
                                </CCol>
                            </CRow>
                            <CRow className="mb-3">
                                <CFormLabel htmlFor="oldpassword" className="col-sm-2 col-form-label">
                                  Current Password
                                </CFormLabel>
                                <CCol sm={10}>
                                <CFormInput 
                                    type="password"  
                                    value={data.oldpassword} 
                                    onChange={(e) => setData('oldpassword', e.target.value)}
                                />
                                </CCol>
                            </CRow>                             
                    </CCol>                        
                    <CCol xs={12}>
                       <CButton color="primary" type="submit">Save Changes</CButton>
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

export default Setting 
