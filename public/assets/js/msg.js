const msgSend = async (toUserId) => {

  const msgText = $('#msgtext').val().trim();

  if (msgText) {

    const response = await fetch("/api/msg", {
      method: "POST",
      body: JSON.stringify({ msgText, toUserId }),
      headers: {'Content-Type': 'application/json'},
    });

    if (response.ok) {
      document.location.replace('/profile');
    } else {
      const isJson = response.headers.get('content-type')?.includes('application/json');
      const data = isJson ? await response.json() : null;
    
      //console.log (data.errors[0].message);
      //document.querySelector('#signup-status').innerHTML = data.errors.message;
    }
  }
};


const postDelete = async () => {
  document.querySelector('#delete-confirmation').style.display = "block";
  document.querySelector('#post-delete').style.display = "none";
};

const postDeleteNo = async () => {
  document.querySelector('#delete-confirmation').style.display = "none";
  document.querySelector('#post-delete').style.display = "block";
};

const postDeleteYes = async () => {

  const postId = document.querySelector('#postid').value.trim();


  let fetchUrl = "", postMethod = "";
  fetchUrl = "/api/posts/" + postId;
  postMethod = "DELETE";

    const response = await fetch(fetchUrl, {
      method: postMethod,
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      const isJson = response.headers.get('content-type')?.includes('application/json');
      const data = isJson ? await response.json() : null;
    
      //console.log (data.errors[0].message);
      //document.querySelector('#signup-status').innerHTML = data.errors.message;
    }

};


