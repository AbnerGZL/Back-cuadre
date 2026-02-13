export default (sequelize, DataTypes) => {
  const Cashbox = sequelize.define('cashbox', {
    id_cashbox: {
      type: DataTypes.INTEGER,
      primaryKey: true, 
      autoIncrement: true
    },
    id_place: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },    
    status: {
      type: DataTypes.STRING(45),
      allowNull: false,
    },
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    value: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    }
  }, {
    tableName: 'cashbox',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  });

  return Cashbox;
};