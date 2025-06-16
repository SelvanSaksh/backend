import { Injectable } from "@nestjs/common";
import { stat } from "fs";

@Injectable()
export class GeoServices {
    async addressSeprator(fullAddress) {
        // const fullAddress = "B433, Pocket 1, Sector 14 Dwarka, Dwarka, New Delhi, Delhi, 110078, India";
        // Split the address by commas and trim each part

        // console.log(pincode ? pincode[0] : "No pincode found");
        // const parts = fullAddress.split(",").map(part => part.trim());
        // const result = {
        //     address: parts.slice(0, parts.length - 4).join(", "), // Everything except last 4
        //     city: parts[parts.length - 4],
        //     state: parts[parts.length - 3],
        //     pincode: parts[parts.length - 2],
        //     country: parts[parts.length - 1],
        // };

        console.log(fullAddress)
        const parts = fullAddress.split(',').map(p => p.trim());
        const country = parts.pop();

        let state = "";
        let pincode = "";
        let city = "";
        let address = "";

        if (parts.length >= 2 && /^\d{6}$/.test(parts[parts.length - 1])) {
            pincode = parts.pop();           // pincode
            state = parts.pop();             // state
            city = parts.pop();              // city
            address = parts.join(', ');
        } else if (parts.length >= 2) {
            // Assume Format B with state + pincode merged
            const stateAndPin = parts.pop();
            const match = stateAndPin.match(/^(.*)\s(\d{6})$/);

            if (match) {
                state = match[1];
                pincode = match[2];
            } else {
                state = stateAndPin;
            }

            city = parts.pop();              // city
            address = parts.join(', ');
        }
        console.log(state, pincode, country, city, address)


        return {
            address,
            city,
            state,
            pincode,
            country,
        };



    }

    async getLoaction(lat: number, long: number) {

        try {
            const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${long}&key=AIzaSyDwdLC9Vp90oYz9oXNnz9SboEvuttTRBmQ`;
            const response = await fetch(url, {
                headers: {
                    "Content-Type": "application/json",
                },
            });

            const data = await response.json();
            const formatted_address = data.results[0].formatted_address;
            if (data.status === "OK" && data.results.length > 0) {
                return { address: formatted_address, groupaddress: await this.addressSeprator(formatted_address) };
            } else {
                throw new Error("No address found for the given coordinates.");
            }

        } catch (error) {
            console.error('Geocoding error:', error.message);
            throw new Error('Failed to get location');
        }
    }

    async getDistance(originLat: number, originLong: number, destLat: number, destLong: number) {
        try {
            const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${originLat},${originLong}&destinations=${destLat},${destLong}&key=AIzaSyDwdLC9Vp90oYz9oXNnz9SboEvuttTRBmQ`
            const responseDist = await fetch(url)
            const distanceData = await responseDist.json()
            const formattedDistance = distanceData.rows[0].elements[0].distance.text;
            return formattedDistance
        } catch (error) {
            console.error("getDistance Error", error)
        }
    }

}