const router = require('express').Router();
const { User, Photo, Match } = require('../../models');
const multer = require('multer'); // middleware for handling uploaded files through forms
const path = require('path');
const fs = require('fs');
const sharp = require('sharp'); // middleware for image compression

// Import the custom middleware for handling form data

const userImgPhotoPath = '../../public/assets/img/photos';
const userImgAvatarCustomPath = '../../public/assets/img/avatar/custom';
const userImgTempUpload = '../../public/assets/img/tmp_uploads';


const uploadPhoto = multer({
  dest: path.join(__dirname, userImgTempUpload),
});

const uploadAvatar = multer({
  dest: path.join(__dirname, userImgTempUpload),
});

// Get photos for a user
router.get('/photos', async (req, res) => {
  try {
    const userData = await User.findByPk(req.session.userid, {
      include: [{model: Photo}],
    });

    console.log('made it into the direct route');

    if (!userData) {
      res.status(404).json({ message: 'No user found with this id!' });
      return;
    }

    user = userData.get({ plain: true });

    // console.log('userData:', userData);
    // console.log('user:', user);

    res.status(200).json(userData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET all users
router.get('/', async (req, res) => {
  try {
    const userData = await User.findAll();

    const users = userData.map((user) =>
      user.get({ plain: true })
    );

    res.status(200).json(users);
  } catch (err) {
    res.status(500).json(err);
  }
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
      gender: req.body.gender,
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
      req.session.gender = req.body.gender;

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
router.post('/photos', uploadPhoto.single('photos'), async (req, res) => {
  try {
    // Use sharp to resize the image and save it to the public folder
    const tempImgFile = req.file.path;
    const userImgPhotofolderPath = `${path.join(__dirname, userImgPhotoPath)}/${req.session.userid}`;

    if (await !fs.existsSync(userImgPhotofolderPath)){
      await fs.mkdirSync(userImgPhotofolderPath, { recursive: true });
    }

    const userImgPhotoFilePath = `${userImgPhotofolderPath}/${req.file.originalname}`;

    await sharp(tempImgFile)
      .resize(600) // resizes the image to 800px wide
      .jpeg({ quality: 80 }) // converts to jpeg and sets quality to 80%
      .toFile(userImgPhotoFilePath, async (err, stats) => {

        if (!err) {

          const photoData = await Photo.create({
            userid: req.session.userid,
            img_filename: req.file.originalname,
            img_size: stats.size,
            img_width: stats.width,
            img_height: stats.height,
            created_time: Date.now(),
            updated_time: Date.now()
          });

          res.status(200).json(photoData);
        } else {
          res.status(400).json('failed to generate photo');
        }
      });

  } catch (err) {
    res.json({ error: err });
  }
});

// Create new avatar image
router.post('/avatar', uploadAvatar.single('avatar'), async (req, res) => {
  try {
    // Use sharp to resize the image and save it to the public folder
    const tempImgFile = req.file.path;

    const userImgAvatarFileName = `${req.session.userid}.jpg`;
    const userImgAvatarCustomFilePath = `${path.join(__dirname, userImgAvatarCustomPath)}/${userImgAvatarFileName}`;

    await sharp(tempImgFile)
      .resize(600) // resizes the image to 800px wide
      .jpeg({ quality: 80 }) // converts to jpeg and sets quality to 80%
      .toFile(userImgAvatarCustomFilePath, async (err, stats) => {
        if (!err) {


          const avatarData = await User.update(
            {
              avatar: userImgAvatarFileName,
              avatar_type: 'C' //custom
            },
            { where: { id: req.session.userid } }
          );

          res.status(200).json(avatarData);
        } else {
          res.status(400).json('Failed to create avatar');
        }
      });

  } catch (err) {
    res.json({ error: err });
  }
});

// Create new AI user
router.post('/ai', async (req, res) => {
  try {
    const userData = await User.create({
      username: 'AI partner', // To link with the user
      email: `${req.body.firstName}.${req.body.lastName}@lovelink.com`,
      password: 'aipartner',
      firstname: req.body.firstName,
      lastname: req.body.lastName,
      type: 'A',
      gender: req.body.gender,
      interest: req.body.interest,
      avatar: req.body.avatar.trim(),
      avatar_type: '', //preset
      personalitytraits: req.body.personalitytraits,
      created_time: Date.now(),
      updated_time: Date.now(),
    });

    // Create the match for the user as well (create relationship for the)
    const matchData = await Match.create({
      userid: req.session.userid, // The user who creates the AI's iD
      match_id: userData.id, // The AI's ID
      created_time: Date.now(),
      updated_time: Date.now(),
    });

    const matchDataAI = await Match.create({
      userid: userData.id, // The AI's ID
      match_id: req.session.userid, // The user who creates the AI's iD
      created_time: Date.now(),
      updated_time: Date.now(),
    });

    res.status(200).json({user: userData, match: matchData, matchAI: matchDataAI});
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// GET 10 users of a certain gender
router.get('/:gender', async (req, res) => {
  try {
    // Get the number of users for the given gender
    const userData = await User.findAll({
      limit: 10,
      where: {
        gender: req.params.gender
      }
    });

    const users = userData.map((user) =>
      user.get({ plain: true })
    );

    res.status(200).json(users);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
