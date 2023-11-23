
require('dotenv').config()
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
  process.env.DATA_BASE_NAME, 
  process.env.DATA_BASE_USER, 
  process.env.DATA_BASE_PASSWORD, 
  {
  host: process.env.DATA_BASE_HOST,
  dialect: 'mysql',
})

try {
  sequelize.authenticate()
  console.log('Banco de dados conectado com sucesso')
} catch (error) {
  console.error('Não foi possível conectar:', error)
}

module.exports = sequelize;

