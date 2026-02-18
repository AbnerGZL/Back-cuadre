import helmet from 'helmet';
import morgan from 'morgan';
import express from 'express';
import cors from 'cors';
// import cookieParser from 'cookie-parser';

import movementsRoutes from './routes/movements.routes.js';
import cashboxRoutes from './routes/cashbox.routes.js';
import accountingRoutes from './routes/accounting.routes.js';
import agentsRoutes from './routes/agents.routes.js';
import descriptionsRoutes from './routes/descriptions.routes.js';
// import { verificarApiKey } from './middleware/authorization.js';
const app = express();

// app.use(cookieParser());
app.use(cors({
  origin: ['http://localhost:2000'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  // domain: '.onrender.com'
}));
// app.use(verificarApiKey);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use((req, res, next) => {
  console.log("======================================================================================");
  console.log("📥 REQUEST");
  console.log("Method:", req.method);
  console.log("URL:", req.originalUrl);
  console.log("Body:", req.body);
  console.log("Params:", req.params);
  console.log("Query:", req.query);

  const oldSend = res.send;

  res.send = function (data) {
    console.log("↗️ RESPONSE");
    console.log("Status:", res.statusCode);
    console.log("Body:", data);

    return oldSend.apply(res, arguments);
  };

  next();
});


app.use('/api/movements', movementsRoutes);
app.use('/api/cashbox', cashboxRoutes);
app.use('/api/accounting', accountingRoutes);
app.use('/api/agents', agentsRoutes);
app.use('/api/descriptions', descriptionsRoutes);

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