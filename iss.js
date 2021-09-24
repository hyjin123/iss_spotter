/**
 * Makes a single API request to retrieve the user's IP address.
 * Input:
 *   - A callback (to pass back an error or the IP string)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The IP address as a string (null if error). Example: "162.245.144.188"
 */

const request = require('request');

// const fetchMyIP = function (callback) {
// };

// const fetchCoordsByIP = function (ip, callback) {
// };

// const fetchISSFlyOverTimes = function (coords, callback) {
// };

const nextISSTimesForMyLocation = function(callback) {
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
      const coordinates = { latitude, longitude };

      // use request to fetch coordinates using IP
      request(`https://iss-pass.herokuapp.com/json/?lat=${coordinates.latitude}&lon=${coordinates.longitude}`, (error, response, body) => {
        // if there is error, pass the callback function with the error
        if (error) {
          return callback(error, null);
        }

        // if non-200 status, assume server error
        if (response.statusCode !== 200) {
          const msg = `Status Code ${response.statusCode} when fetching ISS pass time. Response: ${body}`;
          callback(msg, null);
          return;
        }
        const passTimes = JSON.parse(body).response;
        callback(null, passTimes);
      });
    });
  });
};

module.exports = { nextISSTimesForMyLocation };