import React from 'react'
import { Link, usePage } from '@inertiajs/react';
import PropTypes from 'prop-types'
import SimpleBar from 'simplebar-react'
import 'simplebar-react/dist/simplebar.min.css'

import { CBadge, CSidebarNav } from '@coreui/react'
import CIcon from '@coreui/icons-react'; 
import { 
  cilBell,
  cilSpeedometer,
  cilUser,
  cilGroup,
  cilPrint,
  cilCog,
  cilSettings,
  cilDevices
 } from '@coreui/icons'; 

export const AppSidebarNav = ({ items }) => {
      const user = usePage().props.auth.user;
 
  return (
    <CSidebarNav as={SimpleBar}>    
        {
          user.role === 'administrator' && (
            <>
            <div className='nav-item'>
              <Link className='nav-link' href={route('dashboard')} active={route().current('dashboard')}>
                <CIcon icon={cilSpeedometer} className='nav-icon'/> Dashboard   
              </Link>
            </div>
            <div className='nav-item'>
              <Link className='nav-link' href={route('notifications')} active={route().current('notifications')}>
                <CIcon icon={cilBell} className='nav-icon'/> Notifications
              </Link>
             </div>
            <div className='nav-item'>
              <Link  className='nav-link' href={route('users')} active={route().current('users')} >
                <CIcon icon={cilGroup} className='nav-icon' /> Users    
              </Link>
            </div> 
            <div className='nav-item'>
              <Link  className='nav-link' href={route('devices')} active={route().current('devices')} >
                <CIcon icon={cilDevices} className='nav-icon' /> Devices    
              </Link>
            </div> 
            <div className='nav-item'>
              <Link  className='nav-link' href={route('employees')} active={route().current('employees')} >
                <CIcon icon={cilGroup} className='nav-icon' /> Employee    
              </Link>
            </div>           
            </>
          )
        }       

        {
           user.role === 'user' && (
              <>
              <div className='nav-item'>
              <Link  className='nav-link' href={route('user')} active={route().current('user')} >
                <CIcon icon={cilUser} className='nav-icon' /> Profile   
              </Link>
            </div> 
    
            <div className='nav-item'>
              <Link  className='nav-link' href={route('user.devices')} active={route().current('user.devices')}>
                <CIcon icon={cilDevices} className='nav-icon' /> Devices   
              </Link>
            </div> 
    
            <div className='nav-item'>
              <Link  className='nav-link' href={route('user.settings')} active={route().current('user.settings')} >
                <CIcon icon={cilSettings} className='nav-icon' /> Settings
              </Link>
            </div>
              </>
           )
        }
        

        <div className='nav-item'>
          <Link  className='nav-link'
             href={route('logout')}
             method="post"
             as="button"            
          >
            <CIcon icon={cilCog} className='nav-icon' /> Logout
          </Link>
        </div>        
       
    </CSidebarNav>
  )
}

AppSidebarNav.propTypes = {
  items: PropTypes.arrayOf(PropTypes.any).isRequired,
}
