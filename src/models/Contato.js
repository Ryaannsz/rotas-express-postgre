import { DataTypes } from 'sequelize';
import sequelize from '../database/db.js';
import User from './User.js'; 

const Contato = sequelize.define('Contato', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  telefone: {
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
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User, 
      key: 'id'    
    }
  }
}, {
  tableName: 'contatos', 
  timestamps: false       
});


Contato.belongsTo(User, {
  foreignKey: 'userId',
  as: 'user' 
});

export default Contato;
