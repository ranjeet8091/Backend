const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3000;

// const ehujf=multer({dest:""})
app.get("/",(req,res)=>{
    res.sendFile(path.join(__dirname,"form.html"));
})

// Set up storage engine for multer
const storage = multer.diskStorage({

  destination: (req, file, cb) => {
    if (file.mimetype === 'image/jpeg') {
      fs.mkdirSync('uploads/JPG', { recursive: true });
      cb(null, 'uploads/JPG');
    } else {
      fs.mkdirSync('uploads/OTHERS', { recursive: true });
      cb(null, 'uploads/OTHERS');
    }
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage, limits: { fileSize: 2000000 } });

app.post('/upload', upload.single('image'), (req, res) => {
  if (req.file) {
    res.send('Image uploaded successfully!');
  } else {
    res.send('Error uploading image!');
  }
});

app.listen(port, () => {
  console.log(`Image upload app listening at http://localhost:${port}`);
});