/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
  const pay_method = sequelize.define(
    "pay_method",
    {
      payno: {
        autoIncrement: true,
        type: DataTypes.INTEGER(11),
        allowNull: false,
        primaryKey: true,
      },
      payname: {
        type: DataTypes.STRING(100),
        allowNull: false,
        defaultValue: "0",
      },
      // memno: {
      //   type: DataTypes.INTEGER(11),
      //   allowNull: true,
      //   references: {
      //     model: {
      //       tableName: "member",
      //     },
      //     key: "memno",
      //   },
      //   unique: "FK_pay_method_member",
      // },
    },
    {
      sequelize,
      tableName: "pay_method",
    }
  );

  pay_method.associate = function (models) {
    pay_method.hasMany(models.account_log, {
      foreignKey: "payno",
    });
    pay_method.belongsTo(models.member, {
      foreignKey: "memno",
    });
  };

  return pay_method;
};
