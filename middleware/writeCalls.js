const fs = require("fs");

const writeToFile = () => {
  const countFile = fs.readFileSync("DB/calls.json");
  const countObj = JSON.parse(countFile);
  const newCount = countObj.count ? countObj.count + 1 : 1;
  const stream = fs.createWriteStream("DB/calls.json");
  stream.write(
    JSON.stringify({
      count: newCount,
    })
  );
  stream.end();
};

module.exports = writeToFile;