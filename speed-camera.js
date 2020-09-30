const { EventHubProducerClient } = require("@azure/event-hubs");

module.exports = class SpeedCamera {
    constructor(connString, eventHubName, deviceID, cameraName, positionLat, positionLong, speedLimitForLocation) {
        this.connString = connString;
        this.eventHubName = eventHubName;
        this.deviceID = deviceID;
        this.cameraName = cameraName;
        this.positionLat = positionLat;
        this.positionLong = positionLong;
        this.speedLimitForLocation = speedLimitForLocation;
    }

    async sendData() {
        const producerClient = new EventHubProducerClient(this.connString, this.eventHubName);
        
        setInterval(async () => {
            const cameraMessage = {
                'DeviceID': this.deviceID,
                'CameraID': this.cameraName,
                'Time': this.getTime(),
                'LocationLatitude': this.positionLat,
                'LocationLongitude': this.positionLong,
                'SpeedLimit': this.speedLimitForLocation,
                'VehicleRegistration': this.getRegistration(),
                'Speed': this.getSpeed()
            }
            const eventDataBatch = await producerClient.createBatch();
            eventDataBatch.tryAdd({ body: cameraMessage });
            console.log(cameraMessage);
            await producerClient.sendBatch(eventDataBatch);
        }, Math.floor(Math.random() * 10000));

    }

    getRegistration() {
        const chars = "ABCDEFGHJKLMNPRSTVWXYZ";
        const digits = "123456789";

        const char = chars.charAt(Math.floor(Math.random() * chars.length));
        const digit = digits.charAt(Math.floor(Math.random() * digits.length));;
        return `${char}${digit}`;
    }

    getSpeed() {
        const rndSpeed = Math.floor(Math.random() * 150);
        return rndSpeed;
    }

    getTime() {
        const currentDate = new Date();
        const second = currentDate.getSeconds();
        const minute = currentDate.getMinutes();
        const hour = currentDate.getHours();
        const date = currentDate.getDate();
        const month = currentDate.getMonth() + 1; //Be careful! January is 0 not 1
        const year = currentDate.getFullYear();

        const formattedDate = new Date(year, month, date, hour, minute, second);
        return formattedDate;
    }
}