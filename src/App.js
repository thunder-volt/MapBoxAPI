import React, { useRef, useEffect, useState } from "react";
import mapboxgl from "!mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax
import "mapbox-gl/dist/mapbox-gl.css";
import MapboxDirections from "@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions";
import "@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions.css";

mapboxgl.accessToken =
  "pk.eyJ1IjoiaXNodTExNDQwNyIsImEiOiJjbDRsMjA2ZXkwbGlkM21wYmJ2ZHY4d2ptIn0.69XrjETlvyIOzI32hn-6ug";

export default function App() {
  const mapContainer = useRef(null);
  let map = useRef(null);
  const [lng, setLng] = useState(13.0827);
  const [lat, setLat] = useState(80.2707);
  const [zoom, setZoom] = useState(9);

  useEffect(() => {
  if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [lat, lng],
      zoom: zoom,
    });
     if (!map.current) return; // wait for map to initialize
     map.current.on("move", () => {
       setLng(map.current.getCenter().lng.toFixed(4));
       setLat(map.current.getCenter().lat.toFixed(4));
       setZoom(map.current.getZoom().toFixed(2));
     });
      const directions = new MapboxDirections({
        accessToken: mapboxgl.accessToken,
        unit: "metric",
        profile: "mapbox/driving",
      });
      map.current.addControl(directions, "top-left");
  },[]);


  return (
    <div>
      <div ref={mapContainer} className="map-container" />
    </div>
  );
}
