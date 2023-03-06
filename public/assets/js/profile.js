const avatarForm = document.querySelector('#avatar-form');
const photoForm = document.querySelector('#photo-form');
const carouselInner = document.querySelector('.carousel-inner');
const prevBtn = document.querySelector('.carousel-control-prev');
const nextBtn = document.querySelector('.carousel-control-next');

// Create a function to initialize the carousel
async function initCarousel() {
  try {
    const response = await fetch('/api/users/photos');

    if (response.ok) {
      const userData = await response.json();
      const photos = userData.photos;
      console.log(photos);

      // Stop the carousel auto slide
      $('.carousel').carousel({
        interval: false,
      });

      // Create a div for each photo and append it to the carousel
      for (photo of photos) {

        // Create a new div for each photo
        const newDiv = document.createElement('div');
        newDiv.classList.add('carousel-item');
        carouselInner.append(newDiv);
        if (photo.id === photos[0].id) {
          // Set the active photo id for the first photo
          newDiv.classList.add('active');
        }

        const newImg = document.createElement('img');
        newImg.setAttribute('src', `assets/img/photos/${photo.userid}/${photo.img_filename}`);
        newDiv.append(newImg);
      }
    }
  } catch (err) {
    console.error(err);
  }
}


async function userPhotoGet () {
  try {
    const fetchPhotoRes = await fetch('/api/users/photos');

    if (fetchPhotoRes.ok) {
      const photoData = await fetchPhotoRes.json();
      const photos = photoData.photos;


      //construct photo gallery
      let photoCards = '';

      for (photo of photos) {
        photoCards += `<div id="up${photo.id}" class="user-photo cards"><img src="/assets/img/photos/${photo.userid}/${photo.img_filename}"/></div>`;
      }

      if ($('#user-photo-con')) {
        $('#user-photo-con').html (`<div id="photo-gallery" class="container">${photoCards}<div>`);
      }

    }
  } catch (err) {
    return false;
  }
}


//upload avatar
avatarForm.addEventListener('submit', async (event) => {
  event.preventDefault(); // Prevents the page from reloading

  // eslint-disable-next-line eqeqeq
  if ($('#user-avatar-input').val() == '') {
    return;
  }


  try {
    $('#avatar-form').hide ();
    $('#avatar-uploading').show ();

    const formData = new FormData(avatarForm);
    const response = await fetch('/api/users/avatar', {
      // path to be changed
      method: 'POST',
      body: formData,
    });


    $('#avatar-uploading').hide ();

    $('#avatar-uploaded-status').show ();
    $('#avatar-uploaded-status').html ('Avatar has been updated');

    $('#user-avatar-img').attr('src',`/assets/img/avatar/custom/${user.id}.jpg?` + new Date().getTime());


    setTimeout(() => {
      $('#user-avatar-input').val('');
      $('#avatar-form').show ();
      $('#avatar-uploaded-status').hide ();
    }, 2000);
    console.log(response);
  } catch (err) {
    console.error(err);
  }
});



//upload photos
photoForm.addEventListener('submit', async (event) => {
  event.preventDefault(); // Prevents the page from reloading

  // eslint-disable-next-line eqeqeq
  if ($('#user-photo-input').val() == '') {
    return;
  }


  try {

    $('#photo-form').hide ();
    $('#photo-uploading').show ();

    const formData = new FormData(photoForm);
    const response = await fetch('/api/users/photos', {
      // path to be changed
      method: 'POST',
      body: formData,
    });


    $('#photo-uploading').hide ();

    $('#photo-uploaded-status').show ();
    $('#photo-uploaded-status').html ('Photo Uploaded');



    setTimeout(() => {
      $('#user-photo-input').val('');
      $('#photo-form').show ();
      $('#photo-uploaded-status').hide ();
    }, 2000);

    userPhotoGet ();


    //console.log(response);
  } catch (err) {
    console.error(err);
  }
});




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
  const response = await fetch('/swipe', {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  });

  if (response.ok) {
    document.location.replace('/swipe');
  } else {
    alert('Failed to load.');
  }
};

// const changeAvatar = async () => {
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
// };

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

function birthdayConvert(birthday) {
  const birthyear = birthday.getUTCFullYear();
  const age = new Date().getFullYear() - birthyear;
  return age;
}

//document.querySelector('#mail-icon-button').addEventListener('click', msgView);
//document.querySelector('#view-matches-icon-button').addEventListener('click', swipeView);
//document.querySelector('#change-avatar-icon-button').addEventListener('click', changeAvatar);


userPhotoGet ();