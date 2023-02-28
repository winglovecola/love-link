const router = require('express').Router();
const { User } = require('../../models');

// CREATE new user
router.post('/', async (req, res) => {
  try {
    const userData = await User.create({
      username: req.body.username,
      email: req.body.user_email,
      password: req.body.user_ps,
      firstname: req.body.user_firstname,
      lastname: req.body.user_lastname,
      type: req.body.user_type,
      created_time: Date.now(),
      updated_time: Date.now(),
    });
    const userDataPlain = userData.get({ plain: true })
    req.session.save(() => {
      req.session.loggedIn = true;
      req.session.userid = userDataPlain.id;
      req.session.username = req.body.username;
      req.session.user_firstname = req.body.user_firstname;
      req.session.user_lastname = req.body.user_lastname;


      res.status(200).json(userData);
    });
  } catch (err) {
    console.log(err);

    res.status(500).json(err);
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const userData = await User.findOne({
      where: {
        email: req.body.user_email,
      },
    });
    
    if (!userData) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password. Please try again!' });
      return;
    }

    const userDataPlain = userData.get({ plain: true })
    console.log ("req.session.userid:", userDataPlain);

    const validPassword = await userData.checkPassword(req.body.user_ps);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password. Please try again!' });
      return;
    }
    
    req.session.save(() => {
      req.session.loggedIn = true;
      req.session.userid = userDataPlain.id;
      req.session.username = userDataPlain.username;
      req.session.user_firstname = userDataPlain.firstname;
      req.session.user_lastname = userDataPlain.lastname;

      
      res
        .status(200)
        .json({ user: userDataPlain, message: 'You are now logged in!' });
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Logout
router.post('/logout', (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
