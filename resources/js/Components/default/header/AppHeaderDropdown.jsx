import React from 'react'
import { Link } from '@inertiajs/react';
import {
  CAvatar,
  CDropdown,
  CDropdownHeader, 
  CDropdownMenu,
  CDropdownToggle,
} from '@coreui/react'
import {  
  cilSettings,
  cilAccountLogout,
  cilUser,
} from '@coreui/icons'
import CIcon from '@coreui/icons-react'

import avatar8 from '@/assets/images/avatars/8.jpg'

const AppHeaderDropdown = () => {
  return (
    <CDropdown variant="nav-item">
      <CDropdownToggle placement="bottom-end" className="py-0 pe-0" caret={false}>
        <CAvatar src={avatar8} size="md" />
      </CDropdownToggle>
      <CDropdownMenu className="pt-0" placement="bottom-end">       
        <CDropdownHeader className="bg-body-secondary fw-semibold my-2">Settings</CDropdownHeader>
           <Link  className='dropdown-item' href={route('account')} active={route().current('account')} >
                <CIcon icon={cilUser} className='me-2' />Account  
           </Link>
           <Link  className='dropdown-item' href={route('settings.index')} active={route().current('settings.index')} >
                <CIcon icon={cilSettings} className='me-2' />Settings
           </Link> 
           <Link  className='dropdown-item nav-link-btn'
                        href={route('logout')}
                        method="post"
                        as="button"                    
                     >
                       <CIcon icon={cilAccountLogout} className='me-2' /> Logout
                     </Link>      
      </CDropdownMenu>
    </CDropdown>
  )
}

export default AppHeaderDropdown
