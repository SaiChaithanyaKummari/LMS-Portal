const express = require("express");
const cors = require("cors");
require("dotenv").config({ override: false });
const connectDB = require("./config/db");

const app = express();

app.use(cors());
app.use(express.json());

connectDB();

app.use("/api/courses", require("./routes/Course"));
app.use("/api/users", require("./routes/User"));
app.use("/api/contact", require("./routes/Contact"));
app.use("/api/enrollments", require("./routes/Enrollment"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log("Server running on port " + PORT);
});