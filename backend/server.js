const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const seedAdmin = require('./utils/seedAdmin');
dotenv.config();
connectDB();
seedAdmin();
const app = express();

app.use(cors({
  origin: [
    'http://localhost:5173',
    ' https://bda-module-xi.vercel.app/'
  ],
  credentials: true
}));
app.use(express.json());

app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/leads', require('./routes/leadRoutes'));
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/followups', require('./routes/followUpRoutes'));
app.listen(process.env.PORT, () => {
  console.log('Server Running');
});