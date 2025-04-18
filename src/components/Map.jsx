
import React, {useState} from 'react'
import { MapContainer, TileLayer, Marker, Popup, Tooltip, Polyline } from 'react-leaflet'
import { Icon } from 'leaflet'
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import icon from "leaflet/dist/images/marker-icon.png";
import iconRetina from "leaflet/dist/images/marker-icon-2x.png";

import {coordinates} from "../coordinates/coordinate"
import car from "../images/car.png"
import start from "../images/start.png"
import end from "../images/end.png"
import { useEffect } from 'react';


const mainIcon = L.icon({
    iconUrl: icon,
    iconRetinaUrl: iconRetina,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
  });
L.Marker.prototype.options.icon = mainIcon;
const vehicleIcon = new L.Icon({
    iconUrl: car,
    iconSize: [32, 32],
  });
const startPoint = new L.Icon({
    iconUrl: start,
    iconSize: [32, 32],
})
const endPoint = new L.Icon({
    iconUrl: end,
    iconSize: [32, 32],
})
function Map(){
    const [currentPosition, setCurrentPosition] = useState(0); {/* To underStand */}
    const [isMoving, setIsMoving] = useState(true); 
    const [isPaused, setIsPaused] = useState(false); 
    const positions = coordinates.map((point) => [point.latitude,point.longitude,]); 

    const starting = positions[0];
    const ending = positions[positions.length - 1];

    useEffect(() => {
        let interval;
        if (isMoving && !isPaused) {
            interval = setInterval(() => {
                setCurrentPosition((prev) => {
                    if (prev >= positions.length - 1 ){
                        return prev
                    }
                    return prev + 1
                }, 200)
            })
        }
        return () => clearInterval(interval)
    }, [isMoving, isPaused, positions.length]);
    function pauseHandler(){
        setIsPaused(!isPaused)
        if (currentPosition >= positions.length-1){
            setIsMoving(false)
        }
    }
    function resetHandler(){
        setCurrentPosition(0)
        setIsMoving(true)
        setIsPaused(false)
    }
  return (
    <div style={{height: "100vh", width: "100%"}}>
        <MapContainer
            center={positions[0]}
            zoom={15}
            style={{height: "100vh", width: "100%"}}
        >
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"

            />
            <Marker position={positions[currentPosition]} icon={vehicleIcon}>
                <Popup permanent directions="top" offset={[0, -20]}> 
                    <div style={{textAlign: 'center', zIndex: 1000}}>
                        Lat: {positions[currentPosition][0].toFixed(5)}  {/* To underStand */}
                        <br />
                        Long: {positions[currentPosition][1].toFixed(5)}
                    </div>
                </Popup>
            </Marker>

            <Marker position={ending} icon={endPoint}>
                <Tooltip permanent direction='top' offset={[0, 50]}>  {/* To underStand ofset */}
                    <div style={{fontWeight: 'bold', color: 'green'}}>
                        Rishihood University</div> {/* To underStand */}
                </Tooltip>
            </Marker>

            <Marker position={starting} icon={startPoint}>
                <Tooltip permanent direction='bottom' offset={[0, 20]}>  {/* To underStand ofset */}
                    <div style={{fontWeight: 'bold', color: 'red'}}>
                        Western Air Command</div> {/* To underStand */}
                </Tooltip>
            </Marker>

            <Polyline positions={positions} color='blue' weight={4}>
                <Tooltip sticky>
                    Route from Rishihood To Western Air Command
                </Tooltip>
            </Polyline>

        </MapContainer>
        <div
            style={{
            position: "absolute",
            top: "20px",
            left: "80px",
            zIndex: 1000,
            background: "rgba(255, 255, 255, 0.9)",
            padding: "10px 15px",
            borderRadius: "8px",
            boxShadow: "0 2px 10px rgba(0,0,0,0.2)",
            maxWidth: "300px",
            }}
        >
            <h3 style={{ margin: "0 0 8px 0" }}>Vehicle Tracker Simulator</h3>
            <p style={{ margin: "4px 0" }}>
            <b>Route:</b> Rishihood To Western HQ AirForce
            </p>
            <p style={{ margin: "4px 0" }}>
            <b>Data:</b> Simulated GPS coordinates
            </p>
            <p style={{ margin: "4px 0" }}>
            <b>Interval:</b> 0.2 seconds
            </p>
        </div>
        <div style={{
        position: 'absolute',
        top: '20px',
        right: '10px',
        zIndex: 1000,
        display: 'flex',
        gap: '8px',
        background: 'rgba(255, 255, 255, 0.9)',
        padding: '8px',
        borderRadius: '8px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.2)'
      }}>
        <button 
          onClick={pauseHandler}
          aria-label={isPaused ? 'Resume' : 'Pause'}
        >
          
          <span style={{ marginLeft: '6px' }}>
            {isPaused ? 'Resume' : 'Pause'}
          </span>
        </button>
        <button 
          onClick={resetHandler}
         
          aria-label="Reset"
        >
           
          <span style={{ marginLeft: '6px' }}>Reset</span>
        </button>
        </div>
    </div>
  )
}

export default Map;
