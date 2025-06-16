import express from 'express'
import notesRoutes from './routes/notesRoutes.js';
import cors from 'cors';
const app = express()
import dotenv from 'dotenv';
dotenv.config();
import connectDB from './config/db.js';
import ratelimiter from './middleware/ratelimiter.js';
app.use(cors());
//rate limiting middleware 
app.use(ratelimiter)
//middleware

app.use(express.json());

//End points

app.use('/api/notes', notesRoutes);




//Small optimiztaion without connecting directly to 5000 port

connectDB().then(() => {
    app.listen(process.env.PORT || 5000, () => {
        console.log(`Server started on Port ${process.env.PORT}`);
    })
});
