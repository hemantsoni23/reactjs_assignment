const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
const morgan = require('morgan');
const dotenv = require('dotenv');
const app = express();

dotenv.config();

// Connect to the database
connectDB();

app.use(express.json());
app.use(morgan("dev"));

// Allow access from any subdomain ending with .vercel.app
const allowedOriginPattern = /^https:\/\/.*\.vercel.app$/;

const corsOptions = {
  origin: (origin, callback) => {
    if (allowedOriginPattern.test(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ["Content-Type", "Authorization", "Access-Control-Allow-Methods", "Access-Control-Request-Headers"],
  credentials: true,
  enablePreflight: true
};

// Use CORS middleware with the configured options
app.use(cors(corsOptions));

// Handle preflight requests explicitly
app.options('*', cors(corsOptions));

app.all('', (req, res) => {
  res.header('Access-Control-Allow-Origin', req.headers.origin || '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.header('Access-Control-Allow-Credentials', 'true');
  res.status(200).end();
});

// Placeholder route
app.get('/', (req, res) => {
  res.send('Server is running');
});

// Routes
app.use('/api/user', require('./routes/usersRoutes'));
app.use('/api/product', require('./routes/productRoutes'));

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
