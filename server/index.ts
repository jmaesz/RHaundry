import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import emailRouter from './routes/email.js';

// Get directory path for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables from root .env file
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const app = express();
const PORT = process.env.EMAIL_SERVER_PORT || 3001;

// Middleware
app.use(cors()); // Allow frontend to communicate with backend
app.use(express.json());

// Routes
app.use('/api/email', emailRouter);

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', service: 'RHaundry Email Service' });
});

// Start server
app.listen(PORT, () => {
  console.log(`📧 Email server running on http://localhost:${PORT}`);
  console.log(`✉️ Email credentials configured: ${!!process.env.GMAIL_USER}`);
});
