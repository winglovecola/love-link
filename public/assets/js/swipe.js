// Require the function to initialize the carousel with user photos
// Create the DOM elements for the user
const bioContainer = $('.bio');
const carouselInner = $('.carousel-inner');
const likeBtn = $('#like-btn');
const dislikeBtn = $('#dislike-btn');

// Create a variable to store user data
let usersArray = [];
let currentUser;
let userIndex = 0;


// Function to display the next user, displays avatar
function displayUser() {

  // Display the user's avatar
  let avatar = '';

  if (currentUser.avatar_type === 'C') {
    avatar =`/assets/img/avatar/custom/${currentUser.avatar}`;
  } else {
    avatar = `/assets/img/avatar/preset/${currentUser.gender}/${currentUser.avatar}`;
  }


  const newDiv = document.createElement('div');
  newDiv.classList.add('carousel-item');
  newDiv.classList.add('active');
  carouselInner.append(newDiv);

  const newImg = document.createElement('img');
  newImg.setAttribute('src', avatar);
  newImg.setAttribute('class', 'd-block w-100');
  newDiv.append(newImg);


  // Display the user's bio
  let name = $('<h4>').text(`${currentUser.firstname} ${currentUser.lastname}`).addClass('biotext-name');
  let bio = $('<p>').text(currentUser.bio).addClass('biotext');
  bio.attr('class', 'bio');
  bioContainer.append(name, bio);
}

// Create a function to initialize the carousel
async function initCarousel() {
  try {
    const response = await fetch('/api/users/photos/' + currentUser.id);

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

        const newImg = document.createElement('img');
        newImg.setAttribute('src', `/assets/img/photos/${currentUser.id}/${photo.img_filename}`);
        newImg.setAttribute('class', 'd-block w-100');
        newDiv.append(newImg);
      }
    }
  } catch (err) {
    console.error(err);
  }
}

// Create a function to initialize the page
async function init() {
  // Make a request to get all potential matches for the user

  try {
    const response = await fetch('/api/users/swipe');
    if (response.ok) {
      const data = await response.json();
      // Push the users into the usersArray
      for (let i = 0; i < data.length; i++) {
        usersArray.push(data[i]);
      }
      // Set the current user
      currentUser = usersArray[userIndex];


    } else {
      throw response.json();
    }
  } catch (error) {
    console.error(error);
  }
  // Display the first user
  displayUser();

  // Initialize the carousel
  initCarousel();
}

// Create a function to remove the current user
function removeUser() {
  // Remove the user's avatar
  carouselInner.empty();

  // Remove the user's bio
  $('.bio').empty();
}

// Create a function to display the next user
function nextUser() {
  // Remove the current user
  removeUser();

  // Increment the user index
  userIndex++;

  // Display the next user
  currentUser = usersArray[userIndex];
  displayUser();
  initCarousel();
}

// Add event listeners to the bio buttons
dislikeBtn.click(() => nextUser());
likeBtn.click(() => {
  // Display the next user
  nextUser();

  // Make a request to add the liked profile to the user's matches
  // Note: sql autoincrement starts at 1, but array index starts at 0
  const likedProfileID = usersArray[userIndex - 1].id; // -1 because userIndex has already been incremented
  let matchData = { match_id: likedProfileID };

  fetch('/api/match/like', {
    method: 'POST',
    body: JSON.stringify(matchData),
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw response.json();
      }
    })
    .catch((error) => {
      console.error(error);
    }
    );
});



init();
