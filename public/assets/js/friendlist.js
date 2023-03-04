
let userArrayObj = {};
let matchData = {};

var senderUserId = userid;
var receiverUserId = '';
function renderUserList (mode) {
  let html = '';
  // eslint-disable-next-line eqeqeq
  if (mode == 'liked' || mode == 'likedMe' || mode == 'matched') {

    //console.log (matchData[mode]);
    matchData[mode].forEach((element) => {

      let thisUser = userArrayObj['u' + element];

      html += `
      <div id="u${thisUser.id}" class="cards userlist" onclick="chatStart ('${thisUser.id}')">
        <div class="cards-body">
          <div class="avatar"><img src="/assets/img/avatar/preset/${thisUser.gender}/${thisUser.avatar}"></div>
          
          <div class="fullname">${thisUser.firstname} ${thisUser.lastname}</div>
        </div>
      </div>`;
    });

    $('#users-con').html (html);
  }
}



async function getMatchData () {


  const response = await fetch('/api/match', {
    method: 'POST',
    body: JSON.stringify({}),
    headers: { 'Content-Type': 'application/json' },
  });

  return response.json();
}



async function renderFriendList () {

  matchData = await getMatchData();
  console.log (matchData);

  if (matchData) {
    $('#liked-count').html (` (${matchData.liked.length})`);
    $('#matched-count').html (` (${matchData.matched.length})`);
    $('#likedme-count').html (` (${matchData.likedMe.length})`);


    matchData.userData.forEach((user) => {
      userArrayObj['u' + user.id] = user;
    });


    renderUserList ('matched');
  } else {

    $('#users-con').html ('No matches at the moment');
  }
}





renderFriendList ();

