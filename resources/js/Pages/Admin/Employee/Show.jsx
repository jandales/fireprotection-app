import DefaultLayout from '@/Layouts/DefaultLayout';

import {
    CImage,
    CRow,
    CCard,
    CCardHeader,
    CButton,
    CCol,
    CForm,
    CCardBody,        
    CTable,
    CTableBody,
    CTableDataCell,
    CTableHead,
    CTableHeaderCell,
    CTableRow,      
    CModal,
    CModalBody,
    CModalFooter,
    CModalHeader,
    CModalTitle, 
    CFormInput,
    CFormCheck  
}  from '@coreui/react'


import avatar8 from '@/assets/images/avatars/8.jpg'
import CIcon from '@coreui/icons-react'
import {  cilPeople, cilPhone, cilContact, cilLocationPin } from '@coreui/icons'

import React, { useState } from 'react'

const Show = (res) => {  
      const user = res.user
      const activities = res.activities 

  return (
      <DefaultLayout     
      >
        <div className="py-12">
            <CRow>
                <CCol xs>
                <CCard className="mb-4">          
                    <CCardBody>                 
                        <CCol md={12}> 
                            <CRow>  
                                <CCol md={2}> 
                                    <CImage rounded src={avatar8} width={200} height={200} /> 
                                </CCol>   
                                <CCol md={10}>
                                    <CRow className="mb-5 mx-2 my-3"> 
                                        <CCol md={4}>
                                        <div className='user-profile-wrapper'>                                          
                                                <CIcon icon={cilPeople} className='mx-2'/>                                           
                                                <div>
                                                    <label htmlFor="">Name</label>
                                                    <span>{user.name}</span>
                                                </div>
                                        </div>
                                        </CCol>
                                        <CCol md={4}>
                                            <div className='user-profile-wrapper'>                                          
                                                <CIcon icon={cilContact} className='mx-2' />                                         
                                                <div>
                                                    <label htmlFor="">Email Address</label>
                                                    <span>{user.email}</span>
                                                </div>
                                        </div>
                                        </CCol>
                                        <CCol md={4}>
                                            <div className='user-profile-wrapper'>                                          
                                                <CIcon icon={cilPhone} className='mx-2'/>                                           
                                                <div>
                                                    <label htmlFor="">Contact Number</label>
                                                    <span>{user.phonenumber}</span>
                                                </div>
                                            </div>
                                        </CCol>
                                    </CRow>
                                    <CRow className="mb-3 mx-2 my-3"> 
                                        <CCol md={4}>
                                        <div className='user-profile-wrapper'>                                          
                                                <CIcon icon={cilLocationPin} className='mx-2'/>                                           
                                                <div>
                                                    <label htmlFor="">Address</label>
                                                    <span>{user.location}</span>
                                                </div>
                                        </div>
                                        </CCol>  
                                    </CRow>
                                </CCol>                  
                            </CRow>
                            
                        </CCol>   
                    </CCardBody>
                </CCard>            
                </CCol>          
            </CRow>
            <CRow>
                        <CCol xs>
                        <CCard className="mb-4">
                            <CCardHeader>                  
                                Activities
                                </CCardHeader>        
                            <CTable align="middle" className="mb-0 border" hover responsive>
                                <CTableHead className="text-nowrap">
                                <CTableRow>                                        
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
                            {activities.next_page_url && (
                                  <CPagination aria-label="Page navigation example" className='mt-3 mx-2'>
                                  <CPaginationItem aria-label="Previous" href={activities.prev_page_url}>
                                      <span aria-hidden="true">&laquo;</span>
                                  </CPaginationItem>
                                  {activities.links.map((link, index) => (
                                      link.url && (<CPaginationItem active={link.active}>{link.label}</CPaginationItem>)
                                  ))}                       
                                  <CPaginationItem aria-label="Next" href={activities.next_page_url}>
                                      <span aria-hidden="true">&raquo;</span>
                                  </CPaginationItem>
                               </CPagination>
                            )
                            }   
                             
                        </CCard>
                        </CCol>
            </CRow>
        </div>          
     </DefaultLayout>
  )
}

export default Show
