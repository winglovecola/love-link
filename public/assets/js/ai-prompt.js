// Create DOM elements for the AI prompts
const carouselInner = $('.carousel-inner');
const nextBtn = $('.carousel-control-next');
const prevBtn = $('.carousel-control-prev');
const aiForm = $('#ai-prompt-form');
const genderRadios = $('input[name=\'gender\']');

// Create a variable to store avatar data
let avatarsArray = [];
let currentAvatar;
let avatarIndex = 0;

// Create a function to display the an avatar
function displayAvatar() {
  // Display the avatar's avatar
  let avatar = $('<img>').attr('src', `/assets/img/avatar/preset/${currentAvatar.gender}/${currentAvatar.avatar}`);
  avatar.attr('class', 'avatar d-block w-100');
  carouselInner.append(avatar);
}

// Create a function to remove the current avatar
function removeAvatar() {
  $('.avatar').remove();
}

// Create a function to display the next avatar
function nextavatar() {
  if(avatarIndex < avatarsArray.length - 1) {
    // Remove the current avatar
    removeAvatar();

    // Increment the avatar index
    avatarIndex++;

    // Display the next avatar
    currentAvatar = avatarsArray[avatarIndex];
    displayAvatar();
  }
}

function prevAvatar() {
  // Decrement the avatar index
  if (avatarIndex !== 0) {
    avatarIndex--;
    // Remove the current avatar
    removeAvatar();

    // Display the next avatar
    currentAvatar = avatarsArray[avatarIndex];
    displayAvatar();
  }
}

// Create a function to initialize the page
async function genderEventHandler(gender) {
  // Make a request to get all potential matches for the avatar
  try {
    const response = await fetch(`/api/users/${gender}`);
    if (response.ok) {
      const data = await response.json();
      console.log(data);
      // Push the avatars into the avatarsArray
      for (let i = 0; i < data.length; i++) {
        avatarsArray.push(data[i]);
      }
      // Set the current avatar
      currentAvatar = avatarsArray[avatarIndex];
    } else {
      throw response.json();
    }
  } catch (error) {
    console.error(error);
  }
  // Display the first avatar
  displayAvatar();
}

// Create a function to handle the form submission
async function handleFormSubmit(event) {
  event.preventDefault();

  const form = document.getElementById('ai-prompt-form');

  // Get all selected personality traits
  const selectedTraits = Array.from(form.querySelectorAll('input[name="personality[]"]:checked')).map((input) => input.value).join(', ');

  // Get the form data
  const formData = {
    firstName: $('#firstname').val(),
    lastName: $('#lastname').val(),
    gender: $('input[name=\'gender\']:checked').val(),
    interest: $('#interests').val(),
    personality: selectedTraits,
    avatar: currentAvatar.avatar
  };

  console.log(formData);

  // Make a request to the server to add the AI profile
  try {
    const response = await fetch('/api/users/ai', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    });

    if (response.ok) {
      console.log('Created AI user: ',response);
      // Redirect to the users-profile page
      document.location.replace('/matches');
    } else {
      throw response.json();
    }
  } catch (error) {
    console.error(error);
  }
}

// Add event listeners to the form
aiForm.on('submit', handleFormSubmit);

// Event lister for loading avatars
genderRadios.on('change', () => {
  // Remove the current avatar
  removeAvatar();

  // Reset the avatar index and array
  avatarIndex = 0;
  avatarsArray = [];

  // Let the user know they need to scroll to the avatart they want to use
  $('#avatar-instructions').text('Scroll to the avatar you want for your AI partner.');

  // Get the current gender the user selected
  genderRadios.each((index, element) => {
    if (element.checked) {
      genderEventHandler(element.value); // passes f or m
    }
  });
});

// Event listeners to scroll through avatar options
nextBtn.on('click', nextavatar);
prevBtn.on('click', prevAvatar);