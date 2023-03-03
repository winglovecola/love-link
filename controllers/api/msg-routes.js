const router = require('express').Router();
//const { Message } = require('../../models');

const { initializeApp, applicationDefault, cert } = require('firebase-admin/app');
const { getFirestore, Timestamp, FieldValue } = require('firebase-admin/firestore');

const serviceAccount = require('../../love-link-616b9-firebase-adminsdk-qci3c-305358fd0a.json');

initializeApp({
  credential: cert(serviceAccount)
});

const fdb = getFirestore();


// Create message
router.post('/', async (req, res) => {
  try {
    /*     const postData = await Message.create({
      user_id: req.body.user_id,
      user_fullname: req.body.user_fullname,
      message: req.body.message,
      created_time: Date.now(),
      updated_time: Date.now(),
    }); */

    const docRef = fdb.collection('msg').doc(req.session.userid.toString());

    await docRef.set({
      toUser: req.body.toUserId,
      msgText: req.body.msgText,
      createAt: Date.now(),
    });



    res.status(200).json();
  } catch (err) {
    console.log(err);

    res.status(500).json(err);
  }
});

// Edit post
router.put('/:id', async (req, res) => {
  try {
    const postData = await Post.update({
      subject: req.body.postSubject,
      detail: req.body.postDetail,
      img_url: req.body.postImgurl,
      updated_time: Date.now(),

    },
    {where: {
      id: req.params.id,
    }});

    res.status(200).json(postData);
  } catch (err) {
    console.log(err);

    res.status(500).json(err);
  }
});


//delete post
router.delete('/:id', async (req, res) => {

  try {
    let postData = await Post.findByPk(req.params.id, {});

    if (!postData) {
      res.status(404).json({ message: `No post found with given ID ${req.params.id}!` });
      return;
    }


    postData = await Post.destroy({
      where: {
        id: req.params.id,
      },
    });
    //console.log ("postData", postData)

    const commentData = await Comment.destroy({
      where: {
        post_id: req.params.id,
      },
    });


    if (postData)
      res.status(200).json(`Post ${req.params.id} has been removed.`);
    else
      res.status(200).json(`Failed to remove post ${req.params.id}.`);
  } catch (err) {
    console.log(err);

    res.status(500).json(err);
  }
});

module.exports = router;