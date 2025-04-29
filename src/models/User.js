import { DataTypes } from 'sequelize';
import sequelize from '../database/db.js'; // caminho para sua instância do Sequelize

const User = sequelize.define('User', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isEmail: true
    },
    set(value) {
      this.setDataValue('email', value.trim().toLowerCase());
    }
  }
}, {
  tableName: 'users', // Nome da tabela no banco
  timestamps: false   // se quiser evitar createdAt e updatedAt
});

export default User;
