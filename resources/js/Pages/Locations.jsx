import DefaultLayout from '@/Layouts/DefaultLayout';

import { Head } from '@inertiajs/react';

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
  CButton,
} from '@coreui/react'


const Locations = (data) => {  
    const locations = data.locations

    console.log(locations)
  return (
      <DefaultLayout>
        <div className="py-12">
        <CRow>
            <CCol xs>
            <CCard className="mb-4">
                <CCardHeader>Location</CCardHeader>        
                <CTable align="middle" className="mb-0 border" hover responsive>
                    <CTableHead className="text-nowrap">
                    <CTableRow>                  
                        <CTableHeaderCell className="bg-body-tertiary">
                            Location
                        </CTableHeaderCell>                   
                        <CTableHeaderCell className="bg-body-tertiary">
                            IP Address
                        </CTableHeaderCell>
                        <CTableHeaderCell className="bg-body-tertiary">
                            Client Name
                        </CTableHeaderCell> 
                        <CTableHeaderCell className="bg-body-tertiary">
                            Action
                        </CTableHeaderCell>                   
                    </CTableRow>
                    </CTableHead>
                    <CTableBody>
                    {locations.map((item, index) => (
                        <CTableRow v-for="item in tableItems" key={index}>
                        <CTableDataCell>
                            <div>{item.location}</div>
                        </CTableDataCell>
                        <CTableDataCell>
                            <div>{item.ipAddress}</div>                       
                        </CTableDataCell>                     
                        <CTableDataCell>
                            <div>{item.clients_id}</div>                       
                        </CTableDataCell> 
                        <CTableDataCell>
                            <div className='btn-gap'>
                            <CButton color="primary" variant="outline" size="sm">Edit</CButton> 
                            <CButton color="danger" variant="outline" size="sm">Delete</CButton>   
                            </div>                  
                        </CTableDataCell>                                 
                        </CTableRow>
                    ))}
                    </CTableBody>
                </CTable>       
            </CCard>
            </CCol>
        </CRow>
        </div>
     </DefaultLayout>
  )
}

export default Locations
