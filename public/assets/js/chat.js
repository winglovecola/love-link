// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyDiYC4wy1-9tanm1VrYTxqxHDH1ZrtLOyI',
  authDomain: 'love-link-616b9.firebaseapp.com',
  databaseURL: 'https://love-link-616b9-default-rtdb.firebaseio.com',
  projectId: 'love-link-616b9',
  storageBucket: 'love-link-616b9.appspot.com',
  messagingSenderId: '970369934987',
  appId: '1:970369934987:web:6c73f0576da9b8913a168e'
};


// Initialize Firestore through Firebase
firebase.initializeApp(firebaseConfig);

let groupID = '';
let groupExist = false;
let msgOnSnapshotEnabled = false;




// Initialize Cloud Firestore and get a reference to the service
const db = firebase.firestore();


function uuidv4() {
  return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
    (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
  );
}



async function checkGroup(senderUsersId, receiverUserId) {

  //check if the field member contain specific user
  let userList = [senderUsersId.toString (), receiverUserId.toString ()];

  let groupData = db.collection('group');


  await groupData.where('members' , 'array-contains-any' , userList).get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      console.log(doc.id, ' => ', doc.data());
      const docData = doc.data();


      if (docData.members.includes(userList[0]) && docData.members.includes(userList[1])) {

        groupID = docData.id;
        groupExist = true;

        return;
      }

    });
  });

  console.log ('groupID: ' + groupID);
  // create group and add group memeber if it doesn't exist

  if (!groupExist) {

    const groupRef = db.collection('group').doc();

    await groupRef.set({
      id: groupRef.id,
      createBy: senderUsersId,
      createAt: timestamp,
      members: [senderUsersId.toString (), receiverUserId.toString ()],

    });


    groupID = groupRef.id;
    /*       .then((docRef) => {
      console.log('Document written with ID: ', docRef.id);
    })
    .catch((error) => {
      console.error('Error adding document: ', error);
    }); */



    console.log ('group created');
  } else {
    console.log ('group exist');
  }


  return groupID;
}

async function msgSend(senderUsersId, receiverUserId) {

  // get values to be submitted
  const timestamp = Date.now();
  let messageInput = '';


  if ($('#chat-input')) {
    messageInput = $('#chat-input').val ();

  } else {

    return;
  }



  db.collection(`msgs/${groupID}/msg`).add({
    createdBy: senderUsersId,
    createdAt: timestamp,
    msgText: messageInput

  });

}




//listen for changes for message
async function msgOnSnapshot (thisGroupID) {

  if (!msgOnSnapshotEnabled) {
    await db.collection(`msgs/${thisGroupID}/msg`).orderBy('createdAt', 'desc').limit(20).onSnapshot(function(querySnapshot) {

      querySnapshot.docChanges().forEach(function(change) {
        console.log(change.doc.data());
        msgData = change.doc.data();



        if (change.type === 'added') {
          let msgHtml = `<li>${msgData.msgText}</li>`;
          // append the message on the page
          $('#chatbox').append(msgHtml);
        }

      });


    });

  }

  msgOnSnapshotEnabled = true;
}


async function chatStart (thisUserid) {
  receiverUserId = thisUserid;

  $('#chat-div').show ();


  const thisGroupID = await checkGroup(senderUserId, receiverUserId);

  let assignedGroupId = msgOnSnapshot (thisGroupID);

  msgOnSnapshot (assignedGroupId);
}

function chatClose () {

  $('#chat-div').hide ();

}



//user action listener
$('#send-btn').click(function() {

  msgSend(senderUserId, receiverUserId);
});

$(document).on('keypress',function(e) {
  // eslint-disable-next-line eqeqeq
  if(e.which == 13) {
    msgSend(senderUserId, receiverUserId);
  }
});


//listen for changes from table
/*   db.collection("msgs").doc (groupID)
    .onSnapshot((doc) => {
      console.log("Current data: ", doc.data());
    });
}


//read from table
/*
  db.collection('msgs').get().then((querySnapshot) => {
   querySnapshot.forEach((doc) => {

     const messages = doc.data();
    const message = `<li class=${
      username === messages.username ? 'sent' : 'receive'
    }><span>${messages.username}: </span>${messages.message}</li>`;
    // append the message on the page
    document.getElementById('messages').innerHTML += message;
  });


});
 */
