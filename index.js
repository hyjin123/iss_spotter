const { nextISSTimesForMyLocation } = require('./iss');

// fetchMyIP((error, ip) => {
//   if (error) {
//     console.log("It didn't work!" , error);
//     return;
//   }
//   console.log('It worked! Returned IP:' , ip);
// });

// fetchCoordsByIP('135.12.178.128', (error, data) => {
//   if (error) {
//     console.log("It didn't work!", error);
//     return;
//   }
//   console.log(data);
// });

// fetchISSFlyOverTimes({latitude: 45.5154, longitude: -73.5822}, (error, data) => {
//   if (error) {
//     console.log("It didn't work!", error);
//     return;
//   }
//   console.log(data);
// });

nextISSTimesForMyLocation((error, passTimes) => {
  if (error) {
    return console.log("It didn't work!", error);
  }
  // success, print out the deets!
  for (let i = 0; i < passTimes.length; i++) {
    let date = new Date(0);
    date.setUTCSeconds(passTimes[0].risetime);
    console.log(`Next pass at ${date} for ${passTimes[i].duration} seconds!`);
  }
});