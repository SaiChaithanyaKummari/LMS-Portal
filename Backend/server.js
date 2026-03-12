const express = require("express");
const cors = require("cors");
require("dotenv").config();
const connectDB = require("./config/db");

const app = express();

app.use(cors());
app.use(express.json());

connectDB();

app.use("/api/courses", require("./routes/Course"));
app.use("/api/users", require("./routes/User"));
app.use("/api/contact", require("./routes/Contact"));
app.use("/api/enrollments", require("./routes/Enrollment"));

app.listen(process.env.PORT, () => {
    console.log("Server running on port " + process.env.PORT);
});