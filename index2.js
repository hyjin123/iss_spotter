const { nextISSTimeForMyLocation } = require("./iss_promised");

const printPassTimes = function(passTimes) {
  for (let i = 0; i < passTimes.length; i++) {
    let date = new Date(0);
    date.setUTCSeconds(passTimes[0].risetime);
    console.log(`Next pass at ${date} for ${passTimes[i].duration} seconds!`);
  }
}

nextISSTimeForMyLocation()
  .then((passTimes) => {
    printPassTimes(passTimes);
  })
  .catch((error) => {
    console.log("It didn't work: ", error.message);
  })
