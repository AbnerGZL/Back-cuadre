import dotenv from'dotenv';
import app from './app.js';
import { sequelize } from './models/index.js';

dotenv.config();

const PORT = process.env.PORT || 4000;
// Configuración de la conexión a la base de datos
sequelize.authenticate()
    .then(() => {
        console.log(`Conexión a ${process.env.DB_DIALECT} establecida`);
        return sequelize.sync({ alter: false, force: false });
    })
    .then(() => {
        app.listen(PORT, () => {
            console.log(`API corriendo en PORT:${PORT}`);
        });
    })
    .catch(err => {
        console.error('Error al conectar a la base de datos:', err);
    });
