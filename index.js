const express = require('express');
const mongoose = require('mongoose');
const itemsRoute = require('./routes/router');
const cors = require('cors');

const app = express();

app.use(cors({
    origin: 'http://localhost:3000'
}));
app.use(express.json());
app.use('/api', itemsRoute);

const PORT = process.env.PORT || 3001;
const MONGO_URI = 'mongodb://localhost:27017/word-reminder';

mongoose.connect(MONGO_URI, {})
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch(error => {
        console.error('Connection error', error.message);
    });
