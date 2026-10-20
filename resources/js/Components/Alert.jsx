import CIcon from '@coreui/icons-react';
import { cilFire, cilSmoke, cilCloudUpload } from '@coreui/icons';

const statusClass = {
  active: 'status-badge-critical',
  dispatched: 'status-badge-warning',
  closed: 'status-badge-resolved',
};

export default function Alert({ alert, active, onAlertClick }) {
  const icon = alert.type === 'Smoke'
    ? cilSmoke
    : alert.type === 'Temperature'
      ? cilCloudUpload
      : cilFire;
  const location = alert.deviceLocation
    || alert.device?.location
    || alert.location
    || 'Location unavailable';
  const deviceName = alert.deviceName || alert.device?.name || 'Device unavailable';
  const deviceId = alert.macAddress || alert.device?.macAddress;
  const status = alert.status || 'unknown';

  return (
    <button
      type="button"
      className={`recent-alert-item ${active ? 'recent-alert-item-selected' : ''}`}
      onClick={() => onAlertClick?.(alert)}
      aria-label={`View ${alert.message || alert.type || 'fire alert'} at ${location}`}
    >
      <span className={`recent-alert-icon ${status === 'active' ? 'recent-alert-icon-critical' : ''}`}>
        <CIcon icon={icon} aria-hidden="true" />
      </span>
      <span className="recent-alert-content">
        <span className="recent-alert-title">{alert.message || alert.type || 'Fire alert'}</span>
        <span className="recent-alert-location">{location}</span>
        <span className="recent-alert-meta">
          <span>{deviceName}{deviceId ? ` · ${deviceId}` : ''}</span>
          <span className={`status-badge ${statusClass[status] || 'status-badge-neutral'}`}>{status}</span>
        </span>
        <span className="recent-alert-time">{alert.created_at || 'Time unavailable'}</span>
      </span>
    </button>
  );
}
