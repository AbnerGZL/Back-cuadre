import helmet from 'helmet';
import morgan from 'morgan';
import express from 'express';
// import cors from 'cors';
import cookieParser from 'cookie-parser';

import movementsRoutes from './routes/movements.routes.js';
import cashboxRoutes from './routes/cashbox.routes.js';
// import profesorApiRoutes from './routes/profesor.routes.js';
// import { verificarApiKey } from './middleware/authorization.js';
const app = express();

// app.use(cookieParser());
// app.use(cors({
//   origin: ['http://localhost:3000',"https://sistema-alumno-front.onrender.com","https://sistema-alumno-production.up.railway.app"],
//   credentials: true,
//   methods: ['GET', 'POST'],
//   allowedHeaders: ['Content-Type', 'Authorization'],
//   domain: '.onrender.com'
// }));
// app.use(verificarApiKey);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/movements', movementsRoutes);
app.use('/cashbox', cashboxRoutes);

if (process.env.NODE_ENV === 'production') {
  app.use(helmet());
}
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
  console.log('Modo desarrollador activado');
} else {
  console.log('');
}

// app.use(cors({
//   origin: ["http://localhost:3001","http://example.com"],
//   methods: process.env.CORS_METHODS || 'GET',
// }));

export default app;