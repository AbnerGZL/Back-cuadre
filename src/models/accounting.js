export default (sequelize, DataTypes) => {
  const Accounting = sequelize.define('accounting', {
    id_accounting: {
      type: DataTypes.INTEGER,
      primaryKey: true, 
      autoIncrement: true
    },
    id_cashbox: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    type: {
      type: DataTypes.STRING(45),
      allowNull: false,
    },
    time: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    value: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    status: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },    
  }, {
    tableName: 'accounting',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  });

  return Accounting;
};