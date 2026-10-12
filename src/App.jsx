import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'

function App() {
  const center = [51.505, -0.09] // replace with your city's lat/lng

  return (
    <div style={{ width: '100%', height: '100vh' }}>
      <MapContainer center={center} zoom={13} style={{ width: '100%', height: '100%' }}>
        <TileLayer
          attribution='&copy; OpenStreetMap contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={center}>
          <Popup>Traffic node example</Popup>
        </Marker>
      </MapContainer>
    </div>
  )
}

export default App
