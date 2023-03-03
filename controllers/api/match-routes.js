const router = require('express').Router();
const { User, Match } = require('../../models');


// Login
router.post('/', async (req, res) => {
  try {
    const userLikeData = await Match.findAll({
      include: [{ model: User }],
      where: {
        userid: req.session.userid,
      },
    });
    const userLike = userLikeData.get({ plain: true });

    const userLikeMeData = await Match.findAll({
      include: [{ model: User }],
      where: {
        match_id: req.session.userid,
      },
    });
    const userLikeMe = userLikeMeData.get({ plain: true });


    const userMatch = {like: userLike, likeMe: userLikeMe};


    //console.log('req.session.userid:', matchDataPlain);

    res.status(200).json(userMatch);

  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});


module.exports = router;
