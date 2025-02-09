import React from 'react'

import {  
    CButton, 
    CModal,
    CModalBody,
    CModalFooter,
    CModalHeader,
    CModalTitle
} from '@coreui/react'

const ConfirmDelete = ({ isOpen, onClose, onConfirm, message }) => {
    if (!isOpen) return null; // Don't render if the modal is closed


  return (
    <CModal
                visible={isOpen}
                onClose={onClose}
                aria-labelledby="LiveDemoExampleLabel"
            >  
                <CModalHeader>
                <CModalTitle id="delete">Delete</CModalTitle>
                </CModalHeader>
                <CModalBody>{message}</CModalBody>
                <CModalFooter>
                <CButton color="secondary" onClick={onClose}>
                    No
                </CButton>
                 <CButton color="danger" type='submit' onClick={onConfirm}>Yes</CButton>
                </CModalFooter>
                
          </CModal>   
  )
}

export default ConfirmDelete 
