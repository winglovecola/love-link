const router = require('express').Router();
const { User, Match } = require('../../models');


// Login
router.post('/', async (req, res) => {
  try {
    const userLikeData = await Match.findAll({
      attributes: ['userid', 'match_id'],
      where: {
        userid: req.session.userid,
      },
    });

    const userLike = userLikeData.map((thisUserLikeData) =>
      thisUserLikeData.get({ plain: true })
    );

    let userLikeList = [];
    userLike.forEach((element) => {
      userLikeList.push (element.match_id);
    });

    console.log (userLikeList);



    const userLikeMeData = await Match.findAll({
      attributes: ['userid', 'match_id'],
      where: {
        match_id: req.session.userid,
      },
    });

    const userLikeMe = userLikeMeData.map((thisUserLikeData) =>
      thisUserLikeData.get({ plain: true })
    );

    let userLikeMeList = [];
    userLikeMe.forEach((element) => {
      userLikeMeList.push (element.userid);
    });

    console.log (userLikeMeList);


    let userMatchedList = [];
    userLikeList.forEach((element) => {
      if (userLikeMeList.includes (element)) {
        userMatchedList.push (element);
      }
    });
    console.log (userMatchedList);
    //console.log('req.session.userid:', matchDataPlain);


    console.log (userLikeList.concat(userLikeMeList));

    const allUserList = userLikeList.concat(userLikeMeList);

    const userDataObj = await User.findAll({
      attributes: ['id', 'username', 'firstname', 'lastname', 'sex', 'interest', 'avatar', 'avatar_type'],
      where: {
        id: allUserList,
      },
    });

    const userData = userDataObj.map((thisUserData) =>
      thisUserData.get({ plain: true })
    );


    const userMatch = {liked: userLikeList, likedMe: userLikeMeList, matched: userMatchedList, userData: userData};

    res.status(200).json(userMatch);

  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});


module.exports = router;
