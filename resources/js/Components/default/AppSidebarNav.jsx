import React from 'react'
import { Link, usePage } from '@inertiajs/react';
import PropTypes from 'prop-types'
import SimpleBar from 'simplebar-react'
import 'simplebar-react/dist/simplebar.min.css'

import {  CSidebarNav } from '@coreui/react'
import CIcon from '@coreui/icons-react'; 
import { 
  cilBell,
  cilSpeedometer,
  cilUser,
  cilGroup,
  cilAccountLogout,
  cilSettings,
  cilDevices
 } from '@coreui/icons'; 

export const AppSidebarNav = ({ items }) => {
      const user = usePage().props.auth.user;
 
  return (
    <CSidebarNav as={SimpleBar}>    
        {
          user.role != 'user' && (
            <>
            {user.role == 'administrator' &&
            <div className='nav-item'>
              <Link 
                className={`nav-link ${route().current('dashboard') ? 'active' : ''}`}  
                href={route('dashboard')}>
                <CIcon icon={cilSpeedometer} className='nav-icon'/> Dashboard   
              </Link>
            </div>
            }
            <div className='nav-item'>
              <Link            
                 className={`nav-link ${route().current('notifications') ? 'active' : ''}`}  
                 href={route('notifications')}>
                <CIcon icon={cilBell} className='nav-icon'/> Notifications
              </Link>
             </div>
            <div className='nav-item'>
              <Link  
                className={`nav-link ${route().current('users') ? 'active' : ''}`}  
                href={route('users')} >
                <CIcon icon={cilGroup} className='nav-icon' /> Users    
              </Link>
            </div> 
            {user.role == 'administrator' &&
            <div className='nav-item'>
              <Link  
                className={`nav-link ${route().current('devices')  || route().current('devices.maps')  ? 'active' : ''}`}  
                href={route('devices')} >
                <CIcon icon={cilDevices} className='nav-icon' /> Devices    
              </Link>
            </div> 
            }
            {user.role == 'administrator' &&
              <div className='nav-item'>
                <Link  
                  className={`nav-link ${route().current('employees') ? 'active' : ''}`} 
                  href={route('employees')} >
                  <CIcon icon={cilGroup} className='nav-icon' /> Employee    
                </Link>
              </div> 
            }
            <div className='nav-item'>
              <Link  
                 className={`nav-link ${route().current('account') ? 'active' : ''}`} 
                 href={route('account')} >
                <CIcon icon={cilUser} className='nav-icon' />  Account  
              </Link>
            </div> 
            {user.role == 'administrator' &&
              <div className='nav-item'>
                <Link  
                  className={`nav-link ${route().current('settings.index') ? 'active' : ''}`} 
                  href={route('settings.index')}>
                  <CIcon icon={cilSettings} className='nav-icon' /> Settings    
                </Link>
              </div> 
            }              
            </>
          )
        }       

        {
           user.role === 'user' && (
              <>
            <div className='nav-item'>
              <Link  
                className={`nav-link ${route().current('user') ? 'active' : ''}`} 
                href={route('user')}>
                <CIcon icon={cilUser} className='nav-icon' /> Profile   
              </Link>
            </div> 
    
            <div className='nav-item'>
              <Link  
                className={`nav-link ${route().current('user.devices') ? 'active' : ''}`} 
                href={route('user.devices')}>
                <CIcon icon={cilDevices} className='nav-icon' /> Devices   
              </Link>
            </div> 
    
            <div className='nav-item'>
              <Link  
                className={`nav-link ${route().current('user.settings') ? 'active' : ''}`} 
                href={route('user.settings')}>
                <CIcon icon={cilSettings} className='nav-icon' /> Settings
              </Link>
            </div>
              </>
           )
        }
        

        <div className='nav-item'>
          <Link  className='nav-link nav-link-btn'
             href={route('logout')}
             method="post"
             as="button"                    
          >
            <CIcon icon={cilAccountLogout} className='nav-icon' /> Logout
          </Link>
        </div>        
       
    </CSidebarNav>
  )
}

AppSidebarNav.propTypes = {
  items: PropTypes.arrayOf(PropTypes.any).isRequired,
}
