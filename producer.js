const SpeedCamera = require('./speed-camera');

const connectionString = 'connection string';
const eventHubNames = 'traffic';
const numCameras = 30;
const LatitudeNorth = -7.2406;
const LatitudeSouth = -7.3128;
const LongitudeEast = 112.7929;
const LongitudeWest = 112.7012;

for (let cameraNum = 1; cameraNum <= numCameras; cameraNum++) {

    const latRange = LatitudeNorth - LatitudeSouth;
    const positionLat = Math.random() * latRange + LatitudeSouth;
    
    const longRange = LongitudeEast - LongitudeWest;
    const positionLong = Math.random() * longRange + LongitudeWest;

    const cameraName = `Camera${cameraNum}`;

    const speedCam = new SpeedCamera(connectionString,eventHubNames,cameraNum,cameraName,positionLat,positionLong,80);
    speedCam.sendData();
    cameraNum++;
}