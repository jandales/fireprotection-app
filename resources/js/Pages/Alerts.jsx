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


const Alerts = () => {
  const alerts = [
    {name:'Jess', contact:'0931314872', location: 'Lagundi Allen Northern Samar'},
    {name:'Jess', contact:'0931314872', location: 'Lagundi Allen Northern Samar'},
    {name:'Jess', contact:'0931314872', location: 'Lagundi Allen Northern Samar'},
    {name:'Jess', contact:'0931314872', location: 'Lagundi Allen Northern Samar'},
    {name:'Jess', contact:'0931314872', location: 'Lagundi Allen Northern Samar'},
    {name:'Jess', contact:'0931314872', location: 'Lagundi Allen Northern Samar'},
    {name:'Jess', contact:'0931314872', location: 'Lagundi Allen Northern Samar'},
    {name:'Jess', contact:'0931314872', location: 'Lagundi Allen Northern Samar'}
  ]

  return (
      <DefaultLayout
      header={
        <h2 className="text-xl font-semibold leading-tight text-gray-800">
            Alerts
        </h2>
    }
      >
        <div className="py-12">
        <CRow>
            <CCol xs>
            <CCard className="mb-4">
                <CCardHeader>Fire Alerts</CCardHeader>        
                <CTable align="middle" className="mb-0 border" hover responsive>
                    <CTableHead className="text-nowrap">
                    <CTableRow>                  
                        <CTableHeaderCell className="bg-body-tertiary">
                            Name
                        </CTableHeaderCell>                   
                        <CTableHeaderCell className="bg-body-tertiary">
                            Contact
                        </CTableHeaderCell>
                        <CTableHeaderCell className="bg-body-tertiary">
                        Location
                        </CTableHeaderCell> 
                        <CTableHeaderCell className="bg-body-tertiary">
                        Action
                        </CTableHeaderCell>                   
                    </CTableRow>
                    </CTableHead>
                    <CTableBody>
                    {alerts.map((item, index) => (
                        <CTableRow v-for="item in tableItems" key={index}>
                        <CTableDataCell>
                            <div>{item.name}</div>
                        </CTableDataCell>
                        <CTableDataCell>
                            <div>{item.contact}</div>                       
                        </CTableDataCell>                     
                        <CTableDataCell>
                            <div>{item.location}</div>                       
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

export default Alerts
