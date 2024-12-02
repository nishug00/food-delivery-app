import React from 'react';
import styles from './location.module.css';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import locationPin from '../../../assets/locationPin.png';

function Location() {
    const position = [51.505, -0.09];

    return (
        <div className={styles.locationWrapper}>
            <MapContainer center={position} zoom={13} style={{ height: '400px', width: '100%' }}>
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                <Marker position={position}>
                    <Popup>A pretty popup. <br /> Easily customizable.</Popup>
                </Marker>
            </MapContainer>

            <div className={styles.overlayContainer}>
                <div className={styles.rectangleContainer}>
                    <div className={styles.rectangleText}>McDonald’s South London</div>
                    <div className={styles.circleContainer}>
                        <img src={locationPin} alt="Location Pin" className={styles.circleImage} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Location;
