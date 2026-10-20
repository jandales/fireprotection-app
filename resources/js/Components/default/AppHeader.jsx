import React, { useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link, usePage } from '@inertiajs/react'
import {
  CContainer,
  CHeader,
  CHeaderNav,
  CHeaderToggler,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import {
  cilBell,
  cilMenu,
} from '@coreui/icons'

import { AppBreadcrumb } from './index'
import { AppHeaderDropdown } from './header/index'

const AppHeader = () => {
  const { props, url } = usePage()
  const station = props.station
  const headerRef = useRef()

  const dispatch = useDispatch()
  const sidebarShow = useSelector((state) => state.sidebarShow)
  const pagePath = url.split('?')[0]
  const pageTitle = {
    '/dashboard': 'Emergency Dashboard',
    '/notifications': 'Notifications',
    '/users': 'Users',
    '/devices': 'Devices',
    '/employees': 'Employee',
    '/account': 'Account',
    '/settings': 'Settings',
  }[pagePath] || 'Fire Station Management'

  useEffect(() => {
    const handleScroll = () => {
      headerRef.current &&
        headerRef.current.classList.toggle('shadow-sm', document.documentElement.scrollTop > 0)
    }
    document.addEventListener('scroll', handleScroll)
    return () => document.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <CHeader position="sticky" className="mb-4 p-0" ref={headerRef}>
      <CContainer className="border-bottom px-4" fluid>
        <div className="app-header-title">
          <strong>{pageTitle}</strong>
          <span>{station?.name ?? 'Fire Station Management'}</span>
        </div>
        <CHeaderNav className="ms-auto app-header-actions">
          <li className="nav-item">
            <Link
              href={route('notifications')}
              className="header-notifications-link"
              aria-label="Open notifications"
              title="Notifications"
            >
              <CIcon icon={cilBell} size="lg" aria-hidden="true" />
            </Link>
          </li>
          <li className="nav-item py-1">
            <div className="vr h-100 mx-2 text-body text-opacity-75"></div>
          </li>
          <AppHeaderDropdown />
        </CHeaderNav>
      </CContainer>
      <CContainer className="px-4 app-header-breadcrumb-row" fluid>
        <CHeaderToggler
          className="app-header-breadcrumb-toggler"
          aria-label="Toggle navigation"
          onClick={() => dispatch({ type: 'set', sidebarShow: !sidebarShow })}
        >
          <CIcon icon={cilMenu} size="lg" />
        </CHeaderToggler>
        <AppBreadcrumb />
      </CContainer>
    </CHeader>
  )
}

export default AppHeader
