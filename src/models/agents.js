export default (sequelize, DataTypes) => {
  const Agents = sequelize.define('agents', {
    id_agents: {
      type: DataTypes.INTEGER,
      primaryKey: true, 
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING(70),
      allowNull: false,
    },
    status: {
      type: DataTypes.INTEGER,
      allowNull: false,
    }
  }, {
    tableName: 'agents',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  });

  return Agents;
};