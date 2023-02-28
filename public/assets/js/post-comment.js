const postCommentHandler = async (event) => {
  const postid = document.querySelector('#postid').value.trim();


  const postCommentId = document.querySelector('#post-commentid').value.trim();
  const postCommentDetail = document.querySelector('#post-comment-detail').value.trim();

  let fetchUrl = "", postMethod = "";
  if (postCommentDetail) {

    if (postCommentId != "")
    {
      fetchUrl = "/api/comments/" + postCommentId;
      postMethod = "PUT";
    }
    else
    {
      fetchUrl = "/api/comments";
      postMethod = "POST";
    }

    const response = await fetch(fetchUrl, {
      method: postMethod,
      body: JSON.stringify({ postid, postCommentDetail }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace('/post/' + postid);
    } else {
      const isJson = response.headers.get('content-type')?.includes('application/json');
      const data = isJson ? await response.json() : null;
    
      //console.log (data.errors[0].message);
      //document.querySelector('#signup-status').innerHTML = data.errors.message;
    }
  }
};



document
  .querySelector('#post-comment-btn').addEventListener('click', postCommentHandler);

