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


let userid = 1;


firebase.initializeApp(firebaseConfig);

const db = firebase.database();

const username = prompt('Please Tell Us Your Name');


function uuidv4() {
  return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
    (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
  );
}

function sendMessage(sendToUserid) {

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

  // create group and add group memeber if it doesn't exist
  db.ref('group/' + uuidv4()).set({

    createBy: userid,
    members: [userid, sendToUserid],
    createTime: Date.now(),
  });


  // create db collection and send in the data
  db.ref('messages/' + timestamp).set({
    username,
    message,
  });
}

const fetchChat = db.ref('messages/');

fetchChat.on('child_added', function (snapshot) {
  const messages = snapshot.val();
  const message = `<li class=${
    username === messages.username ? 'sent' : 'receive'
  }><span>${messages.username}: </span>${messages.message}</li>`;
  // append the message on the page
  document.getElementById('messages').innerHTML += message;
});