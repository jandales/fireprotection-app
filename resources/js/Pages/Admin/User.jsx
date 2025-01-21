import DefaultLayout from '@/Layouts/DefaultLayout';
import { Link, router, useForm } from '@inertiajs/react';
import React, { useState, useEffect } from "react";
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
  CFormInput,
  CForm

} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import {  cilPeople  } from '@coreui/icons'
import user from  '@/assets/images/avatars/user.png';
import Pagination from '@/Components/Pagination';


const User = (res, filter) => {
    
    const [search, setSearch] = useState(filter || "");
    const [debouncedSearch, setDebouncedSearch] = useState(search);
    
    const users = res.users  
  
    const onPageChange = (url) => {
        router.get(url, {}, { preserveScroll: true, preserveState: true });
    }

    const handleSearch = (event) => {

        if(search != null && event.key == 'Enter') {
            router.get(route('users'), { search }, { preserveScroll: true, preserveState: true });
        }     
    };


  return (
      <DefaultLayout     
      >
        <div className="py-12">
        <CRow>
            <CCol xs>
            <CCard className="mb-4">
                <CCardHeader>
                    <CRow>                       
                        <CCol md={2}>
                            <CFormInput 
                                type="text" 
                                id="filter" 
                                placeholder="Search" 
                                aria-describedby="exampleFormControlInputHelpInline"
                                onChange={(e) => setSearch(e.target.value)}
                                onKeyDown={handleSearch}
                                 />
                        </CCol>
                    </CRow>   
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

                 { users.last_page > 1 && (
                    <Pagination
                        currentpage={users.current_page}
                        nextpage={users.next_page_url}
                        prevpage={users.prev_page_url}
                        firstpage={users.first_page_url}
                        lastpage={users.last_page_url}
                        totalRecord={users.total}
                        totalPage={users.last_page}
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
