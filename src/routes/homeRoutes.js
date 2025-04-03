import express from 'express';
const router = express.Router();
import {
    getHomepage, 
    getAbout, 
    getContact
} from '../controllers/homeController.js';

// Homepage route
router.get('/', getHomepage);
// About page route
router.get('/about', getAbout);
// Contact page route
router.get('/contact', getContact);

export default router;