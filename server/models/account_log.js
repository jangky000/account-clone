/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
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
      cateno: {
        type: DataTypes.INTEGER(11),
        allowNull: true,
        references: {
          model: {
            tableName: "category",
          },
          key: "cateno",
        },
        unique: "FK_transaction_category",
      },
      payno: {
        type: DataTypes.INTEGER(11),
        allowNull: true,
        references: {
          model: {
            tableName: "pay_method",
          },
          key: "payno",
        },
        unique: "FK_transaction_pay_method",
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
};
