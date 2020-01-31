const db = require('../database/dbConfig.js');

module.exports = {
    add,
    findBy
  };

  function findBy(id) {
    return db('users')
      .where(id)
      .first();
  }

  function add(user) {
    return db('users')
      .insert(user)
      .then(res => {
        return { id: res[0] };
      });
  }