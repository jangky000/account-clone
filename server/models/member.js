/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    "member",
    {
      memno: {
        autoIncrement: true,
        type: DataTypes.INTEGER(11),
        allowNull: false,
        primaryKey: true,
      },
      uid: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: "id",
      },
      pw: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      mname: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: "member",
    }
  );
};
