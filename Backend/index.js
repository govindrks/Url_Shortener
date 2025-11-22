import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import urlRouter from './routes/link.routes.js';
import bodyParser from 'body-parser';
import cors from 'cors';

const app = express()
app.use(bodyParser.json(
  
));
dotenv.config();

app.use(
    cors({
        origin: '*',
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        allowedHeaders: ['Content-Type', 'Authorization'],
    })
)

// To add form encoded data
app.use(express.urlencoded({ extended: true }));

app.use('/', urlRouter);
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World')
})

const PORT = process.env.PORT || 8080;

mongoose.connect(process.env.MONGO_URL)
//mongoose.connect('mongodb+srv://root:root@cluster0.eg20oli.mongodb.net/?appName=Cluster0')
    .then(() => {console.log('Connected to MongoDB')
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
    }
    )
    .catch(err => console.error('Could not connect to MongoDB...', err));

