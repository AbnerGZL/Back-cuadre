// import { Sequelize } from 'sequelize';

// const sequelize = new Sequelize('admin_notas', 'root', '', {
//   host: 'localhost',
//   dialect: 'postgre',
//   logging: false,
// });

// export default sequelize;

import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
dotenv.config();

let sequelize;

if (process.env.DB_DIALECT === 'postgres') {
  sequelize = new Sequelize(
    process.env.DB_NAME_POSTGRE,
    process.env.DB_USER_POSTGRE,
    process.env.DB_PASSWORD_POSTGRE,
    {
      host: process.env.DB_HOST_POSTGRE,
      dialect: process.env.DB_DIALECT,
      logging: process.env.DB_LOG === 'true',
      timezone: '-05:00',
      dialectOptions: {
        ssl: {
          require: true,
          rejectUnauthorized: false,
        }
      } 
    }
  );
} else if (process.env.DB_DIALECT === 'mysql') {
  sequelize = new Sequelize(
    process.env.DB_NAME_MYSQL,
    process.env.DB_USER_MYSQL,
    process.env.DB_PASSWORD_MYSQL,
    {
      host: process.env.DB_HOST_MYSQL,
      dialect: process.env.DB_DIALECT,
      logging: process.env.DB_LOG === 'true',
      timezone: '-05:00',
    }
  );
} else {
  throw new Error('DB_DIALECT no soportado o no definido');
}

export default sequelize;
