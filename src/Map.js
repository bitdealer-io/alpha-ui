import React from 'react';
import { Map as LeafletMap, TileLayer, Marker, Popup } from 'react-leaflet';

const Map = ({initialPosition, markers}) => {
  return (
    <LeafletMap style={{ height: "100vh" }} center={initialPosition} zoom={14}>
      <TileLayer
        attribution="&amp;copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {
        markers.map((marker, i) =>
          <Marker key={i} position={[marker.location.latitude, marker.location.longitude]}>
            <Popup>
              {marker.telegramUser} - €{marker.sellMinAmountEur}
            </Popup>
          </Marker>
        )
      }
    </LeafletMap>
  )
}


export default Map;