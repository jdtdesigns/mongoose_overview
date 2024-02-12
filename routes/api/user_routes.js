const router = require('express').Router();

const { User } = require('../../models/');
const { handleRouteError } = require('../helpers');

// Create a user
router.post('/users', async (req, res) => {
  try {
    const user = await User.create(req.body);

    res.json(user);
  } catch (err) {
    handleRouteError(err, res);
  }
});

module.exports = router;