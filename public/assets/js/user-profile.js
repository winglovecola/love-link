const avatarForm = document.querySelector('#avatar-form');
const photoForm = document.querySelector('#photo-form');

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
