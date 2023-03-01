const router = require('express').Router();
const { User } = require('../../models');
const multer = require('multer'); // middleware for handling uploaded files through forms
const path = require('path');
const fs = require('fs');
const sharp = require('sharp'); // middleware for image compression

// Import the custom middleware for handling form data
const uploadPhoto = multer({
  dest: path.join(__dirname, '../public/assets/images/photos'),
});
const uploadAvatar = multer({
  dest: path.join(__dirname, '../public/assets/images/avatar'),
});

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
    const userDataPlain = userData.get({ plain: true });
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

    const userDataPlain = userData.get({ plain: true });
    console.log('req.session.userid:', userDataPlain);

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

// Create new photo
router.post('/photos', uploadPhoto.single('photo'), async (req, res) => {
  // The name in the middleware for upload.single must match the name coming in from the html form.
  try {
    console.log(req.file);

    // Use sharp to resize the image and save it to the public folder
    const compressImg = await sharp(req.file.path)
      .resize(600) // resizes the image to 800px wide
      .jpeg({ quality: 80 }); // converts to jpeg and sets quality to 80%

    // Define the file path to save the image
    const compressedFilePath = path.join(
      __dirname,
      '..',
      '..',
      'public',
      'assets',
      'img',
      'photos',
      req.session.userid,
      req.file.originalname
    );

    // saves the compressed image to the public folder, subdirectory photos with the original file name
    await compressImg.toFile(compressedFilePath);

    // Get the file information for the compressed image
    try {
      const stats = await fs.promises.stat(compressedFilePath);
      console.log('Compressed image size:', stats.size);
      console.log('Compressed image modified time:', stats.mtime);
    } catch (err) {
      console.error(err);
    }

    res.status(200).send('successfully uploaded!');
  } catch (err) {
    res.json({ error: err });
  }
});

// Create new avatar image
router.post('/avatar', uploadAvatar.single('avatar'), async (req, res) => {
  try {
    console.log(req.file);

    // Use sharp to resize the image and save it to the public folder
    const compressImg = await sharp(req.file.path)
      .resize(600) // resizes the image to 800px wide
      .jpeg({ quality: 80 }); // converts to jpeg and sets quality to 80%

    // Define the file path to save the image
    const compressedFilePath = path.join(
      __dirname,
      '..',
      '..',
      'public',
      'assets',
      'img',
      'avatar',
      'custom',
      req.file.originalname
    );

    console.log(compressedFilePath);

    // saves the compressed image to the public folder, subdirectory photos with the original file name
    await compressImg.toFile(`../../public/assets/img/avatar/custom/${req.file.originalname}`);

    // Get the file information for the compressed image
    try {
      const stats = await fs.promises.stat(compressedFilePath);
      console.log('Compressed image size:', stats.size);
      console.log(stats);
      console.log('Compressed image modified time:', stats.mtime);
    } catch (err) {
      console.error(err);
    }

    const response = Photo.create({

    })

    res.status(200).send('successfully uploaded!');
  } catch (err) {
    res.json({ error: err });
  }
});

module.exports = router;
