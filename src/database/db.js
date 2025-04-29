import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();
//teste
const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  protocol: 'postgres',
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false, // necessário para a Neon
    },
  },
});

export default sequelize;