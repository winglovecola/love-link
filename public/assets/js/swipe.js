// Create the DOM elements for the user
const bioContainer = $('.bio');
const carouselInner = $('.carousel-inner');
const likeBtn = $('#like-btn');
const dislikeBtn = $('#dislike-btn');

// Create a variable to store user data
let usersArray = [];
let currentUser;
let userIndex = 0;


// Create a function to display the current user
// If time, add functionality to make a request to get next img
function displayUser() {
  // Display the user's avatar
  let avatar = $('<img>').attr('src', `/assets/img/avatar/preset/${currentUser.sex}/${currentUser.avatar}`);
  avatar.attr('class', 'avatar');
  carouselInner.append(avatar);

  // Display the user's bio
  let name = $('<h4>').text(`${currentUser.firstname} ${currentUser.lastname}`).addClass('biotext');
  let bio = $('<p>').text(currentUser.bio).addClass('biotext');
  bio.attr('class', 'bio');
  bioContainer.append(name, bio);
}

// Create a function to initialize the page
async function init() {
  // Make a request to get all potential matches for the user
  try {
    const response = await fetch('/api/users');
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
}




// Create a function to remove the current user
function removeUser() {
  // Remove the user's avatar
  $('.avatar').remove();

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
