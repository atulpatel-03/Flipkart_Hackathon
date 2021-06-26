const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const path = require('path');

const app = express();

connectDB();

app.use(cors());
app.use(express.json());

app.get('/',(req,res) =>  res.send('API Running'));

app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/post',require('./routes/api/post'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Serve started on port ${PORT}`));