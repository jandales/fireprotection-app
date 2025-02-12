import DefaultLayout from '@/Layouts/DefaultLayout';
import InputError from '@/Components/InputError';
import {  CAvatar, CRow, CCard, CFormLabel, CButton, CCol, CForm, CFormInput, CFormSelect, CCardBody } from '@coreui/react'
import { usePage, useForm} from '@inertiajs/react';
import avatar8 from '@/assets/images/avatars/8.jpg'
import { toast } from 'react-toastify';
const Profile = () => {  
      const user = usePage().props.auth.user;   
      const { data, setData, patch, errors, processing, recentlySuccessful } =
            useForm({
                name: user.name,
                email: user.email,
                avatar: user.avatar,
                phonenumber: user.phonenumber,
                address1: user.address1,
                address2: user.address2,
                city: user.city,
                province: user.province,
                zipcode : user.zipcode,
            });   
    
        const submit = (e) => {
            e.preventDefault();          
            patch(route('user.update'), {
                preserveScroll: true,
                onSuccess: (res) => { 
                    toast.success('Account updated successfully!', {                          
                        autoClose: 1000,
                    });                     
                                                                    
                },
            });
                  
        };  

  return (
      <DefaultLayout     
      >
        <div className="py-12">
        <CRow>
            <CCol xs>
            <CCard className="mb-4">          
                <CCardBody>
                <CForm className="row g-3" onSubmit={submit}>
                    <CCol md={12}> 
                        <CRow className="mb-3"> 
                        <CCol md={1}>
                            <CAvatar src={user.avatar ?? avatar8} size="xl"  />
                        </CCol>
                        <CCol md={11}>
                            <label className='avatar-name'>{user.name}</label>                            
                            <span className='avater-email'>{user.email}</span>
                        </CCol>
                        </CRow>
                    </CCol>
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
                                readOnly
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
                            <CFormLabel htmlFor="Address" className="col-sm-2 col-form-label">
                             Address
                            </CFormLabel>  
                        </CRow>
                    </CCol> 

                    <CCol md={12}>
                        <CRow className="mb-3">
                            <CFormLabel htmlFor="address1" className="col-sm-2 col-form-label">
                                Address 1
                            </CFormLabel>
                            <CCol sm={10}>
                            <CFormInput 
                                type="text" 
                                id="address1" 
                                value={data.address1}
                                onChange={(e) => setData('address1', e.target.value)}
                                 />
                            </CCol>
                        </CRow>
                    </CCol>
                    <CCol md={12}>
                        <CRow className="mb-3">
                            <CFormLabel htmlFor="address" className="col-sm-2 col-form-label">
                                Address 2
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
                                <CFormLabel htmlFor="city" className="col-sm-2 col-form-label">
                                    City
                                </CFormLabel>
                                <CCol sm={10}>
                                <CFormInput 
                                    type="text" 
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
                                <CFormSelect 
                                    id="province"
                                    value={data.province}
                                    onChange={(e) => setData('province', e.target.value)}
                                    >
                                    { user.province ?? <option>Choose...</option>}
                                    <option value='Northern Samar'>Samar</option>
                                    <option value='Northern Samar'>Northern Samar</option>
                                    <option value='Northern Samar'>Eastern Samar</option>
                                </CFormSelect>
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
                                    type="text" 
                                    id="zipcode" 
                                    value={data.zipcode} 
                                    onChange={(e) => setData('zipcode', e.target.value)}
                                />
                                </CCol>
                            </CRow>
                    </CCol> 
                    <CCol xs={12}>
                        <CRow className="mb-3">
                                <CFormLabel htmlFor="zipcode" className="col-sm-2 col-form-label">
                                Avatar
                                </CFormLabel>
                                <CCol sm={10}>
                                <CFormInput 
                                    type="file"
                                     id="avatar" 
                                     onChange={(e) => setData('avatar', e.target.files[0])} 
                                     />                              
                                </CCol>
                        </CRow>   
                        <InputError message={errors.avatar} className="mt-1" />                     
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

export default Profile
