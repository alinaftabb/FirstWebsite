const express = require('express');
const connectDB = require('./config/db');
var logger = require('morgan');
const app = express();

//Connect Database
connectDB();
app.use(logger('dev'));
// app.use(logger('combined'))
app.use(express.json({ extended: false }));

app.get('/', (req, res) => res.send(`API Running..`));

//Define routes
app.use('/api/users', require('./routes/api/users'));
app.use('/api/profile', require('./routes/api/profile'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/posts', require('./routes/api/posts'));

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => console.log(`Server started on port: ${PORT}`));
