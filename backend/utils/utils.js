const { randomUUID } = require("crypto");

const generateGameCode = () => {
  return randomUUID().replace("-", "").replace("_", "").toString().slice(0, 5);
};

module.exports = { generateGameCode };
