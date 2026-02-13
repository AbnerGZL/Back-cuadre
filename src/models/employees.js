export default (sequelize, DataTypes) => {
  const Employees = sequelize.define('employees', {
    id_employee: {
      type: DataTypes.INTEGER,
      primaryKey: true, 
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING(70),
      allowNull: false,
    },
    dni: {
      type: DataTypes.STRING(45),
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING(45),
      allowNull: false
    }
  }, {
    tableName: 'employees',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  });

  return Employees;
};