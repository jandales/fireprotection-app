import React from 'react'
import { 
  AppContent, 
  AppSidebar, 
  AppFooter,
  AppHeader
} from '@/Components/default/index';

import { CContainer, CSpinner } from '@coreui/react'
import { Link, usePage } from '@inertiajs/react';
import { useState } from 'react';

export default function DefaultLayout({ header, children }) {
    const user = usePage().props.auth.user;
  
    const [showingNavigationDropdown, setShowingNavigationDropdown] =
        useState(false);
  return (
    <div>
      <AppSidebar />
      <div className="wrapper d-flex flex-column min-vh-100">
        <AppHeader />
        <div className="body flex-grow-1">
           <CContainer className="px-4" lg>{children}</CContainer>        
        </div>
        <AppFooter />
      </div>
    </div>
  )
}


