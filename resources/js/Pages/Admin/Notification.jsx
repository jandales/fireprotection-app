import DefaultLayout from '@/Layouts/DefaultLayout';
import { Link, router } from '@inertiajs/react';
import React, { useState } from "react";
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
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import {  cilPeople  } from '@coreui/icons'
import user from  '@/assets/images/avatars/user.png';
import Pagination from '@/Components/Pagination';


const Notification = (res, filter) => {
    
    const [search, setSearch] = useState(filter || "");

    const notifications  = res.notifications  
    console.log(notifications)
    const onPageChange = (url) => {
        router.get(url, {}, { preserveScroll: true, preserveState: true });
    }

    const handleSearch = (event) => {
        if(search != null && event.key == 'Enter') {
            router.get(route('notifications'), { search }, { preserveScroll: true, preserveState: true });
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
                            Device 
                        </CTableHeaderCell>                  
                        <CTableHeaderCell className="bg-body-tertiary">
                            Location
                        </CTableHeaderCell>                      
                        <CTableHeaderCell className="bg-body-tertiary">
                            Date & Time
                        </CTableHeaderCell>
                        <CTableHeaderCell className="bg-body-tertiary">
                            Status
                        </CTableHeaderCell> 
                        <CTableHeaderCell className="bg-body-tertiary">
                            Action
                        </CTableHeaderCell> 
                    </CTableRow>
                    </CTableHead>
                    <CTableBody>
                    {notifications.data.map((item, index) => (
                        <CTableRow v-for="item in tableItems" key={index}>
                        <CTableDataCell className="text-center">
                            <CAvatar size="md" src={user} />
                        </CTableDataCell>
                        <CTableDataCell>
                            <div>{item.name}</div>
                            <div>
                                <small className='font'>{item.user.email}</small>
                                { item.user.phonenumber && (<small className='mx-1'>|</small>)}
                                <small>{item.user.phonenumber}</small>
                            </div>
                        </CTableDataCell>
                        <CTableDataCell>
                            <div>{item.device + ':' + item.macAddress}</div>                       
                        </CTableDataCell>                     
                        <CTableDataCell>
                            <div>{item.location}</div>                       
                        </CTableDataCell> 
                        <CTableDataCell>
                            <div>{item.created_at}</div>                       
                        </CTableDataCell> 
                        <CTableDataCell >
                            <div className='text-capitalize small'>{item.status}</div>                       
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

                 { notifications.last_page > 1 && (
                    <Pagination
                        currentpage={notifications.current_page}
                        nextpage={notifications.next_page_url}
                        prevpage={notifications.prev_page_url}
                        firstpage={notifications.first_page_url}
                        lastpage={notifications.last_page_url}
                        totalRecord={notifications.total}
                        totalPage={notifications.last_page}
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

export default Notification