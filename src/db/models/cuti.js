"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Cuti extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of DataTypes lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Cuti.hasMany(models.Approval, {
        foreignKey: "cutiId",
        as: "cuti",
      });
      Cuti.belongsTo(models.User, {
        foreignKey: "userId",
        as: "user",
      });
    }
  }
  Cuti.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      tgl_mulai: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      tgl_selesai: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      alasan: {
        type: DataTypes.TEXT,
      },
      status: {
        type: DataTypes.ENUM("pending", "disetujui", "ditolak"),
        defaultValue: "pending",
      },
      userId: {
        type: DataTypes.INTEGER,
        references: {
          model: "user",
          key: "id",
        },
      },
    },
    {
      sequelize,
      modelName: "Cuti",
      tableName: "cuti",
    },
  );
  return Cuti;
};
