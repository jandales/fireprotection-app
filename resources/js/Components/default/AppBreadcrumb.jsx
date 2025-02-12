import React from 'react'
import { useLocation } from 'react-router-dom'
import { usePage } from '@inertiajs/react';
import { Link } from '@inertiajs/react';
import routes from '@/Includes/routes'

import { CBreadcrumb, CBreadcrumbItem } from '@coreui/react'


const AppBreadcrumb = () => {
  const { url, props } = usePage();

  const getRouteName = (pathname, routes) => {
    const currentRoute = routes.find((route) => route.path === pathname)
    return currentRoute ? currentRoute.name : false
  }
 

  const getBreadcrumbs = (location) => {
    const breadcrumbs = []
    location.split('/').reduce((prev, curr, index, array) => {
      const currentPathname = `${prev}/${curr}`
      const routeName = getRouteName(currentPathname, routes)
      routeName &&
        breadcrumbs.push({
          pathname: currentPathname,
          name: routeName,
          active: index + 1 === array.length ? true : false,
        })
      return currentPathname
    })
    return breadcrumbs
  }

  const breadcrumbs = getBreadcrumbs(url)

  return (
    <CBreadcrumb className="my-0">
      <li className='breadcrumb-item'>
          <Link className='nav-link' href={route('dashboard')}>    
            Home 
          </Link>
      </li>
      {breadcrumbs.map((breadcrumb, index) => {
        return (
          <li className='breadcrumb-item'>
            <Link className='breadcrumb-item-a'>  
               {breadcrumb.name}
             </Link>
            </li>
        )
      })}
    </CBreadcrumb>
  )
}

export default React.memo(AppBreadcrumb)
