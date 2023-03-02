const router = require('express').Router();
const { User, Photo } = require('../../models');
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
            user_id: req.session.userid,
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

module.exports = router;
