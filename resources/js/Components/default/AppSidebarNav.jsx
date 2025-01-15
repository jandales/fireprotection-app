import React from 'react'
import { Link } from '@inertiajs/react';
import PropTypes from 'prop-types'
import NavLink from '@/Components/NavLink';

import SimpleBar from 'simplebar-react'
import 'simplebar-react/dist/simplebar.min.css'

import { CBadge, CNavLink, CSidebarNav } from '@coreui/react'
import CIcon from '@coreui/icons-react'; // CoreUI Icon Component
import { 
  cilBell,
  cilSpeedometer,
  cilUser,
  cilGroup,
  cilPrint,
  cilCog,
 } from '@coreui/icons'; // Specific Icons
export const AppSidebarNav = ({ items }) => {
  return (
    <CSidebarNav as={SimpleBar}>

        <div className='nav-item'>
          <Link className='nav-link' href={route('dashboard')} active={route().current('dashboard')}>
            <CIcon icon={cilSpeedometer} className='nav-icon'/> Dashboard   
          </Link>
        </div>

        <div className='nav-item'>
          <Link className='nav-link' href={route('alerts')} active={route().current('alerts')}>
            <CIcon icon={cilBell} className='nav-icon'/> Alerts
          </Link>
        </div>

        <div className='nav-item'>
          <Link  className='nav-link'>
            <CIcon icon={cilGroup} className='nav-icon' /> Users    
          </Link>
        </div>   

        <div className='nav-item'>
          <Link  className='nav-link'>
            <CIcon icon={cilUser} className='nav-icon' /> Clients    
          </Link>
        </div> 

        <div className='nav-item'>
          <Link  className='nav-link'>
            <CIcon icon={cilPrint} className='nav-icon' /> Reports   
          </Link>
        </div>

        <div className='nav-item'>
          <Link  className='nav-link'>
            <CIcon icon={cilCog} className='nav-icon' /> Settings   
          </Link>
        </div> 

         <div className='nav-item'>
          <Link className='nav-link' href={route('location')} active={route().current('location')}>
            <CIcon icon={cilCog} className='nav-icon' /> Locations 
          </Link>
        </div>       
       
    </CSidebarNav>
  )
}

AppSidebarNav.propTypes = {
  items: PropTypes.arrayOf(PropTypes.any).isRequired,
}
