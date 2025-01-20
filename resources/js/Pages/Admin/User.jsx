import DefaultLayout from '@/Layouts/DefaultLayout';

import { Link } from '@inertiajs/react';

import {
  CCard,
  CCardHeader,
  CCol,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CAvatar,
  CPagination,
  CPaginationItem
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import {  cilPeople  } from '@coreui/icons'


import user from  '@/assets/images/avatars/user.png'
import { Route } from 'react-router-dom';


const User = (res) => {
    const users = res.users
    const links = users.links.filter(link => link.label !== "Next &raquo;" && link.label !== "&laquo; Previous")
    
  return (
      <DefaultLayout     
      >
        <div className="py-12">
        <CRow>
            <CCol xs>
            <CCard className="mb-4">
                <CCardHeader>
                    Users                  
                    </CCardHeader>        
                <CTable align="middle" className="mb-0 border" hover responsive>
                    <CTableHead className="text-nowrap">
                    <CTableRow>  
                        <CTableHeaderCell className="bg-body-tertiary text-center">
                        <CIcon icon={cilPeople} />
                        </CTableHeaderCell>                
                        <CTableHeaderCell className="bg-body-tertiary">
                            Name
                        </CTableHeaderCell> 
                        <CTableHeaderCell className="bg-body-tertiary">
                            Email
                        </CTableHeaderCell>                  
                        <CTableHeaderCell className="bg-body-tertiary">
                            Contact
                        </CTableHeaderCell>
                        <CTableHeaderCell className="bg-body-tertiary">
                            Address
                        </CTableHeaderCell> 
                        <CTableHeaderCell className="bg-body-tertiary">
                            Action
                        </CTableHeaderCell>                   
                    </CTableRow>
                    </CTableHead>
                    <CTableBody>
                    {users.data.map((item, index) => (
                        <CTableRow v-for="item in tableItems" key={index}>
                        <CTableDataCell className="text-center">
                            <CAvatar size="md" src={user} />
                        </CTableDataCell>
                        <CTableDataCell>
                            <div>{item.name}</div>
                        </CTableDataCell>
                        <CTableDataCell>
                            <div>{item.email}</div>                       
                        </CTableDataCell>                     
                        <CTableDataCell>
                            <div>{item.phonenumber}</div>                       
                        </CTableDataCell> 
                        <CTableDataCell>
                            <div>{item.location}</div>                       
                        </CTableDataCell> 
                        <CTableDataCell>
                            <div className='btn-gap'>
                                <Link color="info" variant="outline" size="sm" href={route('users.show', item)}>View</Link>   
                            </div>                  
                        </CTableDataCell>                                 
                        </CTableRow>
                    ))}
                    </CTableBody>
                </CTable>  
                             {links.length > 1 && (
                                      <CPagination aria-label="Page navigation example" className='mt-3 mx-2'>
                                      <CPaginationItem aria-label="Previous" href={users.prev_page_url}>
                                          <span aria-hidden="true">&laquo;</span>
                                      </CPaginationItem>
                                      {links.map((link, index) => (                                     
                                          link.url && (<CPaginationItem href={link.url} active={link.active}>{link.label}</CPaginationItem>)
                                      ))}                       
                                      <CPaginationItem aria-label="Next" href={users.next_page_url}>
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

export default User
