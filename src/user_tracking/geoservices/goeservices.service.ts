import { Injectable } from "@nestjs/common";

@Injectable()
export class GeoServices {
    async addressSeprator(fullAddress) {
        // const fullAddress = "B433, Pocket 1, Sector 14 Dwarka, Dwarka, New Delhi, Delhi, 110078, India";
        // Split the address by commas and trim each part
        const parts = fullAddress.split(",").map(part => part.trim());
        const result = {
            address: parts.slice(0, parts.length - 4).join(", "), // Everything except last 4
            city: parts[parts.length - 4],
            state: parts[parts.length - 3],
            pincode: parts[parts.length - 2],
            country: parts[parts.length - 1],
        };
        return result
     
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
                return { address:formatted_address , groupaddress: await this.addressSeprator(formatted_address) };
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