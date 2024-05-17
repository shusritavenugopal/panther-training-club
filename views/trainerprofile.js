// Function to fetch and display trainer data
function fetchAndDisplayTrainerData() {
  const trainerId = localStorage.getItem('trainerId');
  if (!trainerId) {
    console.error('No trainer ID found in local storage');
    return; // Exit if no ID is found
  }

  const apiEndpoint = 'https://panther-training-club.glitch.me/api/trainer/' + trainerId;
  
  fetch(apiEndpoint, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
       'Authorization': `Bearer ${localStorage.getItem('trainertoken')}`
    }
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => {
    // Populate the trainer profile form with the data
    document.getElementById('trainerName').value = data.name;
    document.getElementById('trainerEmail').value = data.email;
    document.getElementById('trainerPhone').value = data.phoneNo;
    document.getElementById('trainerAge').value = data.age;
    document.getElementById('trainerGender').value = data.gender;
    document.getElementById('trainerSpecializations').value = data.specializations;
  })
  .catch(error => {
    console.error('Error:', error);
  });
}

// Function to handle form submission and update trainer profile
function updateTrainerProfile(event) {
    event.preventDefault(); // Prevent default form submission
    const trainerId = localStorage.getItem('trainerId');
    if (!trainerId) {
      console.error('No trainer ID found in local storage');
      return; // Exit if no ID is found
    }
    // Collect updated data from the form
    const updatedProfile = {
        name: document.getElementById('trainerName').value,
        phoneNo: document.getElementById('trainerPhone').value,
        age: document.getElementById('trainerAge').value,
        gender: document.getElementById('trainerGender').value,
        specializations: document.getElementById('trainerSpecializations').value
    };
  
    // Send an HTTP request to update the profile
    fetch('https://panther-training-club.glitch.me/api/trainer/' + trainerId + '/updateTrainerProfile', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('trainertoken')}`
            },
            body: JSON.stringify(updatedProfile)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            // Handle successful update
            console.log('Profile updated successfully:', data);
            alert("Profile Updated Successfully")
            // Optionally, update the UI or display a success message
        })
        .catch(error => {
            console.error('Error updating profile:', error);
            // Optionally, display an error message to the user
        });
}

// Initial fetch and display when page loads
document.addEventListener('DOMContentLoaded', fetchAndDisplayTrainerData);

// Add event listener for form submission
const form = document.getElementById('trainerProfileForm');
form.addEventListener('submit', updateTrainerProfile);

// Form submission event listener (if any)