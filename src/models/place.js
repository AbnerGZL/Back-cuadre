export default (sequelize, DataTypes) => {
  const Place = sequelize.define('place', {
    id_place: {
      type: DataTypes.INTEGER,
      primaryKey: true, 
      autoIncrement: true
    },
    nameplace: {
      type: DataTypes.STRING(60),
      allowNull: false,
    },
    status: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    numfloors: {
      type: DataTypes.INTEGER,
      allowNull: false,
    }
  }, {
    tableName: 'place',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  });

  return Place;
};