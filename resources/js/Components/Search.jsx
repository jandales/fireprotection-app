import { router } from '@inertiajs/react';
import React, { useEffect,useState } from "react";
import {
  CCol,
  CRow,
  CFormInput,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import {   cilFilterX  } from '@coreui/icons'



const Search = ({route, filter}) => {
    
    const [search, setSearch] = useState(filter || "");
    const [filterVisible, setFilterVisible] = useState(false);


    const handleSearch = (event) => {
        if(search != null && event.key == 'Enter') {            
            router.get(route, { search }, { preserveScroll: true, preserveState: true });
        }     
    };

    useEffect(() => {
        setFilterVisible(!!search);  
    }, [search]);    

    useEffect(() => {
        if (typeof search === "object" && search !== null) {           
            setSearch("");
            setFilterVisible(false); 
        } else if (typeof search === "string" && search.trim() !== "") {           
            setFilterVisible(true);
        } else {        
            setFilterVisible(false);
        }
    }, [search]);

    const handleClearFiler = () =>{     
        setSearch("");
        router.get(route, { search : null }, { preserveScroll: true, preserveState: true });
        setFilterVisible(false);          
    }    

  return (
        <CRow>                       
            <CCol md={2}>                      
                <CFormInput 
                    type="text" 
                    id="filter" 
                    placeholder="Search" 
                    value={search}                    
                    aria-describedby="exampleFormControlInputHelpInline"
                    onChange={(e) => setSearch(e.target.value)}
                    onKeyDown={handleSearch}
                        />
            </CCol>
            {filterVisible === true && (
            <CCol md={2} className='filter-icon'>  
                    <CIcon  onClick={handleClearFiler} icon={cilFilterX} />  
            </CCol>
            )}
            
        </CRow>  
           
  )
}

export default Search
