export default (sequelize, DataTypes) => {
  const Movements = sequelize.define('movements', {
    id_movement: {
      type: DataTypes.INTEGER,
      primaryKey: true, 
      autoIncrement: true
    },
    id_cashbox: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
    },    
    // type: "ENTRY" | "EXIT"
    type: {
      type: DataTypes.ENUM('ENTRY', 'EXIT'),
      allowNull: false,
    },
    quantity: {
      type: DataTypes.DECIMAL(20,2),
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    comition: {
      type: DataTypes.DECIMAL(10,2),
      defaultValue: 0
    },
    date: {
      type: DataTypes.DATE,
      allowNull: true
    },
    status: {
      type: DataTypes.INTEGER,
      allowNull: true
    }    
  }, {
    tableName: 'movements',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  });

  return Movements;
};