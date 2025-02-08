import React from 'react'

import {
  CRow,
  CCol,
  CCard,
  CCardBody,
  CCardHeader
} from '@coreui/react'

import CIcon from '@coreui/icons-react'
import {
  cilPeople,
  cilWarning,
  cilGroup,
  cilDevices
} from '@coreui/icons'


const WidgetsDropdown = ({userCount, deviceCount, employeeCount, notifitionCount}) => {



  return (
    <CRow>
       <CCol md={3}>
         <CCard className="mb-4">           
           <CCardBody>
              <CRow>
                 <CCol md={2} className='container-center-items'>
                  <CIcon icon={cilPeople} size="3xl" />
                  </CCol>
                  <CCol>
                    <div>User</div>
                    <div className='count'>{userCount}</div>
                  </CCol>  
              </CRow>
           </CCardBody>
         </CCard>
       </CCol>

       <CCol md={3}>
          <CCard className="mb-4">         
           <CCardBody>
           <CRow>
                  <CCol md={2} className='container-center-items'>
                  <CIcon icon={cilDevices} size="3xl" />
                  </CCol>
                  <CCol>
                  <div>Devices</div>
                  <div className='count'>{deviceCount}</div>
                  </CCol>  
              </CRow>
           </CCardBody>
         </CCard>
       </CCol>

       <CCol md={3}>
          <CCard className="mb-4">           
            <CCardBody>
             <CRow>
                  <CCol md={2} className='container-center-items'>
                  <CIcon icon={cilWarning} size="3xl" />
                  </CCol>
                  <CCol>
                  <div>Active Fire</div>
                  <div className='count'>{notifitionCount}</div>
                  </CCol>  
              </CRow>
            </CCardBody>
         </CCard>
       </CCol>

       <CCol md={3}>
          <CCard className="mb-4">         
           <CCardBody>
           <CRow>
           <CCol md={2} className='container-center-items'>
                  <CIcon icon={cilGroup} size="3xl" />
                  </CCol>
                  <CCol>
                  <div>Employee</div>
                  <div className='count'>{employeeCount}</div>
                  </CCol>  
              </CRow>
           </CCardBody>
         </CCard>
       </CCol>

    </CRow>
  )
}



export default WidgetsDropdown
