/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
  const category = sequelize.define(
    "category",
    {
      cateno: {
        autoIncrement: true,
        type: DataTypes.INTEGER(11),
        allowNull: false,
        primaryKey: true,
      },
      catename: {
        type: DataTypes.STRING(100),
        allowNull: false,
        defaultValue: "0",
      },
      iemode: {
        type: DataTypes.CHAR(1),
        allowNull: false,
        defaultValue: "0",
      },
    },
    {
      sequelize,
      tableName: "category",
    }
  );

  category.associate = function (models) {
    category.hasMany(models.account_log, {
      foreignKey: "cateno",
    });
  };

  return category;
};
