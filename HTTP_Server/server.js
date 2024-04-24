const express = require('express');
const multer  = require('multer');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Set up multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});
const upload = multer({ storage: storage });

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Serve static files from the 'uploads' directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Endpoint for uploading files
app.post('/upload', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).send('No files were uploaded.');
  }
  res.send('File uploaded successfully.');
});

// Endpoint for downloading files
app.get('/download/:filename', (req, res) => {
  const filename = req.params.filename;
  res.download(path.join(__dirname, 'uploads', filename), filename, (err) => {
    if (err) {
      res.status(404).send('File not found.');
    }
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://139.10.242.81:${PORT}`);
});
