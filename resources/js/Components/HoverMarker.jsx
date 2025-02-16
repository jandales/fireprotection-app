import React, { useState } from 'react';
import { Marker, InfoWindow } from '@react-google-maps/api';

const HoverMarker = ({ marker }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <>
      {/* Marker */}
      <Marker
        position={marker.position}
        icon={{
          url: 'https://maps.google.com/mapfiles/ms/icons/blue-dot.png',
          scaledSize: new window.google.maps.Size(40, 40)
        }}
        onMouseOver={() => setIsHovered(true)}
        onMouseOut={() => setIsHovered(false)}
      />

      {/* InfoWindow on hover */}
      {isHovered && (
        <InfoWindow position={marker.position} onCloseClick={() => setIsHovered(false)}>
          <div className="p-2 text-sm font-medium text-blue-700">
            📍 <strong>{marker.name}</strong> <br />
            🗺️ Lat: {marker.position.lat.toFixed(6)} <br />
            🌐 Lng: {marker.position.lng.toFixed(6)}
          </div>
        </InfoWindow>
      )}
    </>
  );
};

export default HoverMarker;
