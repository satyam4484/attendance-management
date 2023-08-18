const express = require('express');
const router = express.Router();
const multer = require('multer'); // For handling file uploads


const documentController = require('../Controllers/document.controller');

// Configure multer storage and file filter
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Uploads folder path
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + '-' + file.originalname);
    }
});


const upload = multer({ storage: storage });

// Define routes
router.route('/upload').post(upload.single('document'), documentController.uploadDocument);

module.exports = router;
