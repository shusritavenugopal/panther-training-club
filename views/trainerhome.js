var trainerData;
let filteredTrainerBookings;
function fetchAndDisplayTrainerName() {
    const trainerId = localStorage.getItem('trainerId');
    // Fetch the trainer's name from the server
    const apiEndpoint = 'https://panther-training-club.glitch.me/api/trainer/' + trainerId;
    fetch(apiEndpoint, {
        method: 'GET',
        headers: {
            'Content': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('trainertoken')}` 
        }
    })
    .then(response => response.json())
    .then(data => {
        trainerData = data;
        // Display the trainer's name in the HTML
        document.getElementById('trainerName').textContent = "Welcome, " + data.name;
        
        
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

function fetchMembers() {
  const apiEndpoint = 'https://panther-training-club.glitch.me/api/booktrainer/';
  fetch(apiEndpoint, {
    method: 'GET',
    headers: {
      'Content': 'application/json',
    }
  })
  .then(response => response.json())
  .then(bookings => {
    const filteredBookings = bookings.filter(booking => {
      return trainerData.specializations.includes(booking.preferredWorkout);
    });
    // Do something with filteredBookings
    console.log(filteredBookings);
    
    filteredTrainerBookings = filteredBookings;
    fetchMemberDetails(filteredBookings) 
  })
  .catch(error => {
    console.error('Error:', error);
  });
}


function fetchMemberDetails(filteredBookings) {
  const detailsContainer = document.getElementById('detailsContainer');

  filteredBookings.forEach(filteredBooking => {
    const memberId = filteredBooking.memberId;
    const apiEndpoint = 'https://panther-training-club.glitch.me/api/member/' + memberId;
    fetch(apiEndpoint, {
      method: 'GET',
      headers: {
        'Content': 'application/json',
      }
    })
    .then(response => response.json())
    .then(memberData => {
      const { name, email, phoneNo, gender, height, weight } = memberData;
      const bookingDetails = `
        <h4>Member Details</h4>
        <p><b>Name:</b> ${name}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Phone Number:</b> ${phoneNo}</p>
        <p><b>Gender:</b> ${gender}</p>
        <p><b>Height:</b> ${height}</p>
        <p><b>Weight:</b> ${weight}</p>
        <hr width="100%" size="3" color="black">
        <h4>Booking Details</h4>
        <p><b>Goal:</b> ${filteredBooking.goal}</p>
        <p><b>Preferred Workout:</b> ${filteredBooking.preferredWorkout}</p>
        <p><b>Food Preferences:</b> ${filteredBooking.foodPreferences}</p>
        <p><b>Medical History:</b> ${filteredBooking.medicalHistory}</p>
        <p><b>Additional Message:</b> ${filteredBooking.additionalMessage}</p>
        
      `;
      const detailsBox = document.createElement('div');
      detailsBox.classList.add('box-container');
      detailsBox.innerHTML = bookingDetails;
      detailsContainer.appendChild(detailsBox);
    })
    .catch(error => {
      console.error('Error fetching member and booking details:', error);
    });
  });
  
  
}

// Execute the function when the page loads
document.addEventListener('DOMContentLoaded', fetchAndDisplayTrainerName);
document.addEventListener('DOMContentLoaded', fetchMembers);


