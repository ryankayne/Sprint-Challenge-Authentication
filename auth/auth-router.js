const router = require('express').Router();
const bcrypt = require('bcryptjs');
const Database = require('./auth-model.js');
const jwt = require('jsonwebtoken');


router.post('/register', (req, res) => {
  let user = req.body;
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
      const token = getToken(user.username)
      res.status(200).json({ token: token })
    } else {
      res.status(400).json({ error: 'Invalild Credentials!'})
    }
  })
  .catch(error => {
    res.status(500).json(error)
  })
});

function getToken(username) {
  const payload = {
    username
  };

  const secret = process.env.JWT_SECRET || "TEST SECRET";

  const options = {
    expiresIn: '1d'
  };

  return jwt.sign(payload, secret, options)

}

module.exports = router;
