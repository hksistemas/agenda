
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class Agenda extends Model {}
Agenda.init(
  {
    nome: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    telefone: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: 'Agenda',
    timestamps: false,
  }
);

module.exports = Agenda;
