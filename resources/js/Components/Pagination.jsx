import React, { useState } from 'react'
import { 
     CPagination
    ,CPaginationItem
 } from '@coreui/react'

 
const Pagination = ({currentpage, nextpage, prevpage, firstpage, lastpage, totalRecord, totalPage, onPageChange}) => { 
     
    const handlefirstPage = () => {

        onPageChange(firstpage)
    }

    const handleLastPage = () => {
        onPageChange(lastpage)
    }

    const handlePrevPage = () => {
        onPageChange(prevpage)
    }

    const handleNextPage = () => {
        onPageChange(nextpage)
    }

  return ( 
    <div className="custom-pagination-wrapper">   
            <span className="pagination-label mx-2">Total Record: {totalRecord}</span>
            <div className='flex-container'>                
                <span className='pagination-label'>Page {currentpage} of {totalPage}</span>
               <CPagination aria-label="Page navigation example" className='mt-3 mx-2'>
                    <CPaginationItem aria-label="Previous"  onClick={handlefirstPage}>
                        <span aria-hidden="true">&laquo;</span>
                    </CPaginationItem> 
                    <CPaginationItem aria-label="Next" onClick={handlePrevPage}>
                        <span aria-hidden="true">&#60;</span>
                    </CPaginationItem>
                    <CPaginationItem aria-label="Next" onClick={handleNextPage}>
                        <span aria-hidden="true">&#62;</span>
                    </CPaginationItem>                                                                       
                    <CPaginationItem aria-label="Next" onClick={handleLastPage}>
                        <span aria-hidden="true">&raquo;</span>
                    </CPaginationItem>
                </CPagination>
            </div>  
   </div>   
         
  )
}

export default Pagination
