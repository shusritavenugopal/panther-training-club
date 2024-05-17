// Function to fetch and display member data
function fetchAndDisplayMemberData() {
  const memberId = localStorage.getItem('memberId');
  if (!memberId) {
    console.error('No member ID found in local storage');
    return; // Exit if no ID is found
  }

  const apiEndpoint = 'https://panther-training-club.glitch.me/api/member/' + memberId;
  
  fetch(apiEndpoint, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
       'Authorization': `Bearer ${localStorage.getItem('membertoken')}`
    }
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => {
    // Populate the member profile form with the data
    document.getElementById('memberName').value = data.name;
    document.getElementById('memberEmail').value = data.email;
    document.getElementById('memberPhone').value = data.phoneNo;
    document.getElementById('memberAge').value = data.age;
    document.getElementById('memberGender').value = data.gender;
    document.getElementById('memberHeight').value = data.height;
    document.getElementById('memberWeight').value = data.weight;
  })
  .catch(error => {
    console.error('Error:', error);
  });
}

// Function to handle form submission and update member profile
function updateMemberProfile(event) {
    event.preventDefault(); // Prevent default form submission
    const memberId = localStorage.getItem('memberId');
    if (!memberId) {
      console.error('No member ID found in local storage');
      return; // Exit if no ID is found
    }
    // Collect updated data from the form
    const updatedProfile = {
        name: document.getElementById('memberName').value,
        phoneNo: document.getElementById('memberPhone').value,
        age: document.getElementById('memberAge').value,
        gender: document.getElementById('memberGender').value,
        height: document.getElementById('memberHeight').value,
        weight: document.getElementById('memberWeight').value
    };
  
    // Send an HTTP request to update the profile
    fetch('https://panther-training-club.glitch.me/api/member/' + memberId + '/updateMemberProfile', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('membertoken')}`
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
document.addEventListener('DOMContentLoaded', fetchAndDisplayMemberData);

// Add event listener for form submission
const form = document.getElementById('memberProfileForm');
form.addEventListener('submit', updateMemberProfile);

// Form submission event listener (if any)