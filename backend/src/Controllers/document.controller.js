const Document = require('../models/document.model');
const path = require('path'); // Import the path module

// Handle document upload
const uploadDocument = async (req, res) => {

    try {
        const { title } = req.body;
        let fileUrl = '';

        // const fileUrl = path.join('http://localhost:8000/',req.file.path); // Assuming you are using multer for file uploads

        if (req.file) {
            fileUrl = req.file.path; // Assuming you are using multer for file uploads
        } else {
            fileUrl = path.join(__dirname, '../../uploads/default.jpg'); // Replace with your default photo URL
        }

        const document = new Document({ title, fileUrl });
        await document.save();

        res.status(201).json({ success: true, message: 'Document uploaded successfully', document });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Error uploading document' });
    }
};

module.exports = {
    uploadDocument
};
