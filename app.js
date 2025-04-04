import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url'; // ES module alternative for __dirname
import session from 'express-session';
import sequelizeStore from 'connect-session-sequelize';
import dotenv from 'dotenv';
import db from './src/config/database.js';

const sessionStore = sequelizeStore(session.Store);
const store = new sessionStore({
  db: db,
});
// (async () => {
//    await db.sync({ alter: true });
// })();

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

app.use(homeRoutes)
app.use(orderRoutes)
app.use(apiRoutes)

// Routes
// app.get('/', (req, res) => {
//   res.render('pages/index'); // ✅ FIXED
// });
// app.use('/order', orderRoutes);
// app.use('/api', apiRoutes);

// store.sync();
app.listen(3000, () => {
  console.log(`Server running at http://localhost:${3000}`);
});
