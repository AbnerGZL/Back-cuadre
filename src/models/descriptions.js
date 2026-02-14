export default (sequelize, DataTypes) => {
  const Descriptions = sequelize.define('descriptions', {
    id_description: {
      type: DataTypes.INTEGER,
      primaryKey: true, 
      autoIncrement: true
    },
    id_place: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    text: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },    
    link: {
      type: DataTypes.INTEGER,
      allowNull: false,
    }
  }, {
    tableName: 'descriptions',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  });

  return Descriptions;
};