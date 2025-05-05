import { DataTypes } from 'sequelize';
import sequelize from '../database/db.js'; 

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
  tableName: 'users', 
  timestamps: false   
});

User.hasMany(Contato, {
  foreignKey: 'userId', 
  as: 'contatos'        
});

export default User;
