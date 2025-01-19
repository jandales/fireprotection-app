import DefaultLayout from '@/Layouts/DefaultLayout';

import InputError from '@/Components/InputError';
import { Transition } from '@headlessui/react';
import {  CAvatar, CRow, CCard, CCardHeader, CFormLabel, CButton, CCol, CForm, CFormCheck, CFormInput, CFormSelect, CCardBody } from '@coreui/react'
import { usePage, useForm} from '@inertiajs/react';
import avatar8 from '@/assets/images/avatars/8.jpg'
const Setting = (response) => {      

      const setting = response.settings;
  
      const { data, setData, patch, errors, processing, recentlySuccessful } =
            useForm({
                perpage: setting.perpage,
                ysnHomeLocationAsDefault : setting.ysnHomeLocationAsDefault               
            });
    
            const submit = (e) => {
                e.preventDefault(); 
                patch(route('user.settings.update'));
            };  

 

  return (
      <DefaultLayout     
      >
        <div className="py-12">
        <CRow>
            <CCol xs>
            <CCard className="mb-4">          
                <CCardBody>
                <CForm className="row g-3" onSubmit={submit} enctype="multipart/form-data">
                      <CCol md={12}>
                                    {recentlySuccessful && (<div class="alert alert-success" role="alert">
                                        Successfully Saved
                                    </div>)
                                    }   
                                    </CCol> 
                            
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
        </div>
     </DefaultLayout>
  )
}

export default Setting 
