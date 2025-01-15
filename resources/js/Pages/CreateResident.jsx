import DefaultLayout from '@/Layouts/DefaultLayout';
import {  CRow, CCard, CCardHeader, CButton, CCol, CForm, CFormCheck, CFormInput, CFormSelect, CCardBody } from '@coreui/react'



const CreateResident = () => {     
  return (
      <DefaultLayout     
      >
        <div className="py-12">
        <CRow>
            <CCol xs>
            <CCard className="mb-4">
                <CCardHeader> Create New Resident </CCardHeader> 
                <CCardBody>
                <CForm className="row g-3">
                    <CCol md={12}>
                      <CFormInput type="email" id="inputEmail4" label="First Name" />
                    </CCol>
                    <CCol md={12}>
                      <CFormInput type="email" id="inputEmail4" label="Last Name" />
                    </CCol>
                    <CCol md={12}>
                      <CFormInput type="email" id="inputEmail4" label="Email" />
                    </CCol> 
                    <CCol md={12}>
                      <CFormInput type="email" id="inputEmail4" label="Contact Number" />
                    </CCol>                         
                    <CCol xs={12}>
                      <CFormInput id="inputAddress" label="Address" placeholder="1234 Main St" />
                    </CCol>
                    <CCol xs={12}>
                      <CFormInput
                        id="inputAddress2"
                        label="Address 2"
                        placeholder="Apartment, studio, or floor"
                      />
                    </CCol>
                    <CCol md={6}>
                      <CFormInput id="inputCity" label="City" />
                    </CCol>
                    <CCol md={4}>
                      <CFormSelect id="inputState" label="Province">
                        <option>Choose...</option>
                        <option>...</option>
                      </CFormSelect>
                    </CCol>
                    <CCol md={2}>
                      <CFormInput id="inputZip" label="Zip" />
                    </CCol>                  
                    <CCol xs={12}>
                      <CButton color="primary" type="submit">
                        Submit
                      </CButton>
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

export default CreateResident
