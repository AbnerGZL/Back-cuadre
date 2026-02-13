import dotenv from 'dotenv';
dotenv.config();

export const verificarApiKey = (req, res, next) => {
  const authHeader = req.headers['authorization'];

  if (!authHeader || authHeader !== `Bearer ${process.env.API_KEY_SECRETA}`) {
    return res.status(403).json({ mensaje: 'Acceso denegado: API Key inválida' });
  }

  next();
};