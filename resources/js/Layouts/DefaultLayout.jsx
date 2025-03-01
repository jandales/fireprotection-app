import React from 'react'
import { 
  AppContent, 
  AppSidebar, 
  AppHeader
} from '@/Components/default/index';

import {  ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { CContainer } from '@coreui/react'
import {  usePage } from '@inertiajs/react';
import { useState } from 'react';
import NotificationAlert from '@/Components/NotificationAlert';
import BackgroundAudio from '@/Components/BackgroundAudio';
import { useSelector } from "react-redux";


export default function DefaultLayout({ header, children }) {
    const user = usePage().props.auth.user;
    const isPlaying = useSelector((state) => state.isPlaying);
  
    const [showingNavigationDropdown, setShowingNavigationDropdown] =
        useState(false);
  return (
    <div>
      <AppSidebar />
      <div className="wrapper d-flex flex-column min-vh-100">
        <AppHeader />
        <div className="body flex-grow-1">
           <CContainer className="px-4" fluid>{children}</CContainer>        
        </div>
      </div>
       <ToastContainer />
      { !route().current('dashboard') && <NotificationAlert /> }        
      {isPlaying && <BackgroundAudio /> }
    </div>
  )
}


