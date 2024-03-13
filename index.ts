import express, { Request, Response } from 'express';
import UserRouter from './src/routes/UserRoute';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import { Pool, PoolConfig } from 'pg';

dotenv.config();

const app = express();

const dbConfig: PoolConfig = {
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: parseInt(process.env.DB_PORT || '5432'),
    ssl: process.env.DB_SSL ? { ca: process.env.DB_SSL } : false,
};

const pgPool = new Pool(dbConfig);

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use(express.json());
app.use("/user", UserRouter);

// Test database connection
pgPool.connect((err, client, release) => {
    if (err) {
        console.error('Error acquiring client', err.stack);
        return;
    }
    console.log('Connected to database');
    release(); // Release the client
    console.log("Test Connection Closed")
});

// Root route
app.get('/', (req: Request, res: Response) => {
    res.send('Hello World!');
});

// Start server
const PORT =  3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

export default pgPool;
