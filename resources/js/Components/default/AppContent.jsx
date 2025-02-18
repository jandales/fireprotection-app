import React, { Suspense } from 'react'
// import { Navigate, Route, Routes } from 'react-router-dom'
import { CContainer, CSpinner } from '@coreui/react'
import NavLink from '@/Components/NavLink';


// routes config
// import routes from '../routes'

const AppContent = () => {
  return (
    <CContainer className="px-4" lg>
      <Suspense fallback={<CSpinner color="primary" />}>
        <NavLink
                  href={route('dashboard')}
                  active={route().current('dashboard')}
              >
                  Dashboard
              </NavLink>
              <NavLink
                  href={route('alerts')}
                  active={route().current('alerts')}
              >
                  Alerts
              </NavLink>
              <NavLink
                  href={route('dashboard')}
                  active={route().current('dashboard')}
              >
                  Admin
              </NavLink>
      </Suspense>
    </CContainer>
  )
}

export default React.memo(AppContent)
