require("dotenv").config();

const express = require("express");
const app = express();

const mongoose = require("mongoose");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const profile = require("./routes/profileRoute");
const contact = require("./routes/ContactRoute");
const contactinfo = require("./routes/contactinfo");
const subscriberrs = require("./routes/subscriberrrs");
const managebooking = require("./routes/managebooking");
const carbrand = require("./routes/carbrand");
const caradd = require("./routes/caradd");
const testimonaials = require("./routes/testimonaials");

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", authRoutes);
app.use("/api", profile);
app.use("/api", contact);
app.use("/api", contactinfo);
app.use("/api", subscriberrs);
app.use("/api", caradd);
app.use("/api", carbrand);
app.use("/api", managebooking);
app.use("/api", testimonaials);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

app.listen(2340, () => {
  console.log("Server running on port 2340");
});