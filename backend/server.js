import express from "express";
import mongoose from "mongoose";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json()); // parse JSON data

// ✅ Connect to MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/mydb", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// ✅ Define Schema & Model
const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
});
const User = mongoose.model("User", UserSchema);

// ✅ API Routes
// Create User
app.post("/users", async (req, res) => {
  const user = new User(req.body);
  await user.save();
  res.json(user);
});

// Get All Users
app.get("/users", async (req, res) => {
  const users = await User.find();
  res.json(users);
});

// Run Server
app.listen(5000, () => {
  console.log("🚀 Backend running on http://localhost:5000");
});
