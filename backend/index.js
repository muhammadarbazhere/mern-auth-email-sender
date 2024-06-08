const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require("cookie-parser");
require('dotenv').config();

const path = require('path');

const router = require('./routes/UserRoutes');

const app = express();
const port = 3000;

app.use(cors({ credentials: true, origin: 'http://localhost:5173' })); // Ensure origin is correct
app.use(cookieParser());
app.use(express.json());

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/', router);

async function connectDB() {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log("Connection successful");
    } catch (error) {
        console.log("Connection error", error);
    }
}
connectDB();

app.listen(port, () => {
    console.log(`App listening on http://localhost:${port}`);
});
