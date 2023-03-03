async function getMatchData () {


  const response = await fetch('/api/users/friendlist', {
    method: 'POST',
    body: JSON.stringify({}),
    headers: { 'Content-Type': 'application/json' },
  });


  return response;

}

async function renderFriendList () {

  let matchData = await getMatchData();


  if (matchData) {

    console.log (matchData);

    
  }
}