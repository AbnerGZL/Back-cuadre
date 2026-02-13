export default (sequelize, DataTypes) => {
  const Floors = sequelize.define('floors', {
    id_floor: {
      type: DataTypes.INTEGER,
      primaryKey: true, 
      autoIncrement: true
    },
    id_place: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },    
    namefloor: {
      type: DataTypes.STRING(45),
      allowNull: false,
    },
    attendant: {
      type: DataTypes.STRING(45),
      allowNull: false,
    }
  }, {
    tableName: 'floors',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  });

  return Floors;
};