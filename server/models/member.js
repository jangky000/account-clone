/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
  const member = sequelize.define(
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
        type: DataTypes.STRING(64),
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
  member.associate = function (models) {
    member.hasMany(models.pay_method, {
      foreignKey: "memno",
    });
  };
  return member;
};
