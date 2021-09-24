// iss_promised.js
const request = require('request-promise-native');

const fetchMyIP = function() {
  return request("https://api.ipify.org/?format=json");
};

const fetchCoordsByIP = function(body) {
  const ip = JSON.parse(body).ip;
  return request(`https://freegeoip.app/json/${ip}`);
};

const fetchISSFlyOverTimes = function(body) {
  const latitude = JSON.parse(body).latitude;
  const longitude = JSON.parse(body).longitude;
  const coordinates = { latitude, longitude };
  return request(`https://iss-pass.herokuapp.com/json/?lat=${coordinates.latitude}&lon=${coordinates.longitude}`)
};

const nextISSTimeForMyLocation = function() {
  return fetchMyIP()
  .then(fetchCoordsByIP)
  .then(fetchISSFlyOverTimes)
  .then((data) => {
    const { response } = JSON.parse(data);
    return response;
  });
};


module.exports = { nextISSTimeForMyLocation };