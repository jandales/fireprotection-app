import React from 'react'
import Checkbox from '@/Components/Checkbox';
import PrimaryButton from '@/Components/PrimaryButton';
import ApplicationLogo from '@/Components/ApplicationLogo';
import InputError from '@/Components/InputError';
import { Head, Link, useForm } from '@inertiajs/react';

import {
  CButton,
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

export default function ForgotPassword({ status }) {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('password.email'));
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
                    <div className="mb-4 text-sm text-gray-600">
                        Forgot your password? No problem. Just let us know your email
                        address and we will email you a password reset link that will
                        allow you to choose a new one.
                    </div>

                    {status && (
                        <div className="mb-4 text-sm font-medium text-green-600">
                            {status}
                        </div>
                    )}                  
                    <CInputGroup className="mb-3">
                      <CInputGroupText>@</CInputGroupText>
                       <CFormInput 
                            placeholder="Email" 
                            autoComplete="email"
                            value={data.email}
                            onChange={(e) => setData('email', e.target.value)}
                        />              
                    </CInputGroup>
                    <CInputGroup className="mb-1">                      
                       <InputError message={errors.email} className="mt-2" />
                    </CInputGroup>  
                    <CRow>
                      <CCol xs={8}>                   
                         <PrimaryButton className="btn btn-primary px-4" disabled={processing}>
                         Email Password Reset Link
                          </PrimaryButton>
                      </CCol>                     
                    </CRow>
                    </CForm>                
                </CCardBody>
              </CCard>             
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}
