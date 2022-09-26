const express = require("express");
const cors = require("cors");
const cookieParser = require('cookie-parser');

const app = express();

// use cors
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
}));

// parse cookies
app.use(cookieParser());

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to my application." });
});

require("./routes/use-routes-accounts")(app);
require("./routes/use-routes-employees")(app);
require("./routes/use-routes-projects")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});