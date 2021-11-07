const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
require('dotenv').config()

const app = express();

const PORT = process.env.PORT || 4000;

const swaggerUi = require("swagger-ui-express");
const docs = require('./doc/swagger.json');

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(docs));


// connect with database


//const MONGO_URI = `mongodb+srv://kimngan2612:kimngan2612@web1.cmomi.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`; 

const MONGO_URI = "mongodb+srv://kimngan2612:kimngan2612@web1.cmomi.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
mongoose.connect(MONGO_URI, () => {
  console.log("Connected to DB");
});

app.use(cors());

// Configuring body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Hello World, from express");
});

require("./app/routes")(app);

app.listen(PORT, () =>
  console.log(
    `Hello world app listening on port ${PORT} with url http://localhost:${PORT}`
  )
);
