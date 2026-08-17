import { useRef, useEffect } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import riskData from '../data/mockData.json';

export default function MapView() {
  const mapContainer = useRef(null);
  const map = useRef(null);

  useEffect(() => {
    mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN;
    
    if (map.current) return; 
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/dark-v11',
      center: [79.0821, 21.1458], 
      zoom: 13
    });

    map.current.on('load', () => {
      const geojson = {
        type: 'FeatureCollection',
        features: riskData.map(alert => ({
          type: 'Feature',
          geometry: { type: 'Point', coordinates: [alert.longitude, alert.latitude] },
          properties: { risk: alert.risk_score }
        }))
      };

      map.current.addSource('traffic-risks', { type: 'geojson', data: geojson });
      map.current.addLayer({
        id: 'risk-heat',
        type: 'heatmap',
        source: 'traffic-risks',
        paint: {
          'heatmap-weight': ['get', 'risk'],
          'heatmap-intensity': 1,
          'heatmap-color': [
            'interpolate', ['linear'], ['heatmap-density'],
            0, 'rgba(0,0,0,0)', 0.5, 'yellow', 1, 'red'
          ],
          'heatmap-radius': 40
        }
      });

      riskData.forEach(alert => {
        if (alert.status === 'unmanned' && alert.risk_score > 0.8) {
          new mapboxgl.Marker({ color: '#ef4444' }) 
            .setLngLat([alert.longitude, alert.latitude])
            .setPopup(new mapboxgl.Popup().setHTML(`<strong>${alert.location}</strong><br/>Requires Police`))
            .addTo(map.current);
        }
      });
    });
  }, []);

  return <div ref={mapContainer} className="w-full h-full rounded-l-3xl shadow-2xl" />;
}