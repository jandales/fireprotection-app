import React, { useEffect, useState } from 'react';
import { Link, router, usePage } from '@inertiajs/react';
import { useJsApiLoader, GoogleMap, Circle, Marker } from '@react-google-maps/api';
import {
  cilBell,
  cilCheckCircle,
  cilDevices,
  cilFire,
  cilPeople,
} from '@coreui/icons';
import CIcon from '@coreui/icons-react';
import { CButton } from '@coreui/react';
import { useDispatch } from 'react-redux';
import DefaultLayout from '@/Layouts/DefaultLayout';
import FireStationIcon from '@/assets/images/fire-station.png';
import MapDirectionsRenderer from '@/Components/DirectionsRenderer';
import RecentAlerts from '@/Components/RecentAlerts.jsx';
import ViewAlert from '@/Components/ViewAlert';
import CurrenctAlert from '@/Components/CurrenctAlert';
import echo from '../../../js/echo.js';

const StatCard = ({ icon, label, value, tone }) => (
  <article className="dashboard-stat-card">
    <span className={`dashboard-stat-icon dashboard-stat-icon-${tone}`} aria-hidden="true">
      <CIcon icon={icon} />
    </span>
    <div>
      <p className="dashboard-stat-label">{label}</p>
      <p className="dashboard-stat-value">{value ?? 0}</p>
    </div>
  </article>
);

