import express from 'express';
import dotenv from 'dotenv';
import { testOracleConnection } from './oracle.js';

dotenv.config();

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    res.json({
        success: true,
        message: 'Enterprise API test server is running'
    });
});

app.get('/api/oracle/test', async (req, res) => {
    const result = await testOracleConnection();

    if (!result.success) {
        return res.status(500).json(result);
    }

    res.json(result);
});

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log(`Enterprise API test server running on http://localhost:${PORT}`);
});