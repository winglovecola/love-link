const msgView = async () => {
  // TODO - Test/confirm correct paths
  const response = await fetch('/msg', {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  });

  if (response.ok) {
    document.location.replace('/msg');
  } else {
    alert('Failed to load messages.');
  }
};

const swipeView = async () => {
  // TODO - Test/confirm correct paths (Await to confirm on John's push for his scripts)
  const response = await fetch('/', {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  });

  if (response.ok) {
    document.location.replace('/');
  } else {
    alert('Failed to load.');
  }
};

const changeAvatar = async () => {
  // TODO - Test/confirm correct paths
  // (NOTE - Will this redirect to upload or select from stored array of photos?)
  // Upload simply change path to upload page. If select from stored array of photos then figure out how to access and test that array. May
  //   const response = await fetch('/upload', {
  //     method: 'GET',
  //     headers: { 'Content-Type': 'application/json' },
  //   });
  //   if (response.ok) {
  //     document.location.replace('/upload');
  //   } else {
  //     alert('Failed to load messages.');
  //   }
};

const addPhotos = async () => {
  // TODO - Test/confirm route
  const response = await fetch('/upload', {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  });

  if (response.ok) {
    document.location.replace('/upload');
  } else {
    alert('Failed to load messages.');
  }
};

const editBio = async () => {};

// function birthdayConvert(birthday) {
//   const birthyear = birthday.getUTCFullYear();
//   const age = new Date().getFullYear() - birthyear;
//   return age;
// }

document.querySelector('#mail-icon-button').addEventListener('click', msgView);
document.querySelector('#view-matches-icon-button').addEventListener('click', swipeView);
document.querySelector('#change-avatar-icon-button').addEventListener('click', changeAvatar);
document.querySelector('#addPhotos').addEventListener('click', addPhotos);