const Dashboard = ({ notifications, stats }) => {
  const dispatch = useDispatch();
  const station = usePage().props.station;
  const [activeAlerts, setActiveAlerts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [alertData, setAlertData] = useState(null);
  const [destination, setDestination] = useState(null);
  const [zoom, setZoom] = useState(13);

  const origin = {
    id: 1,
    name: station?.name,
    position: {
      lat: Number(station?.latitude),
      lng: Number(station?.longitude),
    },
    location: station?.address,
    icon: FireStationIcon,
  };

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
  });

  useEffect(() => {
    const channel = echo.channel('notification-channel').listen('.NotificationEvent', (event) => {
      router.get('/dashboard', {}, { preserveScroll: true, preserveState: true });

      const notification = event.notification;
      const latitude = Number(notification?.device?.latitude);
      const longitude = Number(notification?.device?.longitude);
      if (Number.isFinite(latitude) && Number.isFinite(longitude)) {
        setDestination({
          id: notification.id,
          location: notification?.device?.location,
          position: { lat: latitude, lng: longitude },
        });
      }
      setAlertData(notification);
      setIsModalOpen(true);
      dispatch({ type: 'set', isPlaying: true });
    });

    return () => {
      echo.leaveChannel('notification-channel');
    };
  }, [dispatch]);

  useEffect(() => {
    const alerts = (notifications?.data ?? [])
      .filter((notification) => ['active', 'dispatched'].includes(notification.status))
      .filter((notification) => {
        const latitude = Number(notification?.device?.latitude);
        const longitude = Number(notification?.device?.longitude);
        return Number.isFinite(latitude) && Number.isFinite(longitude);
      });
    const uniqueLocations = new Set();

    setActiveAlerts(alerts.filter((notification) => {
      const location = notification?.device?.location ?? notification.id;
      if (uniqueLocations.has(location)) return false;
      uniqueLocations.add(location);
      return true;
    }).map((notification) => ({
      id: notification.id,
      location: notification?.device?.location,
      position: {
        lat: Number(notification.device.latitude),
        lng: Number(notification.device.longitude),
      },
      status: notification.status,
    })));
  }, [notifications]);

  const clearMapSelection = () => {
    setDestination(null);
    setAlertData(null);
    setZoom((currentZoom) => currentZoom === 15 ? 14 : 15);
  };

  const handleAlertClick = (notification) => {
    const latitude = Number(notification?.device?.latitude);
    const longitude = Number(notification?.device?.longitude);
    setAlertData(notification);
    if (Number.isFinite(latitude) && Number.isFinite(longitude)) {
      setDestination({
        id: notification.id,
        location: notification?.device?.location,
        position: { lat: latitude, lng: longitude },
        status: notification.status,
      });
      setActiveAlerts([]);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleSetDirections = (item) => {
    setDestination(item);
    setAlertData(notifications.data.find((alert) => alert.id === item.id) ?? null);
    setActiveAlerts([]);
  };

  const handleUpdateStatus = (notification) => {
    setAlertData(notification);
    const latitude = Number(notification?.device?.latitude);
    const longitude = Number(notification?.device?.longitude);
    if (Number.isFinite(latitude) && Number.isFinite(longitude)) {
      setDestination({
        id: notification.id,
        location: notification?.device?.location,
        position: { lat: latitude, lng: longitude },
        status: notification.status,
      });
    }
  };

  return (
    <DefaultLayout>
      <main className="dashboard-page">
        <header className="page-heading dashboard-heading">
          <div>
            <h1>Emergency Dashboard</h1>
            <p>Monitor fire alerts, devices, and emergency activity.</p>
          </div>
        </header>

        <section className="dashboard-stat-grid" aria-label="Station overview">
          <StatCard icon={cilFire} label="Active Fire Alerts" value={stats?.activeAlerts} tone="critical" />
          <StatCard icon={cilDevices} label="Total Devices" value={stats?.deviceCount} tone="blue" />
          <StatCard icon={cilPeople} label="Registered Users" value={stats?.userCount} tone="slate" />
          <StatCard icon={cilCheckCircle} label="Resolved Alerts" value={stats?.resolvedAlerts} tone="green" />
        </section>

        <section className="dashboard-main-grid">
          <article className="dashboard-panel map-panel">
            <div className="dashboard-panel-heading">
              <div>
                <h2>Incident Map</h2>
                <p>Live incident locations and station response routes</p>
              </div>
              {destination && (
                <CButton color="secondary" variant="outline" size="sm" onClick={clearMapSelection}>
                  Clear selection
                </CButton>
              )}
            </div>
            <div className="map-legend" aria-label="Map legend">
              <span><i className="map-legend-dot map-legend-active" /> Active incident</span>
              <span><i className="map-legend-dot map-legend-dispatched" /> Dispatched</span>
              <span><i className="map-legend-station" /> Fire station</span>
            </div>
            {isLoaded ? (
              <GoogleMap
                center={origin.position}
                zoom={zoom}
                mapContainerClassName="incident-map-canvas"
                options={{
                  zoomControl: true,
                  mapTypeControl: false,
                  streetViewControl: false,
                  fullscreenControl: true,
                }}
              >
                {Number.isFinite(origin.position.lat) && Number.isFinite(origin.position.lng) && (
                  <Marker
                    position={origin.position}
                    icon={{
                      url: FireStationIcon,
                      scaledSize: new window.google.maps.Size(36, 36),
                      anchor: new window.google.maps.Point(18, 36),
                    }}
                    title={station?.name || 'Fire station'}
                  />
                )}
                {activeAlerts.map((item) => (
                  <Circle
                    key={item.id}
                    center={item.position}
                    radius={180}
                    options={{
                      strokeColor: item.status === 'active' ? '#dc2626' : '#d97706',
                      strokeOpacity: 0.8,
                      strokeWeight: 2,
                      fillColor: item.status === 'active' ? '#dc2626' : '#d97706',
                      fillOpacity: 0.2,
                    }}
                    onClick={() => handleSetDirections(item)}
                  />
                ))}
                {destination?.position && (
                  <>
                    <MapDirectionsRenderer origin={origin.position} destination={destination} isLoaded={isLoaded} />
                    <Circle
                      center={destination.position}
                      radius={180}
                      options={{
                        strokeColor: destination.status === 'closed' ? '#16a34a' : '#dc2626',
                        strokeOpacity: 0.9,
                        strokeWeight: 2,
                        fillColor: destination.status === 'closed' ? '#16a34a' : '#dc2626',
                        fillOpacity: 0.22,
                      }}
                    />
                  </>
                )}
              </GoogleMap>
            ) : (
              <div className="map-loading" role="status">Loading incident map…</div>
            )}
          </article>

          <aside className="dashboard-side-column">
            {alertData && (
              <CurrenctAlert notification={alertData} onUpdatedStatus={handleUpdateStatus} />
            )}
            <RecentAlerts
              alerts={notifications}
              id={destination?.id}
              handleAlertClick={handleAlertClick}
            />
            <Link href={route('notifications')} className="dashboard-all-alerts">
              <CIcon icon={cilBell} aria-hidden="true" />
              View all notifications
            </Link>
          </aside>
        </section>
      </main>
      {alertData && (
        <ViewAlert
          visible={isModalOpen}
          notification={alertData}
          onUpdatedStatus={handleUpdateStatus}
          onClose={() => {
            setIsModalOpen(false);
            dispatch({ type: 'set', isPlaying: false });
          }}
        />
      )}
    </DefaultLayout>
  );
};

export default Dashboard;
