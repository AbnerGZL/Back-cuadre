import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

import defineMovements from './movements.js';
import defineEmployees from './employees.js';
import defineRoles from './roles.js';
import defineUsers from './users.js';
import defineAgents from './agents.js';
import definePlace from './place.js';
import defineCashbox from './cashbox.js';
import defineAccounting from './accounting.js';
import defineMovementData from './movementData.js';


const models = {
  Movements: defineMovements(sequelize, DataTypes),
  Roles: defineRoles(sequelize, DataTypes),
  Employees: defineEmployees(sequelize, DataTypes),
  Users: defineUsers(sequelize, DataTypes),
  Agents: defineAgents(sequelize, DataTypes),
  Place: definePlace(sequelize, DataTypes),
  Cashbox: defineCashbox(sequelize, DataTypes),
  MovementData: defineMovementData(sequelize, DataTypes),
  Accounting: defineAccounting(sequelize, DataTypes),
};

Object.values(models).forEach(model => {
  if (model.associate) {
    model.associate(models);
  }
});

models.Roles.hasMany(models.Users, { foreignKey: 'id_role' });
models.Users.belongsTo(models.Roles, { foreignKey: 'id_role' });

models.Employees.hasOne(models.Users, { foreignKey: 'id_user' });
models.Users.belongsTo(models.Employees, { foreignKey: 'id_user' });

models.Place.hasMany(models.Cashbox, { foreignKey: 'id_place' });
models.Cashbox.belongsTo(models.Place, { foreignKey: 'id_place' });

models.Cashbox.hasMany(models.Accounting, { foreignKey: 'id_cashbox' });
models.Accounting.belongsTo(models.Cashbox, { foreignKey: 'id_cashbox' });

models.Cashbox.hasMany(models.Movements, { foreignKey: 'id_cashbox' });
models.Movements.belongsTo(models.Cashbox, { foreignKey: 'id_cashbox' });

models.Agents.hasMany(models.MovementData, { foreignKey: 'id_agents' });
models.MovementData.belongsTo(models.Agents, { foreignKey: 'id_agents' });

models.Movements.hasOne(models.MovementData, { foreignKey: 'id_movement' });
models.MovementData.belongsTo(models.Movements, { foreignKey: 'id_movement' });

models.Users.hasMany(models.MovementData, { foreignKey: 'id_user' });
models.MovementData.belongsTo(models.Users, { foreignKey: 'id_user' });

export {
  sequelize,
  models,
  // Si quieres exportar cada modelo individualmente:
  // ...models
};
