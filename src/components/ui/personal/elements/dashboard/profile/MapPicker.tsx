"use client";

import { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Fix for default marker icon not showing using CDN
const DefaultIcon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41],
});

L.Marker.prototype.options.icon = DefaultIcon;

interface MapPickerProps {
  value?: { lat: number; lng: number };
  onChange: (coords: { lat: number; lng: number }) => void;
}

function LocationMarker({ value, onChange }: MapPickerProps) {
  const [position, setPosition] = useState<L.LatLng | null>(
    value ? new L.LatLng(value.lat, value.lng) : null,
  );

  const map = useMapEvents({
    click(e) {
      setPosition(e.latlng);
      onChange({ lat: e.latlng.lat, lng: e.latlng.lng });
    },
  });

  // Fly to position if value changes externally
  useEffect(() => {
    if (value) {
      const newPos = new L.LatLng(value.lat, value.lng);
      setPosition(newPos);
      // Optional: fly to view
      map.flyTo(newPos, map.getZoom());
    }
  }, [value, map]);

  return position === null ? null : <Marker position={position}></Marker>;
}

export default function MapPicker({ value, onChange }: MapPickerProps) {
  // Default to Jakarta/Indonesia for initial view if no value
  const center = value ? [value.lat, value.lng] : [-6.2088, 106.8456];

  return (
    <div className="h-[300px] w-full rounded-md overflow-hidden border z-0">
      <MapContainer
        center={center as L.LatLngExpression}
        zoom={13}
        scrollWheelZoom={true}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <LocationMarker value={value} onChange={onChange} />
      </MapContainer>
    </div>
  );
}
