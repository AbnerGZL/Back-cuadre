export default (sequelize, DataTypes) => {
  const Roles = sequelize.define('roles', {
    id_role: {
      type: DataTypes.INTEGER,
      primaryKey: true, 
      autoIncrement: true
    },
    namerole: {
      type: DataTypes.STRING(90),
      allowNull: false,
    },
    value: {
      type: DataTypes.INTEGER,
      allowNull: false,
    }
  }, {
    tableName: 'roles',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  });

  return Roles;
};