const app = require("./src/app");
const https = require("https");
const fs = require("fs");
const connectDB = require("./src/config/db");
require("dotenv").config();

const PORT = process.env.PORT || 5000;

connectDB(); // Connect database


const sslOptions = {
  key: fs.readFileSync("ssl/key.pem"),
  cert: fs.readFileSync("ssl/cert.pem")
};

https.createServer(sslOptions, app).listen(PORT, () => {
  console.log(`🔐 HTTPS Server running on port ${PORT}`);
});
