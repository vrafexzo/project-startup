const express = require('express');
const path = require('path');

const session = require('express-session');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();
const app = express();
// Set view engine dan path views
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'src/views'));

// Static assets
app.use(express.static(path.join(__dirname, 'public')));
app.use('/bootstrap', express.static(path.join(__dirname, 'node_modules/bootstrap/dist')));

// Routes
const homeRoutes = require('./src/routes/homeRoutes');
const orderRoutes = require('./src/routes/orderRoutes');
const apiRoutes = require('./src/routes/apiRoutes');
// ✅ RENDER dari folder 'pages'
app.get('/', (req, res) => {
  res.render('pages/index'); // <--- FIXED
});
app.use('/order', orderRoutes);
app.use('/api', apiRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
