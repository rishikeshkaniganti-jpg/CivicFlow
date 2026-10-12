import { MapContainer, TileLayer, Popup, CircleMarker } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import riskData from '../mockdata.json';

export default function MapView() {
  return (
    <div className="w-full h-full rounded-l-3xl shadow-2xl overflow-hidden bg-[#0a0a0a]">
      <MapContainer 
        center={[21.1458, 79.0821]} 
        zoom={13} 
        style={{ height: '100vh', width: '100%' }}
      >
        {/* Completely FREE Dark Mode Map Tiles */}
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          attribution='&copy; OpenStreetMap & CartoDB'
        />

        {/* Loop through mock data and draw risk zones */}
        {riskData.map(alert => (
          <CircleMarker
            key={alert.id}
            center={[alert.latitude, alert.longitude]}
            radius={alert.risk_score * 30}
            pathOptions={{ 
              color: alert.risk_score > 0.8 ? '#ef4444' : '#eab308', 
              fillColor: alert.risk_score > 0.8 ? '#ef4444' : '#eab308', 
              fillOpacity: 0.4,
              weight: 0
            }}
          >
            <Popup className="text-black">
              <strong>{alert.location}</strong><br/>
              Risk Score: {alert.risk_score}
            </Popup>
          </CircleMarker>
        ))}
      </MapContainer>
    </div>
  );
}