import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import MarkerClusterGroup from 'react-leaflet-markercluster';

// CSS Fondamentali
import 'leaflet/dist/leaflet.css';
import 'leaflet.markercluster/dist/MarkerCluster.css';
import 'leaflet.markercluster/dist/MarkerCluster.Default.css';

// Import del JSON (Punto singolo ./ perché sono nella stessa cartella src)
import companiesData from './companies.json';

function App() {
  return (
    <div style={{ height: '100vh', width: '100%' }}>
      <MapContainer center={[53.3498, -6.2603]} zoom={13} style={{ height: '100%', width: '100%' }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; OpenStreetMap contributors'
        />
        <MarkerClusterGroup>
          {companiesData.map((company, index) => (
            <Marker key={index} position={[company.lat, company.lng]}>
              <Popup>
                <strong>{company.name}</strong><br/>
                {company.description}
              </Popup>
            </Marker>
          ))}
        </MarkerClusterGroup>
      </MapContainer>
    </div>
  );
}

export default App;