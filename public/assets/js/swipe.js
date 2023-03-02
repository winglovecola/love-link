// Create the DOM elements for the user
const bioContainer = $('.bio');
const users = $('#user-info').text();
const carouselInner = $('.carousel-inner');
const likeBtn = $('#like-btn');
const dislikeBtn = $('#dislike-btn');

// Convert the string into an array of objects
let usersArray = users.split('},');
usersArray = usersArray.map((user) => {
  user = user.replace('{', '');
  user = user.replace('}', '');
  user = user.replace(/'/g, '');
  user = user.replace(/ /g, '');
  user = user.split(',');
  let userObject = {};
  user.forEach((item) => {
    item = item.split(':');
    userObject[item[0]] = item[1];
  });
  return userObject;
});

// Define the current user - index from 0
let userIndex = 0;
let currentUser = usersArray[userIndex];

// Create a function to display the current user
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

  console.log(currentUser);
}

// Display the first user
displayUser();

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
  console.log(userIndex);

  // Display the next user
  currentUser = usersArray[userIndex];
  displayUser();
}

// Add event listeners to the bio buttons
likeBtn.click(() => nextUser());
dislikeBtn.click(() => nextUser());

