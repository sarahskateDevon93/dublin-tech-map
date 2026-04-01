import React, { useState, useMemo } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import MarkerClusterGroup from 'react-leaflet-markercluster';
import L from 'leaflet';

import 'leaflet/dist/leaflet.css';
import 'leaflet.markercluster/dist/MarkerCluster.css';
import 'leaflet.markercluster/dist/MarkerCluster.Default.css';

// Fix per le icone standard di Leaflet
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import companiesData from './companies.json';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});
L.Marker.prototype.options.icon = DefaultIcon;

// Funzione per ricentrare la mappa
function ChangeView({ center }) {
  const map = useMap();
  map.setView(center, 13);
  return null;
}

function App() {
  const [selectedHub, setSelectedHub] = useState('All');
  const [mapCenter, setMapCenter] = useState([53.3498, -6.2603]);
  // STATO PER LA SIDEBAR (Aperta di default)
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // Genera la lista degli Hub
  const hubs = useMemo(() => {
    return ['All', ...new Set(companiesData.map(c => c.hub))];
  }, []);

  const filteredCompanies = selectedHub === 'All' 
    ? companiesData 
    : companiesData.filter(c => c.hub === selectedHub);

  const handleHubClick = (hubName) => {
    setSelectedHub(hubName);
    const firstComp = companiesData.find(c => c.hub === hubName);
    if (firstComp) setMapCenter([firstComp.lat, firstComp.lng]);
    // Opzionale: chiudi la sidebar su mobile dopo il click
    // if (window.innerWidth < 768) setIsSidebarOpen(false);
  };

  // Costanti per il layout (Rimpicciolita a 280px)
  const sidebarWidth = '280px';

  return (
    <div style={{ display: 'flex', height: '100vh', width: '100vw', fontFamily: 'sans-serif', overflow: 'hidden', position: 'relative' }}>
      
      {/* TASTO PER APRIRE/CHIUDERE (Floating Button) */}
      <button 
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        style={{
          position: 'absolute',
          top: '10px',
          left: isSidebarOpen ? `calc(${sidebarWidth} + 10px)` : '10px',
          zIndex: 1100, // Sopra la mappa e la sidebar
          backgroundColor: '#0f172a',
          color: '#38bdf8',
          border: '2px solid #38bdf8',
          borderRadius: '50%',
          width: '45px',
          height: '45px',
          cursor: 'pointer',
          fontSize: '1.2rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'left 0.3s ease, background-color 0.2s',
          boxShadow: '0 2px 10px rgba(0,0,0,0.3)'
        }}
        title={isSidebarOpen ? "Close Menu" : "Open Menu"}
      >
        {isSidebarOpen ? '✕' : '☰'}
      </button>

      {/* SIDEBAR (Collassabile) */}
      <div style={{ 
        width: sidebarWidth, 
        backgroundColor: '#0f172a', 
        color: '#f8fafc', 
        padding: isSidebarOpen ? '20px' : '0', 
        overflowY: 'auto', 
        zIndex: 1050,
        position: 'absolute', // Sovrapposta alla mappa per un effetto migliore
        top: 0,
        left: 0,
        bottom: 0,
        transition: 'transform 0.3s ease, padding 0.3s ease',
        transform: isSidebarOpen ? 'translateX(0)' : `translateX(-${sidebarWidth})`,
        boxShadow: isSidebarOpen ? '5px 0 15px rgba(0,0,0,0.3)' : 'none',
        display: 'flex',
        flexDirection: 'column'
      }}>
        {/* Header - Tradotto in Inglese */}
        <div style={{ marginBottom: '20px', opacity: isSidebarOpen ? 1 : 0, transition: 'opacity 0.2s' }}>
          <h2 style={{ color: '#38bdf8', margin: '0 0 5px 0', fontSize: '1.4rem' }}>Dublin Career Hubs 🇮🇪</h2>
          <p style={{ fontSize: '0.8rem', opacity: 0.8, margin: 0 }}>Select a district to explore companies:</p>
        </div>
        
        {/* Lista Bottoni - Tradotto in Inglese */}
        <div style={{ flex: 1, opacity: isSidebarOpen ? 1 : 0, transition: 'opacity 0.2s' }}>
          {hubs.map(hub => (
            <button
              key={hub}
              onClick={() => handleHubClick(hub)}
              style={{
                display: 'flex', alignItems: 'center', width: '100%', 
                padding: '12px 15px', marginBottom: '8px',
                backgroundColor: selectedHub === hub ? '#38bdf8' : '#1e293b',
                color: selectedHub === hub ? '#0f172a' : 'white',
                border: 'none', borderRadius: '8px', cursor: 'pointer', textAlign: 'left',
                fontWeight: 'bold', transition: '0.2s', fontSize: '0.9rem'
              }}
            >
              <span style={{ marginRight: '10px', fontSize: '1.1rem' }}>📍</span>
              {/* Gestione speciale per 'All' */}
              {hub === 'All' ? 'Show All Districts' : hub}
            </button>
          ))}
        </div>

        {/* Footer info (Opzionale) */}
        <div style={{ fontSize: '0.75rem', color: '#64748b', textAlign: 'center', marginTop: '20px', opacity: isSidebarOpen ? 1 : 0 }}>
          {companiesData.length} companies mapped
        </div>
      </div>

      {/* MAPPA (Occupa tutto lo spazio) */}
      <div style={{ 
        flex: 1, 
        width: '100%', 
        height: '100%', 
        position: 'relative',
        transition: 'margin-left 0.3s ease',
        marginLeft: 0 // La mappa sta sotto la sidebar
      }}>
        <MapContainer center={mapCenter} zoom={13} style={{ height: '100%', width: '100%' }}>
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution='&copy; OpenStreetMap' />
          <ChangeView center={mapCenter} />
          
          <MarkerClusterGroup>
            {filteredCompanies.map((company, idx) => (
              <Marker key={idx} position={[company.lat, company.lng]}>
                <Popup>
                  {/* POPUP - Tradotto in Inglese */}
                  <div style={{ width: '240px', padding: '5px', color: '#1e293b' }}>
                    <h3 style={{ margin: '0 0 8px 0', borderBottom: '1px solid #e2e8f0', paddingBottom: '5px' }}>{company.name}</h3>
                    <div style={{ fontSize: '0.8rem', color: '#64748b', marginBottom: '12px', lineHeight: '1.4' }}>
                      <strong>District:</strong> {company.hub} <br/>
                      <strong>Sector:</strong> {company.category}
                    </div>
                    {company.description && (
                      <p style={{ fontSize: '0.85rem', margin: '0 0 15px 0', fontStyle: 'italic', color: '#475569' }}>
                        "{company.description}"
                      </p>
                    )}
                    <a 
                      href={company.careerUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      style={{
                        display: 'block', backgroundColor: '#10b981', color: 'white',
                        padding: '12px', textAlign: 'center', textDecoration: 'none',
                        borderRadius: '6px', fontWeight: 'bold', fontSize: '0.9rem',
                        boxShadow: '0 2px 4px rgba(0,0,0,0.1)', transition: 'background 0.2s'
                      }}
                      onMouseOver={(e) => e.target.style.backgroundColor = '#059669'}
                      onMouseOut={(e) => e.target.style.backgroundColor = '#10b981'}
                    >
                      VIEW CAREER PAGE 🔗
                    </a>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MarkerClusterGroup>
        </MapContainer>
      </div>
    </div>
  );
}

export default App;