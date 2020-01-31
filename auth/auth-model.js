const db = require('../database/dbConfig.js');

module.exports = {
    add,
    findBy
  };

  function findBy(user) {
    return db('users')
      .where(user)
      .first();
  }

  function add(user) {
    return db('users')
      .insert(user)
      .then(res => {
        return { id: res[0] };
      });
  }