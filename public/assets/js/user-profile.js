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

avatarForm.addEventListener('submit', async (event) => {
  event.preventDefault(); // Prevents the page from reloading

  try {
    const formData = new FormData(avatarForm);
    const response = await fetch('/api/users/avatar', {
      // path to be changed
      method: 'POST',
      body: formData,
    });

    console.log(response);
  } catch (err) {
    console.error(err);
  }
});

photoForm.addEventListener('submit', async (event) => {
  event.preventDefault(); // Prevents the page from reloading

  try {
    const formData = new FormData(photoForm);
    const response = await fetch('/api/users/photos', {
      // path to be changed
      method: 'POST',
      body: formData,
    });

    console.log(response);
  } catch (err) {
    console.error(err);
  }
});

initCarousel();