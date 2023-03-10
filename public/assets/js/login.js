const loginFormHandler = async () => {
  //event.preventDefault();


  const user_email = $('#login-email').val().trim();
  const user_ps = $('#login-ps').val().trim();


  if (user_email && user_ps) {
    const response = await fetch('/api/users/login', {
      method: 'POST',
      body: JSON.stringify({ user_email, user_ps }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace('/');
    } else {
      const isJson = response.headers.get('content-type').includes('application/json');
      const data = isJson ? await response.json() : null;


      $('#login-email').html (data.message);
      //alert('Failed to log in.');
    }
  }
};

const signupFormHandler = async () => {
  //event.preventDefault();


  const username = $('#signup-username').val().trim();
  const user_email = $('#signup-email').val().trim();
  const user_ps = $('#signup-ps').val().trim();
  const user_firstname = $('#signup-firstname').val().trim();
  const user_lastname = $('#signup-lastname').val().trim();
  const user_type = $('#signup-user-type').val().trim();
  const gender = $('[name=gender]:checked').val();
  if (!gender) {
    $('#signup-status').html ('Please select a gender before preceed');
  } else {
    $('#signup-status').html ('');
  }

  if (username && user_email && user_ps && user_firstname && user_lastname && gender) {
    const response = await fetch('/api/users', {
      method: 'POST',
      body: JSON.stringify({ username, user_email, user_ps, user_firstname, user_lastname, user_type, gender }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace('/');
    } else {
      const isJson = response.headers.get('content-type').includes('application/json');
      const data = isJson ? await response.json() : null;

      //console.log (data.errors[0].message);
      document.querySelector('#signup-status').innerHTML = data.errors[0].message;

      //alert('Failed to sign up.');
    }
  }
};



$('#login-btn').click(function() {
  loginFormHandler ();
});


$('#signup-btn').click(function() {
  signupFormHandler ();
});
