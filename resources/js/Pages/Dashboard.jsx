import React from 'react'
import classNames from 'classnames'
import DefaultLayout from '@/Layouts/DefaultLayout'
import WidgetsDropdown from '@/Components/WidgetsDropdown';
import {
  CAvatar,  
  CCol,
  CProgress,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CCard,
  CCardHeader
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import {
  cibCcAmex,
  cibCcApplePay,
  cibCcMastercard,
  cibCcPaypal,
  cibCcStripe,
  cibCcVisa,
  cifBr,
  cifEs,
  cifFr,
  cifIn,
  cifPl,
  cifUs,
  cilPeople,
} from '@coreui/icons'

import avatar1 from '@/assets/images/avatars/1.jpg'
import avatar2 from '@/assets/images/avatars/2.jpg'
import avatar3 from '@/assets/images/avatars/3.jpg'
import avatar4 from '@/assets/images/avatars/4.jpg'
import avatar5 from '@/assets/images/avatars/5.jpg'
import avatar6 from '@/assets/images/avatars/6.jpg'


const Dashboard = ({activities, userCount, deviceCount, employeeCount, notifitionCount}) => {  

  return (
<DefaultLayout>
    <WidgetsDropdown 
      userCount={userCount}
      deviceCount={deviceCount}
      employeeCount={employeeCount}
      notifitionCount={notifitionCount}
      className="mb-4" 
    />
    
      <CRow>
        <CCol xs>  
             <CCard className="mb-4">
                 <CCardHeader>Activicty</CCardHeader>  
              <CTable align="middle" className="mb-0 border" hover responsive>
                <CTableHead className="text-nowrap">
                  <CTableRow>
                    <CTableHeaderCell className="bg-body-tertiary text-center">
                      <CIcon icon={cilPeople} />
                    </CTableHeaderCell>
                    <CTableHeaderCell className="bg-body-tertiary">
                      User
                    </CTableHeaderCell>
                    <CTableHeaderCell className="bg-body-tertiary">
                      Action
                    </CTableHeaderCell>                   
                    <CTableHeaderCell className="bg-body-tertiary">
                      Description
                    </CTableHeaderCell>
                    <CTableHeaderCell className="bg-body-tertiary">
                      Date
                    </CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {activities.map((item, index) => (
                    <CTableRow v-for="item in tableItems" key={index}>
                      <CTableDataCell className="text-center">
                        <CAvatar size="md" src={item.user?.avatar == null ? avatar6 : item.user?.avatar} status="success" />
                      </CTableDataCell>
                      <CTableDataCell>
                        <div>{item.user.name}</div>
                        {/* <div className="small text-body-secondary text-nowrap">
                          <span>{item.user.new ? 'New' : 'Recurring'}</span> | Registered:{' '}
                          {item.user.registered}
                        </div> */}
                      </CTableDataCell>
                      <CTableDataCell>
                        <div>{item.action}</div>
                      </CTableDataCell>
                      <CTableDataCell>
                          <div>{item.changes}</div>                      
                      </CTableDataCell>
                      <CTableDataCell>
                          <div>{item.created_at}</div>                      
                      </CTableDataCell>                    
                    </CTableRow>
                  ))}
                </CTableBody>
              </CTable>  
              </CCard>   
        </CCol>
      </CRow>
       </DefaultLayout>
  )
}

export default Dashboard
