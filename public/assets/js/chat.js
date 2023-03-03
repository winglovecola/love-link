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




let userid = 1;

// Initialize Cloud Firestore and get a reference to the service
const db = firebase.firestore();

const username = prompt('Please Tell Us Your Name');


function uuidv4() {
  return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
    (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
  );
}
const groupID = "testgroup2";

let groupExist = false;

async function msgSend(sendToUserid) {

  // get values to be submitted
  const timestamp = Date.now();
  const messageInput = document.getElementById('message-input');
  const message = messageInput.value;


  // clear the input box
  messageInput.value = '';

  //auto scroll to bottom
  document
    .getElementById('messages')
    .scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'nearest' });


  //check if the field member contain specific user
  let userList = ['1', '2'];

  let groupData = db.collection('group');


  //groupData.where('members', '==', '3');

  await groupData.where('members' , 'array-contains-any' , userList).get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      console.log(doc.id, ' => ', doc.data());
      const docData = doc.data();


      if (docData.members.includes(userList[0]) && docData.members.includes(userList[1])) {
        groupExist = true;

        return;
      }

    });
  });


  // create group and add group memeber if it doesn't exist

  if (!groupExist) {

    const groupRef = db.collection('group').doc(groupID);

    groupRef.set({
      id: groupRef.id,
      createBy: userid,
      members: [userid.toString (), sendToUserid.toString ()],
      createTime: Date.now(),
    });
/*       .then((docRef) => {
        console.log('Document written with ID: ', docRef.id);
      })
      .catch((error) => {
        console.error('Error adding document: ', error);
      }); */



    console.log ('group CREATED');
  } else {
    console.log ('group exist');
  }

  db.collection(`msgs/${groupID}/msg`).add({
    username: username,
    message: message
  });


}


//listen for changes for message
db.collection(`msgs/${groupID}/msg`).onSnapshot(function(querySnapshot) {

  querySnapshot.docChanges().forEach(function(change) {
    console.log(change.doc.data());
    msgData = change.doc.data();



    if (change.type === 'added') {
      const message = `<li class=${
        username === msgData.username ? 'sent' : 'receive'
      }><span>${msgData.username}: </span>${msgData.message}</li>`;
      // append the message on the page
      document.getElementById('messages').innerHTML += message;
    }

  });




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
