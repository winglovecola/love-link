
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
      let avatarPath = '';
      if (thisUser.avatar_type === 'C') {
        avatarPath = `/assets/img/avatar/custom/${thisUser.avatar}`;
      } else {
        avatarPath = `/assets/img/avatar/preset/${thisUser.gender}/${thisUser.avatar}`;
      }

      let aiIcon = '';
      if (thisUser.type === 'A') {
        aiIcon = '<div class="ai-icon">V</div>';
      } else {
        aiIcon = '';
      }


      html += `
      <div id="u${thisUser.id}" class="cards userlist" onclick="chatStart (userArrayObj.u${element})">
        <div class="cards-body">${aiIcon}
          <div class="avatar"><img src="${avatarPath}"></div>
          
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

