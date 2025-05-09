import User from './User.js';
import Contato from './Contato.js';

const RelationTables = () => {
  User.hasMany(Contato, {
    foreignKey: 'userId',
    as: 'contatos',
  });

  Contato.belongsTo(User, {
    foreignKey: 'userId',
    as: 'user',
  });
};

export default RelationTables;