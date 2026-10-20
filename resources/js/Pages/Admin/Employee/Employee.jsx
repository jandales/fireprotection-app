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
import { cilPeople, cilMagnifyingGlass, cilPencil, cilTrash } from '@coreui/icons'
import DefaultAvatar from  '@/assets/images/avatars/user.png';
import Pagination from '@/Components/Pagination';
import Search from '@/Components/Search';
import { toast } from 'react-toastify';



const User = ({ users, filter }) => {
   
       const { delete : destroy } =  useForm();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [deleteId, setDeleteId] = useState("");
  
    const onPageChange = (url) => {
        router.get(url, filter ? { search: filter } : {}, { preserveScroll: true, preserveState: true });
    } 

    const deleteDevice = () => { 
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
                    {users.data.length ? users.data.map((item) => (
                        <CTableRow key={item.id}>
                        <CTableDataCell className="text-center">
                            <CAvatar size="md" src={item.avatar ? item.avatar : DefaultAvatar} />
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
                            <span className={`status-badge ${item.status == 1 ? 'status-badge-critical' : 'status-badge-neutral'}`}>{item.statusName}</span>
                        </CTableDataCell> 
                        <CTableDataCell>  
                            <div className="table-actions">
                                <CButton className="table-action-button table-action-delete" title="Delete employee" aria-label={`Delete ${item.name}`} onClick={() => handleOpenModal(item.id)}><CIcon icon={cilTrash} /></CButton>
                                <Link className="table-action-button" title="Edit employee" aria-label={`Edit ${item.name}`} href={route('employees.edit', item.id)}><CIcon icon={cilPencil} /></Link>
                                <Link className="table-action-button" title="View employee" aria-label={`View ${item.name}`} href={route('employees.show', item.id)}><CIcon icon={cilMagnifyingGlass} /></Link>
                            </div> 
                        </CTableDataCell>                                 
                        </CTableRow>
                    )) : (
                      <CTableRow>
                        <CTableDataCell colSpan={8} className="table-empty-cell">No employees found.</CTableDataCell>
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
