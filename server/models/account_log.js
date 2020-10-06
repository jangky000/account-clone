/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
  const account_log = sequelize.define(
    "account_log",
    {
      logno: {
        autoIncrement: true,
        type: DataTypes.INTEGER(11),
        allowNull: false,
        primaryKey: true,
      },
      iemode: {
        type: DataTypes.CHAR(1),
        allowNull: false,
      },
      memno: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        references: {
          model: {
            tableName: "member",
          },
          key: "memno",
        },
        unique: "FK_account_log_member",
      },
      money: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
      },
      memo: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      rdate: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: "account_log",
    }
  );

  account_log.associate = function (models) {
    account_log.belongsTo(models.category, {
      foreignKey: "cateno",
    });
    account_log.belongsTo(models.pay_method, {
      foreignKey: "payno",
    });
  };

  return account_log;
};
