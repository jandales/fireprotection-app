import DefaultLayout from '@/Layouts/DefaultLayout';
import {  CRow, CCard,  CFormLabel, CButton, CCol, CForm, CFormCheck, CFormInput,  CCardBody } from '@coreui/react'
import {  useForm} from '@inertiajs/react';
import { toast } from 'react-toastify';
const Setting = (response) => {      

      const setting = response.settings;
  
      const { data, setData, patch, post, put, errors, processing, recentlySuccessful } =
            useForm({
                perpage: setting.perpage,
                ysnHomeLocationAsDefault : setting.ysnHomeLocationAsDefault,
                code : setting.code,
                oldpassword : '',
                newpassword : '',
                newpassword_confirmation : ''           
            });
    
            const onSettingSubmit = (e) => {
                e.preventDefault(); 
                patch(route('user.settings.update'),{
                    preserveScroll: true,
                    onSuccess: (res) => { 
                        toast.success('Setting updated successfully!', {                          
                            autoClose: 1000,
                        });                                           
                    },                    
                });
            }; 
            
            const onGenerateCode = (e) => {
                e.preventDefault(); 
                post(route('user.settings.generate'), {
                    preserveScroll: true,
                    onSuccess: (res) => {
                        toast.success('Code generated successfully!', {                          
                            autoClose: 1000,
                        });   
                        setData('code', res.props.settings.code)                       
                    }
                });
            }

            const onChangePassword = (e) => {
                e.preventDefault();           
                put(route('user.settings.changePassword'), {
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
                <CForm className="row g-3" onSubmit={onSettingSubmit} enctype="multipart/form-data">
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
