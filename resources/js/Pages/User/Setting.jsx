import DefaultLayout from '@/Layouts/DefaultLayout';

import InputError from '@/Components/InputError';
import {  CRow, CCard,  CFormLabel, CButton, CCol, CForm, CFormCheck, CFormInput,  CCardBody } from '@coreui/react'
import {  useForm} from '@inertiajs/react';
import { router } from '@inertiajs/react';
const Setting = (response) => {      

      const setting = response.settings;
  
      const { data, setData, patch, post, errors, processing, recentlySuccessful } =
            useForm({
                perpage: setting.perpage,
                ysnHomeLocationAsDefault : setting.ysnHomeLocationAsDefault,
                code : setting.code             
            });
    
            const submit = (e) => {
                e.preventDefault(); 
                patch(route('user.settings.update'));
            }; 
            
            const onGenerateCode = (e) => {
                e.preventDefault(); 
                post(route('user.settings.generate'), {
                    onSuccess: (res) => {
                        setData('code', res.props.settings.code)                       
                    }
                });
            }
 

  return (
      <DefaultLayout     
      >
        <div className="py-12">
           <CCol md={12}>
                {recentlySuccessful && (<div class="alert alert-success" role="alert">
                    Successfully Saved
                </div>)
                }   
            </CCol> 
        <CRow>
            <CCol xs>
            <CCard className="mb-4">          
                <CCardBody>
                <CForm className="row g-3" onSubmit={submit} enctype="multipart/form-data">
                    <CCol md={12}>
                        <CRow className="mb-3">
                            <CFormLabel htmlFor="Address" className="col-sm-2 col-form-label">
                             Settings
                            </CFormLabel>  
                        </CRow>
                    </CCol> 
            
                              
                    <CCol md={12}>
                            <CRow className="mb-3">
                                <CFormLabel htmlFor="perpage" className="col-sm-2 col-form-label">
                                   Pagination
                                </CFormLabel>
                                <CCol sm={10}>
                                <CFormInput 
                                    type="text" 
                                    id="perpage" 
                                    value={data.perpage} 
                                    onChange={(e) => setData('perpage', e.target.value)}
                                />
                                </CCol>
                            </CRow>
                             <InputError message={errors.perpage} className="mt-1" />   
                    </CCol> 

                    <CCol md={12}>
                            <CRow className="mb-3">
                                <CFormLabel htmlFor="ysnHomeLocationAsDefault" className="col-sm-2 col-form-label">
                                   Use home location as default Location Notification
                                </CFormLabel>
                                <CCol sm={10}>
                                <CFormCheck                                  
                                    id="ysnHomeLocationAsDefault" 
                                    checked={data.ysnHomeLocationAsDefault}
                                    onChange={(e) => setData('ysnHomeLocationAsDefault', e.target.checked)}
                                />
                                </CCol>
                            </CRow>
                            <InputError message={errors.ysnHomeLocationAsDefault} className="mt-1" />   
                    </CCol> 
                       
                    <CCol xs={12}>
                       <CButton color="primary" type="submit" disabled={processing}>Save Changes</CButton>
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
                <CForm className="row g-3" onSubmit={onGenerateCode} enctype="multipart/form-data">   
                    <CCol md={12}>
                        <CRow className="mb-3">
                            <CFormLabel htmlFor="Address" className="col-sm-2 col-form-label">
                             Device Linking Code
                            </CFormLabel>                            
                             <small>This code will be used to link the device to your account.</small>                        
                        </CRow>
                    </CCol> 
            
                              
                    <CCol md={12}>
                            <CRow className="mb-3">
                                <CFormLabel htmlFor="perpage" className="col-sm-2 col-form-label">
                                  Code
                                </CFormLabel>
                                <CCol sm={10}>
                                <CFormInput 
                                    type="text" 
                                    id="perpage" 
                                    value={data.code} 
                                    readOnly 
                                    onChange={(e) => setData('perpage', e.target.value)}
                                />
                                </CCol>
                            </CRow>
                             <InputError message={errors.perpage} className="mt-1" />   
                    </CCol> 
                 
                       
                    <CCol xs={12}>
                       <CButton color="primary" type="submit">Generate Code</CButton>
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
                <CForm className="row g-3" onSubmit={onGenerateCode} enctype="multipart/form-data">   
                    <CCol md={12}>
                        <CRow className="mb-3">
                            <CFormLabel htmlFor="Address" className="col-sm-2 col-form-label">
                             Change Password
                            </CFormLabel>      
                        </CRow>
                    </CCol> 
            
                              
                    <CCol md={12}>
                            <CRow className="mb-3">
                                <CFormLabel htmlFor="perpage" className="col-sm-2 col-form-label">
                                  New Password
                                </CFormLabel>
                                <CCol sm={10}>
                                <CFormInput 
                                    type="text" 
                                    id="perpage" 
                                    value={data.code} 
                                    readOnly 
                                    onChange={(e) => setData('perpage', e.target.value)}
                                />
                                </CCol>
                            </CRow>
                             <InputError message={errors.perpage} className="mt-1" /> 
                             <CRow className="mb-3">
                                <CFormLabel htmlFor="perpage" className="col-sm-2 col-form-label">
                                  Confirm Password
                                </CFormLabel>
                                <CCol sm={10}>
                                <CFormInput 
                                    type="text" 
                                    id="perpage" 
                                    value={data.code} 
                                    readOnly 
                                    onChange={(e) => setData('perpage', e.target.value)}
                                />
                                </CCol>
                            </CRow>
                            <CRow className="mb-3">
                                <CFormLabel htmlFor="perpage" className="col-sm-2 col-form-label">
                                  Current Password
                                </CFormLabel>
                                <CCol sm={10}>
                                <CFormInput 
                                    type="text" 
                                    id="perpage" 
                                    value={data.code} 
                                    readOnly 
                                    onChange={(e) => setData('perpage', e.target.value)}
                                />
                                </CCol>
                            </CRow>
                             <InputError message={errors.perpage} className="mt-1" />  
                             <InputError message={errors.perpage} className="mt-1" />    
                    </CCol> 
                 
                       
                    <CCol xs={12}>
                       <CButton color="primary" type="submit">Submit</CButton>
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
