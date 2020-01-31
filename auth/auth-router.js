const router = require('express').Router();
const bcrypt = require('bcryptjs');
const Database = require('./auth-model.js');


router.post('/register', (req, res) => {
  const user = req.body;
  const hash = bcrypt.hashSync(user.password, 12);
  user.password = hash;

  Database.add(user)
  .then(user => {
    res.status(201).json(user)
  })
  .catch(error => {
    res.status(400).json(error)
  })

});

router.post('/login', (req, res) => {
  let { username, password } = req.body

  Database.findBy({ username })
  .then(user => {
    if(user && bcrypt.compareSync(password, user.password)) {
      res.status(200).json({ token: token })
    } else {
      res.status(400).json({ error: 'Error'})
    }
  })
  .catch(error => {
    res.status(500).json(error)
  })
});

module.exports = router;
