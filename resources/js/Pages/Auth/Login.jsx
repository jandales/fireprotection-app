import React from 'react'
import PrimaryButton from '@/Components/PrimaryButton';
import { useForm } from '@inertiajs/react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import {
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
  CFormCheck,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'
import {  toast } from 'react-toastify';

const Login = () => {

      const { data, setData, post, reset } = useForm({
          email: '',
          password: '',
          remember: false,
      });
  
      const submit = (e) => {
          e.preventDefault();
          post(route('login'), {
              onError: (errors) => {              
                  Object.keys(errors).forEach((field) => { 
                      toast.error(errors[field], {                          
                          autoClose: 1000,
                      });                      
                  });
              },
              onFinish: () => reset('password'),
          });
      };

  return (
    <div className="bg-body-tertiary min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={6}>
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>               
                    <CForm onSubmit={submit}>
                    <h1>Login</h1>
                    <p className="text-body-secondary">Sign In to your account</p>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormInput 
                         placeholder="Username"
                         autoComplete="username"
                         value={data.email}               
                         onChange={(e) => setData('email', e.target.value)}
                       />                      
                    </CInputGroup>                 
                    <CInputGroup className="mb-4">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput
                        type="password"
                        placeholder="Password"
                        autoComplete="current-password"
                        value={data.password}
                        onChange={(e) => setData('password', e.target.value)}
                      />
                     
                    </CInputGroup>
                   
                    <CInputGroup className="mb-4">
                      <CFormCheck 
                          id="flexCheckDefault" 
                          label="Remember me"
                          name="remember"
                          checked={data.remember}
                          onChange={(e) =>
                              setData('remember', e.target.checked)
                          }
                      />                     
                    </CInputGroup>
                    <CRow>
                      <CCol xs={6}>                   
                          <PrimaryButton className="btn btn-primary px-4">
                                       Log in
                          </PrimaryButton>
                      </CCol>
                      {/* <CCol xs={6} className="text-right">
                            {canResetPassword && (
                              <Link
                                  href={route('password.request')}
                                  className="rounded-md text-sm text-gray-600 underline hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                              >
                                  Forgot your password?
                              </Link>
                          )}
                      </CCol> */}
                    </CRow>
                    </CForm>                
                </CCardBody>
              </CCard>             
            </CCardGroup>
          </CCol>
        </CRow>
          <ToastContainer />
      </CContainer>
    </div>
  )
}

export default Login
