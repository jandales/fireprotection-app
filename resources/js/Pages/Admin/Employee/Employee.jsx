import React, { useState } from 'react';
import DefaultLayout from '@/Layouts/DefaultLayout';
import { Link, router, useForm } from '@inertiajs/react';
import NotificationAlert from '@/Components/NotificationAlert';
import ConfirmDelete from '@/Components/ConfirmDelete';
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
  CButton,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import {  cilPeople  } from '@coreui/icons'
import user from  '@/assets/images/avatars/user.png';
import Pagination from '@/Components/Pagination';
import Search from '@/Components/Search';
import { toast } from 'react-toastify';



const User = (res, filter) => {    
   
    const users = res.users  
       const { delete : destroy } =  useForm();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [deleteId, setDeleteId] = useState("");
  
    const onPageChange = (url) => {
        router.get(url, {}, { preserveScroll: true, preserveState: true });
    } 

    const deleteDevice = () => { 
        console.log(deleteId) 
        destroy(route('employees.destroy', {id : deleteId }), {
            preserveScroll: true,
            onSuccess: () => {
                handleCloseModal();
                toast.success("Successfully Deleted", {
                    autoClose: 1000,
                });
            }      
       
        });
    };   

    const handleOpenModal = (id) => {
       setDeleteId(id);
       setIsModalOpen(true);
    };
  
    const handleCloseModal = () => {
      setDeleteId(null);
      setIsModalOpen(false);
    };
  
    const handleConfirm = () => {
      deleteDevice(); 
      setIsModalOpen(false);
    };
  

    console.log(users.data)
   

  return (
      <DefaultLayout     
      >
        <div className="py-12">
        <CRow>
            <CCol xs>
            <CCard className="mb-4">
                <CCardHeader>
                    <CRow>
                        <CCol md={10}>
                            <Search route={route('employees')} filter={filter} />  
                        </CCol>
                        <CCol md={2}>
                             <Link   className='btn btn-primary float-right' href={route('employees.create')} >
                                New Employee
                            </Link>
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
                            Role
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
                            Status
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
                            <div className='capitalize'>{item.role}</div>
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
                            <span className='capitalize status'>{item.statusName}</span>                       
                        </CTableDataCell> 
                        <CTableDataCell>  
                            <div className='btn-gap'>
                                <CButton color="danger" variant="outline" size="sm"  onClick={(e) => handleOpenModal(item.id)}>Delete</CButton>   
                                <Link  className="btn btn-primary" color="info" variant="outline" size="sm" href={route('employees.edit', item.id)}>Edit</Link>  
                                <Link  className="btn btn-info" color="info" variant="outline" size="sm" href={route('employees.show', item.id)}>View</Link>   
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
                   <NotificationAlert/> 
            </CCard>
            </CCol>
        </CRow>
        </div>
        <ConfirmDelete
            isOpen={isModalOpen}
            onClose={handleCloseModal}
            onConfirm={handleConfirm}
            message="Are you sure you want to delete this employee?"
        />       
     </DefaultLayout>
  )
}

export default User
