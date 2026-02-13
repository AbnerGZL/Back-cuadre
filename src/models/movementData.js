export default (sequelize, DataTypes) => {
  const MovementData = sequelize.define('movement_data', {
    id_mdata: {
      type: DataTypes.INTEGER,
      primaryKey: true, 
      autoIncrement: true
    },
    id_user: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    id_movement: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    id_agents: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    id_floor: {
      type: DataTypes.INTEGER,
      allowNull: false,
    }
  }, {
    tableName: 'movement_data',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  });

  return MovementData;
};