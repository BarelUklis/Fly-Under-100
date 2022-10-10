const express = require('express');
const app = express();
const writeToFile = require('./middleware/writeCalls');
const getFlights = require("./flightScraper");
app.use(express.static("public"));
app.get("/api/flights", (req, res) => {
  const priceRange = req?.query?.priceRange;
  getFlights(priceRange).then((flights) => {
    res.send(flights);
    writeToFile();
  });
});
//* SERVER FUNCTIONS *// 
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(
    `SCRAPER IS RUNNING ON PORT ${port}`
  );
});