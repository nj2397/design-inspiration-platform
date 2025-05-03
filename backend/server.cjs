require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { PrismaClient } = require('@prisma/client');
const inspirationAPI = require('./routes/api.routes.js');
const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors({
    origin: '*', // Replace with your frontend URL
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
    maxAge: 3600,
}))

new PrismaClient().$connect()
    .then(() => {
        console.log('Connected to the database successfully!');
    })
    .catch((err) => {
        console.error('Error connecting to the database:', err);
    })


app.use("/api", inspirationAPI);

app.listen(process.env.PORT, () => {
    console.log('Server is running on port', process.env.PORT);
})