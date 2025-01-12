import { Link } from '@inertiajs/react';
import CIcon from '@coreui/icons-react'; 
export default function NavLink({
    active = false,
    className = '',
    children,
    icon,
    ...props
}) {
    return (
        <div className='nav-item'>       
            <Link
                {...props}
                className='nav-link'
            >
            {children}                
            </Link>
        </div>
    );
}
