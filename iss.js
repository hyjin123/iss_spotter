/**
 * Makes a single API request to retrieve the user's IP address.
 * Input:
 *   - A callback (to pass back an error or the IP string)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The IP address as a string (null if error). Example: "162.245.144.188"
 */

const request = require('request');

const fetchMyIP = function(callback) {
  // use request to fetch IP address from JSON API
  request("https://api.ipify.org/?format=json", (error, response, body) => {
    // if there is error, pass the callback function with the error
    if (error) {
      return callback(error, null);
    }

    // if non-200 status, assume server error
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }

    //parse the string and callback the data
    const ip = JSON.parse(body).ip;
    callback(null, ip);
  });
};

const fetchCoordsByIP = function(ip, callback) {
  // use request to fetch coordinates using IP
  request(`https://freegeoip.app/json/${ip}`, (error, response, body) => {
    // if there is error, pass the callback function with the error
    if (error) {
      return callback(error, null);
    }

    // if non-200 status, assume server error
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching coordinates. Response: ${body}`;
      callback(msg, null);
      return;
    }

    //input the latitude and longitude into an object
    const latitude = JSON.parse(body).latitude;
    const longitude = JSON.parse(body).longitude;
    const coordinates = {latitude, longitude};
    callback(null, coordinates);
  });
};

module.exports = { fetchMyIP, fetchCoordsByIP };