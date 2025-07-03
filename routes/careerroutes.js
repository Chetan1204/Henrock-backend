const express = require('express');
const multer = require('multer');
const path = require('path');
const { createCareer, getCareers } = require('../controllers/careercontroller');

const router = express.Router();

// Multer config
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) =>
    cb(null, Date.now() + '-' + file.originalname.replace(/\s+/g, '_')),
});

const upload = multer({ storage });

// Routes
router.post('/', upload.single('cv'), createCareer);
router.get('/', getCareers);

module.exports = router;
