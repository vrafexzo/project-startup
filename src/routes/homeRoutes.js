const express = require('express');
const router = express.Router();
const homeController = require('../controllers/homeController');

// Homepage route
router.get('/', homeController.getHomepage);
// About page route
router.get('/about', homeController.getAbout);

// Contact page route
router.get('/contact', homeController.getContact);

module.exports = router;