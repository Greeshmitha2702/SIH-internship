import express from "express";
import multer from "multer";
import cors from "cors";

const app = express();
app.use(cors());

// Storage setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname)
});

const upload = multer({ storage });

app.post("/upload-certificate", upload.single("certificate"), (req, res) => {
  try {
    res.json({ message: "Certificate uploaded successfully", file: req.file });
  } catch (err) {
    res.status(500).json({ message: "Upload failed" });
  }
});

app.listen(5000, () => console.log("Server running on port 5000"));
