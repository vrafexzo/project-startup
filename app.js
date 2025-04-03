import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url'; // ES module alternative for __dirname
import session from 'express-session';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Setup __dirname in ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Set view engine dan path views
app.set('view engine', 'pug');
app.set('views', path.resolve(__dirname, 'src/views'));

// Middleware
app.use(express.static(path.resolve(__dirname, 'public')));
app.use('/bootstrap', express.static(path.resolve(__dirname, 'node_modules/bootstrap/dist')));

// Middleware untuk parsing request body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Import routes
import homeRoutes from './src/routes/homeRoutes.js';
import orderRoutes from './src/routes/orderRoutes.js';
import apiRoutes from './src/routes/apiRoutes.js';

// Routes
app.get('/', (req, res) => {
  res.render('pages/index'); // ✅ FIXED
});
app.use('/order', orderRoutes);
// app.use('/api', apiRoutes);

// Port & Server Start
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
