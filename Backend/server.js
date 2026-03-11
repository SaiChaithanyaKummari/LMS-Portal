const express = require("express");
const cors = require("cors");
require("dotenv").config();
const connectDB = require("./config/db");

const app = express();

app.use(cors());
app.use(express.json());

connectDB();

app.use("/api/courses", require("./Routes/Course"));
app.use("/api/users", require("./Routes/User"));
app.use("/api/contact", require("./Routes/Contact"));
app.use("/api/enrollments", require("./Routes/Enrollment"));

app.listen(process.env.PORT, () => {
    console.log("Server running on port " + process.env.PORT);
});