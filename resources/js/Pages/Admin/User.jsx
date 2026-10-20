import DefaultLayout from '@/Layouts/DefaultLayout';
import { Link, router } from '@inertiajs/react';
import React from "react";
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
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilMagnifyingGlass, cilPeople } from '@coreui/icons'
import DefaultAvatar from  '@/assets/images/avatars/user.png';
import Pagination from '@/Components/Pagination';
import Search from '@/Components/Search';


const User = ({ users, filter }) => {

  
    const onPageChange = (url) => {
        router.get(url, filter ? { search: filter } : {}, { preserveScroll: true, preserveState: true });
    }  
    

  return (
      <DefaultLayout     
      >
        <div className="py-12">
        <CRow>
            <CCol xs>
            <CCard className="mb-4">
                <CCardHeader>
                    <Search route={route('users')} filter={filter} />  
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
                    {users.data.length ? users.data.map((item) => (
                        <CTableRow key={item.id}>
                        <CTableDataCell className="text-center">
                            <CAvatar size="md" src={item.avatar ? item.avatar : DefaultAvatar} />
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
                                <Link className="table-action-button" title="View user" aria-label={`View ${item.name}`} href={route('users.show', item)}>
                                  <CIcon icon={cilMagnifyingGlass} aria-hidden="true" />
                                </Link>
                            </div>                  
                        </CTableDataCell>                                 
                        </CTableRow>
                    )) : (
                      <CTableRow>
                        <CTableDataCell colSpan={6} className="table-empty-cell">No users found.</CTableDataCell>
                      </CTableRow>
                    )}
                    </CTableBody>
                </CTable> 

                 { users.last_page > 1 && (
                    <Pagination
                        currentpage={users.current_page}
                        nextpage={users.next_page_url}
                        prevpage={users.prev_page_url}
                        firstpage={users.first_page_url}
                        lastpage={users.last_page_url}
                        totalRecord={users.total}
                        totalPage={users.last_page}
                        perPage={users.per_page}
                        onPageChange={onPageChange}
                     />
                 )}
             
            </CCard>
            </CCol>
        </CRow>
        </div>
     </DefaultLayout>
  )
}

export default User
