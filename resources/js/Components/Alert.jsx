import CIcon from '@coreui/icons-react'; 
import {   
    cilFire,
    cilSmoke,
    cilCloudUpload
 } from '@coreui/icons'; 
import {  
    CCol,       
   
} from '@coreui/react'

export default function Alert({ alert, active,  onAlertClick }) {

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
    <div  
       className={`alert-container ${active ? 'alert-container-active' : ''}`} 
       onClick={() => onAlertClick?.(alert)} style={{ cursor: 'pointer' }}>
      <CCol sm={1} md={1}>
        <CIcon icon={getIcon(alert.type)} size="lg" />
      </CCol>

      <CCol sm={11} md={11}>
        <div className="alert-content mb-2">
          <strong>{alert.message}</strong>
          <span>{alert.created_at}</span>
        </div>

        <div className="alert-content">
          <span>{alert.deviceName}</span>
          <span className={`alert-status ${getStatus(alert.status)}`}>{alert.status}</span>
        </div>
      </CCol>
    </div>
  );
}