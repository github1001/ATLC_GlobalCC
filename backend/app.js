const bodyParser = require("body-parser");
const express = require("express");
const cors = require("cors");
const fs = require("fs");
const filePath = "./db.json";

const eventRoutes = require("./routes/events");
const authRoutes = require("./routes/auth");
const bcrypt = require("bcryptjs");

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use(bodyParser.json());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PATCH,DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type,Authorization");
  next();
});

app.use(authRoutes);

app.use("/events", eventRoutes);

app.use((error, req, res, next) => {
  const status = error.status || 500;
  const message = error.message || "Something went wrong.";
  res.status(status).json({ message: message });
});

app.post("/dashboard", async (req, res) => {
  try {
    const { name, email, password, selectedPlan } = req.body;

    // Read user data from the file
    // const { users } = await JSON.parse(fs.readFileSync(filePath));
    const data = await JSON.parse(fs.readFileSync(filePath));

    // Find the index of the user with the specified email
    const index = data.users.findIndex((user) => user.email === email);

    if (index !== -1) {
      // Hash the password
      const hashedPw = await bcrypt.hash(password, 12);

      // Update user details
      data.users[index].name = name;
      data.users[index].password = hashedPw;
      data.users[index].selectedPlan = selectedPlan;

      // Write updated user data back to the file
      fs.writeFileSync(filePath, JSON.stringify(data, null, 2));

      const userdata = {
        name: data.users[index].name,
        selectedPlan: data.users[index].selectedPlan,
      };
      // Send response to the client
      res.status(200).json({
        success: true,
        user: userdata,
        message: "Profile data saved successfully",
      });
    } else {
      // If user not found, send 404 response
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    // If any error occurs, send 500 response
    console.error("Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.post("/getme", async (req, res) => {
  try {
    const { email } = req.body;

    const data = await JSON.parse(fs.readFileSync(filePath));

    const index = data.users.findIndex((user) => user.email === email);

    if (index !== -1) {
      const userData = {
        name: data.users[index].name,
        selectedPlan: data.users[index].selectedPlan,
      };

      // Send response to the client
      res.status(200).json({
        success: true,
        user: userData,
        message: "Profile get successfully",
      });
    } else {
      // If user not found, send 404 response
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    // If any error occurs, send 500 response
    console.error("Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.listen(8080);
