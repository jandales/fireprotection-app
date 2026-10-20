import React from 'react';
import { Link, usePage } from '@inertiajs/react';
import SimpleBar from 'simplebar-react';
import 'simplebar-react/dist/simplebar.min.css';
import { CSidebarNav } from '@coreui/react';
import CIcon from '@coreui/icons-react';
import {
  cilAccountLogout,
  cilBell,
  cilDevices,
  cilGroup,
  cilSettings,
  cilSpeedometer,
  cilUser,
} from '@coreui/icons';

const SidebarLink = ({ href, active, icon, children, className = '' }) => (
  <div className="nav-item">
    <Link
      href={href}
      title={children}
      aria-current={active ? 'page' : undefined}
      className={`nav-link ${active ? 'active' : ''} ${className}`}
    >
      <CIcon icon={icon} className="nav-icon" aria-hidden="true" />
      <span>{children}</span>
    </Link>
  </div>
);

export const AppSidebarNav = () => {
  const user = usePage().props.auth.user;
  const isAdministrator = user.role === 'administrator';
  const isStaff = user.role !== 'user';

  return (
    <CSidebarNav as={SimpleBar} className="fire-sidebar-nav">
      {isStaff && (
        <>
          {isAdministrator && (
            <SidebarLink href={route('dashboard')} active={route().current('dashboard')} icon={cilSpeedometer}>
              Dashboard
            </SidebarLink>
          )}
          <SidebarLink href={route('notifications')} active={route().current('notifications')} icon={cilBell}>
            Notifications
          </SidebarLink>
          <SidebarLink href={route('users')} active={route().current('users') || route().current('users.show')} icon={cilGroup}>
            Users
          </SidebarLink>
          {isAdministrator && (
            <>
              <SidebarLink
                href={route('devices')}
                active={route().current('devices') || route().current('devices.maps')}
                icon={cilDevices}
              >
                Devices
              </SidebarLink>
              <SidebarLink
                href={route('employees')}
                active={
                  route().current('employees')
                  || route().current('employees.create')
                  || route().current('employees.edit')
                  || route().current('employees.show')
                }
                icon={cilGroup}
              >
                Employee
              </SidebarLink>
            </>
          )}
          <SidebarLink href={route('account')} active={route().current('account')} icon={cilUser}>
            Account
          </SidebarLink>
          {isAdministrator && (
            <SidebarLink href={route('settings.index')} active={route().current('settings.index')} icon={cilSettings}>
              Settings
            </SidebarLink>
          )}
        </>
      )}

      {user.role === 'user' && (
        <>
          <SidebarLink href={route('user')} active={route().current('user')} icon={cilUser}>
            Profile
          </SidebarLink>
          <SidebarLink href={route('user.devices')} active={route().current('user.devices')} icon={cilDevices}>
            Devices
          </SidebarLink>
          <SidebarLink href={route('user.settings')} active={route().current('user.settings')} icon={cilSettings}>
            Settings
          </SidebarLink>
        </>
      )}

      <div className="nav-item sidebar-logout-item">
        <Link
          className="nav-link nav-link-btn"
          title="Logout"
          href={route('logout')}
          method="post"
          as="button"
        >
          <CIcon icon={cilAccountLogout} className="nav-icon" aria-hidden="true" />
          <span>Logout</span>
        </Link>
      </div>
    </CSidebarNav>
  );
};
