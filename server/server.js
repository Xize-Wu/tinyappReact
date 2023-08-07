const PORT = 8080;
import 'dotenv/config'
import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import sessionVerify from './middlware/sessionVerify.js';

// routes
import sessionRoutes from './routes/sessions.js';
import urlsRoutes from './routes/urls.js';

const app = express();

const corsOptions = {
	origin: process.env.ORIGIN,
	optionsSuccessStatus: 200,
  credentials: true,
  ContentType: 'json'
};

// middleware 
app.use(morgan('dev'));
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

// routes
app.use(sessionVerify);

app.use('/sessions', sessionRoutes);
app.use('/urls', urlsRoutes);

app.listen(PORT, console.log(`Server is listening on PORT: `, PORT));