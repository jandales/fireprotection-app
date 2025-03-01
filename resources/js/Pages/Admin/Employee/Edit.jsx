import DefaultLayout from '@/Layouts/DefaultLayout';
import React, {  useState } from 'react';
import {  CRow, CCard, CCardHeader, CFormLabel, CButton, CCol, CForm, CFormInput, CFormSelect, CCardBody, CFormCheck } from '@coreui/react'
import {  useForm } from '@inertiajs/react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Edit = ({user}) => {    

    const [provinces, setProvince] = useState([]);
    const [municipalities, setMunicipalities] = useState([]);
    const [barangays, setBarangays] = useState([]); 

      const { data, setData, patch, errors, processing, recentlySuccessful } =
            useForm({
                id:user.id,
                name: user.name,
                email: user.email,
                role: user.role,
                phonenumber: user.phonenumber,
                address1: user.address1,
                address2: user.address2,
                city: user.city,
                province: user.province,
                zipcode : user.zipcode,
                status : user.status
            });   
    
            const submit = (e) => {
                e.preventDefault();
              
                patch(route('employees.update'), {
                  preserveScroll: true,
                  onSuccess: () => {                        
                    toast.success("Successfully Updated", {
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

            if(!name) return;

            if (provinces.length === 0) {
                getProvinces();             
            }    
            // Find the province by name
            let province = provinces.find(province => province.name === name); 
           
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
   
    const onProviceClick  = () => {
        if(municipalities.length === 0){
            getProvinces();
        }        
    }

    const onProviceChange = (e) => {
       setData('province', e)
    }

    const onMunicipalityClick = () => {      
        getMunicipalities(data.province);
    }  

    const onBarangaysClick =  async ()  => {
        const municipality = municipalities.find(municipality => municipality.name === data.city);
        await getBarangays(municipality.psgc10DigitCode)
    }

  return (
      <DefaultLayout     
      >
        <div className="py-12">
        <CRow>
            <CCol xs>
            <CCard className="mb-4"> 
                <CCardHeader>
                   Edit Employee
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
                                <CFormLabel htmlFor="role" className="col-sm-2 col-form-label">
                                    Role
                                </CFormLabel>
                                <CCol sm={10}>
                                <CFormSelect 
                                    id="role"
                                    value={data.role}
                                    onChange={(e) => setData('role', e.target.value)}
                                    >
                                    {data.role ?? <option>Choose...</option>} 
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
                                                    id="address1" 
                                                    value={data.address1}
                                                    onChange={(e) => setData('address1', e.target.value)}
                                                     />
                                                </CCol>
                                            </CRow>
                                        </CCol> 

                                        <CCol md={12}>
                                            <CRow className="mb-3">
                                                <CFormLabel htmlFor="address2" className="col-sm-2 col-form-label">
                                                    Barrangay
                                                </CFormLabel>
                                                <CCol sm={10}>
                                                <CFormInput
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
                                                        Municipality
                                                    </CFormLabel>
                                                    <CCol sm={10}>
                                                    <CFormInput  
                                                        id="city"
                                                        value={data.city}
                                                        onChange={(e) => setData('city', e.target.value)}
                                                        onClick={(e) => onMunicipalityClick()}
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
                                                        onChange={(e) => onProviceChange(e.target.value)}
                                                        onClick={(e) => onProviceClick()}
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
                                        <CRow className="mb-3">
                                                    <CFormLabel htmlFor="zipcode" className="col-sm-2 col-form-label">
                                                      Active
                                                    </CFormLabel>
                                                    <CCol sm={10}>
                                                    <CFormCheck 
                                                        id="flexCheckDefault"                                                    
                                                        name="status"                                                     
                                                        value={data.status} 
                                                        onChange={ (e) => setData('status', e.target.value) }                                                                                                                                       
                                                    />   
                                                    </CCol>
                                        </CRow>

                                       
                                    </CCol>          
                                      
                    <CCol xs={12}>
                       <CButton color="primary" type="submit">Save</CButton>
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

export default Edit
