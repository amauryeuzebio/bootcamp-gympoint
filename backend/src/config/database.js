require('dotenv').config();

module.exports = {
  dialect: 'postgres',
  host: process.env.DB_HOST,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  define: {
    timestamps: true, // data de criação e alteraçao nas tabelas
    underscored: true, // retira formato camelcase para formato usuario_teste nas tabelas
    underscoredAll: true, // retira formato camelcase para formato usuario_teste nas colunas
  },
};
