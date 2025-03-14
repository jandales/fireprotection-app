import React from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'
import {  ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PrimaryButton from '@/Components/PrimaryButton';
import { Head, Link, useForm } from '@inertiajs/react';
import {  toast } from 'react-toastify';

const Register = () => {
     const { data, setData, post, processing, errors, reset } = useForm({
            name: '',
            email: '',
            password: '',
            password_confirmation: '',
        });
    
        const submit = (e) => {
            e.preventDefault();
    
            post(route('register'), {
                onError: (errors) => {              
                    Object.keys(errors).forEach((field) => { 
                        toast.error(errors[field], {                          
                            autoClose: 1000,
                        });                      
                    });
                },
                onFinish: () => reset('password', 'password_confirmation'),
            });
        };
  return (
    <div className="bg-body-tertiary min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={9} lg={7} xl={5}>
            <CCard className="mx-4">
              <CCardBody className="p-4">
                <CForm onSubmit={submit}>
                  <h1>Register</h1>
                  <p className="text-body-secondary">Create your account</p>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilUser} />
                    </CInputGroupText>
                    <CFormInput 
                        placeholder="Name" 
                        autoComplete="name" 
                        value={data.name}
                        onChange={(e) => setData('name', e.target.value)}                       
                    />
                  </CInputGroup>
                   
                  <CInputGroup className="mb-3">
                    <CInputGroupText>@</CInputGroupText>
                    <CFormInput 
                        placeholder="Email" 
                        autoComplete="email"
                        value={data.email}
                        onChange={(e) => setData('email', e.target.value)}
                     />
                  </CInputGroup>
                
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilLockLocked} />
                    </CInputGroupText>
                    <CFormInput
                      type="password"
                      placeholder="Password"
                      autoComplete="new-password"
                      value={data.password}
                      onChange={(e) => setData('password', e.target.value)}
                    />
                  </CInputGroup>
                 
                  <CInputGroup className="mb-4">
                    <CInputGroupText>
                      <CIcon icon={cilLockLocked} />
                    </CInputGroupText>
                    <CFormInput
                      type="password"
                      placeholder="Repeat password"
                      autoComplete="new-password"
                      value={data.password_confirmation}
                      onChange={(e) =>
                        setData('password_confirmation', e.target.value)
                    }
                    />
                  </CInputGroup>
                  
                  <div className="d-grid mb-2">
                      <PrimaryButton className="btn btn-primary px-4" disabled={processing}>
                                Register
                      </PrimaryButton>
                  </div>
                   <CCol xs={12} className="text-center"> 
                      <p>Already have an account?                        
                            <Link
                                href={route('login')}
                                className="rounded-md text-sm text-gray-600 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 login-register-link"
                            >
                                Login
                            </Link>     
                      </p>                 
                    </CCol> 
                </CForm>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
               <ToastContainer />
      </CContainer>
    </div>
  )
}

export default Register
