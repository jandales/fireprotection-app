import React, { useEffect, useState } from 'react';
import DefaultLayout from '@/Layouts/DefaultLayout';
import {  CAvatar, CRow, CCard, CFormLabel, CButton, CCol, CForm, CFormInput, CFormSelect, CCardBody } from '@coreui/react'
import { usePage, useForm} from '@inertiajs/react';
import avatar from '@/assets/images/avatars/user.png'
import { toast } from 'react-toastify';
const Profile = () => {  
      const user = usePage().props.auth.user;   
      const [provinces, setProvince] = useState([]);
      const [municipalities, setMunicipalities] = useState([]);
      const [barangays, setBarangays] = useState([]);
      const { data, setData, post } =
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
            post(route('user.update'), {
                preserveScroll: true,
                onSuccess: (res) => { 
                    toast.success('Account updated successfully!', {                          
                        autoClose: 1000,
                    });                     
                                                                    
                },
            });                  
        }; 
        
        const getProvinces = async () => {
            try {
                const response = await fetch('https://psgc.gitlab.io/api/provinces');
                if (!response.ok) {
                    throw new Error('Failed to fetch provinces');
                }
                const data = await response.json();
                setProvince(data);                
            } catch (error) {
                console.error('Error fetching provinces:', error);
            }
        };

        const getMunicipalities = async (name) => {
            try { 
                
                if (provinces.length === 0) {
                    getProvinces();                 
                }
        
                // Find the province by name
                let province = provinces.find(province => province.name === name);
          

                // if (!province) {                
                //     const res = await fetch('https://psgc.gitlab.io/api/provinces');
                //     const provincesdata = await res.json();   
                //     province = provincesdata.find(province => province.name === name);                        
                // }

                const response = await fetch(`https://psgc.gitlab.io/api/provinces/${province.code}/municipalities`);
        
                
                if (!response.ok) {
                    throw new Error('Failed to fetch municipalities');
                }
        
                const resData = await response.json();
                setMunicipalities(resData);              
               
        
            } catch (error) {
                console.error('Error fetching municipalities:', error);
            }
        };
        
        const getBarangays= async (code) => {
            try {                               
                
                const response = await fetch(`https://psgc.cloud/api/cities-municipalities/${code}/barangays`);        
           
                if (!response.ok) {
                    throw new Error('Failed to fetch barangays');
                }

                const data = await response.json();
                setBarangays(data);  
        
            } catch (error) {
                console.error('Error fetching barangays:', error);
            }
        }; 
        
        const onBaranggayClick =  async () => {
            const municipality = municipalities.find(municipality => municipality.name === data.city);
            await getBarangays(municipality.psgc10DigitCode)
        }

        const onMunicipalityClick = () => {      
            getMunicipalities(data.province);
            if(data.city != user.city) {
                setData('address2', null)
                setBarangays([])
            } 

        }

        const onProviceClick  = () => {
            if(municipalities.length === 0){
                getProvinces();
                if(data.province != user.province) {
                    setData('city', null)
                    setData('address2', null)
                    setMunicipalities([])
                    setBarangays([])
                }              
            }        
        }
        

        //  // Fetch provinces when the component mounts
        // useEffect(() => {      
        //         getProvinces();          
        //         getMunicipalities(data.province); 
        // }, [])  

        // useEffect(() => {      
        //     getMunicipalities(data.province);
        // }, [data.province]) 
       
      

  return (
      <DefaultLayout     
      >
        <div className="py-12">
        <CRow>
            <CCol xs>
            <CCard className="mb-4">          
                <CCardBody>
                <CForm className="row g-3" onSubmit={submit} encType="multipart/form-data">
                    <CCol md={12}> 
                        <CRow className="mb-3"> 
                        <CCol md={1}>
                            <CAvatar src={user.avatar ?? avatar} size="xl"  />
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
                                <CFormLabel htmlFor="province" className="col-sm-2 col-form-label">
                                    Province
                                </CFormLabel>
                                <CCol sm={10}>
                                <CFormSelect 
                                    id="province"
                                    value={data.province}
                                    onChange={(e) => setData('province', e.target.value)}
                                    onClick={(e) => onProviceClick()}
                                    >
                                    { user.province ?? <option>Choose...</option>}
                                    {provinces.length === 0 &&  <option value={data.province}>{data.province}</option> }
                                    {
                                        provinces.map((province, index) => (
                                            <option key={index} value={province.name}>{province.name}</option>
                                        ))
                                    } 
                                </CFormSelect>
                                </CCol>
                            </CRow>
                    </CCol>    

                    <CCol md={12}>
                            <CRow className="mb-3">
                                <CFormLabel htmlFor="city" className="col-sm-2 col-form-label">
                                    Municipality
                                </CFormLabel>
                                <CCol sm={10}>                              
                                   <CFormSelect 
                                    id="city"
                                    value={data.city}
                                    onChange={(e) => setData('city', e.target.value)}  
                                    onClick={() => onMunicipalityClick()}                         
                                    >
                                    { user.city ?? <option>Choose...</option>}
                                    { municipalities.length === 0 &&  <option value={data.city}>{data.city}</option> }
                                    {
                                        municipalities.map((municipality, index) => (
                                            <option key={index} value={municipality.name}>{municipality.name}</option>
                                        ))
                                    }  
                                </CFormSelect>
                                </CCol>
                            </CRow>
                    </CCol>

                    <CCol md={12}>
                        <CRow className="mb-3">
                            <CFormLabel htmlFor="address" className="col-sm-2 col-form-label">
                                Baranggay
                            </CFormLabel>
                            <CCol sm={10}>                            
                             <CFormSelect 
                                   id="address2" 
                                   value={data.address2}
                                   onChange={(e) => setData('address2', e.target.value)}  
                                   onClick={() => onBaranggayClick(data.city)}                       
                                    >
                                    { user.address2 ?? <option>Choose...</option>}
                                    { barangays.length === 0 &&  <option value={data.address2}>{data.address2}</option> }
                                    {
                                        barangays.map((barangay, index) => (
                                            <option key={index} value={barangay.name}>{barangay.name}</option>
                                        ))
                                    }  
                            </CFormSelect>
                            </CCol>
                        </CRow>
                    </CCol> 

                    <CCol md={12}>
                        <CRow className="mb-3">
                            <CFormLabel htmlFor="address1" className="col-sm-2 col-form-label">
                                Steet Name
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
                                     accept="image/*"
                                     onChange={(e) => setData('avatar', e.target.files[0])} 
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

export default Profile
