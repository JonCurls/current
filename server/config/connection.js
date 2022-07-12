//mongoose import
const mongoose = require("mongoose");

//connection set up
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/current", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

//conenction export to server
module.exports = mongoose.connection;
