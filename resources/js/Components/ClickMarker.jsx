import React, { useState } from 'react';
import { Marker, InfoWindow } from '@react-google-maps/api';

const ClickMarker = ({ marker }) => {
  const [showInfo, setShowInfo] = useState(false);

  const handleMarkerClick = () => setShowInfo(!showInfo);

  return (
    <>
      {/* Marker */}
      <Marker
        position={marker.position}
        icon={{
          url: marker.icon ? marker.icon : 'https://maps.google.com/mapfiles/ms/icons/red-dot.png',
          scaledSize: new window.google.maps.Size(40, 40),
        }}
        onClick={handleMarkerClick}
      />

      {/* InfoWindow on click */}
      {showInfo && (
        <InfoWindow 
          position={marker.position} 
          onCloseClick={() => setShowInfo(false)}
        >
          <div className="p-2 text-sm font-medium text-blue-700 text-black-a">
            👤 <strong>{marker.name}</strong> <br /> 
            📞 <strong>{marker.contact}</strong> <br />            
            📍 <strong>{marker.location}</strong> <br />
            🗺️ Lat: {marker.position.lat.toFixed(6)} <br />
            🌐 Lng: {marker.position.lng.toFixed(6)}
          </div>
        </InfoWindow>
      )}
    </>
  );
};

export default ClickMarker;
