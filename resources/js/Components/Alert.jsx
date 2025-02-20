import CIcon from '@coreui/icons-react'; 
import {   
    cilFire,
    cilSmoke,
    cilCloudUpload
 } from '@coreui/icons'; 
import {  
    CCol,       
   
} from '@coreui/react'

export default function Alert({ message, device, date, status, type, onAlertClick }) {

  const getIcon = (type) => {
    switch (type) {
      case 'Fire':
        return cilFire;
      case 'Smoke':
        return cilSmoke;
      case 'Temperature':
        return cilCloudUpload;
      default:
        return cilFire;
    }
  };

  const getStatus = (status) => {
    switch (status) {
      case 'active':
        return 'alert-status-active';
      case 'dispatched':
        return 'alert-status-dispatched';
      case 'closed':
        return 'alert-status-closed';
      default:
        return 'alert-status-active';
    }
  };

  return (
    <div className="alert-container" onClick={() => onAlertClick?.(message, device, date, status, type)} style={{ cursor: 'pointer' }}>
      <CCol md={1}>
        <CIcon icon={getIcon(type)} size="lg" />
      </CCol>

      <CCol md={10}>
        <div className="alert-content mb-2">
          <strong>{message}</strong>
          <span>{date}</span>
        </div>

        <div className="alert-content">
          <span>{device}</span>
          <span className={`alert-status ${getStatus(status)}`}>{status}</span>
        </div>
      </CCol>
    </div>
  );
}