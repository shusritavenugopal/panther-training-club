document.getElementById('scheduleTrainerForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const apiEndpoint = 'https://panther-training-club.glitch.me/api/booktrainer/';
  
    // Fetching basic booking details
    var goal = document.getElementById('goal').value;
    var preferredWorkout = document.getElementById('preferredWorkout').value;
    var foodPreferences = document.getElementById('foodPreferences').value;
    var medicalHistory = document.getElementById('medicalHistory').value;
    var additionalMessage = document.getElementById('additionalMessage').value;
    var memberId = localStorage.getItem("memberId");
    //var preferredTrainerId = getPreferredTrainer(preferredWorkout);
    
    var bookingData = {
      memberId: memberId,
      goal: goal,
      preferredWorkout: preferredWorkout,
      foodPreferences: foodPreferences,
      medicalHistory: medicalHistory,
      additionalMessage: additionalMessage
    };
    console.log(JSON.stringify(bookingData));
  
    // Send the form data to the backend
    fetch(apiEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(bookingData),
    })
    .then(response => response.json())
    .then(data => {
      if (data.message) {
        // Success case
        alert("Booking Successful: " + data.message);
        redirectToPage('/memberhome');
      } else {
        // Handle any messages that might not signify success
        alert("Booking failed: " + (data.message || "Unknown error"));
      }
    })
    .catch((error) => {
      console.error('Error:', error);
      alert("Booking failed: " + error.message);
    });
  });
  
  function redirectToPage(path) {
    window.location.href = path;
  }
  
  function getPreferredTrainer(preferredWorkout) {
    var trainersData;
    
    // get all trainers:
    const trainerEndPoint = 'https://panther-training-club.glitch.me/api/trainer/';
    fetch(trainerEndPoint, {
          method: 'GET'
      })
      .then(response => response.json())
      .then(data => {
          trainersData = data;
      })
      .catch(error => console.error('Error:', error));
  
    // parse all the trainers data to find the trainer's specialization to match with form data.
    const preferredTrainers = trainersData.filter(trainer => trainer.specialization.includes(preferredWorkout));
    
    // retrive trainer ID and assign this member to the preferred trainer:
    var preferredTrainerId;
    if (preferredTrainers.length > 0) {
        preferredTrainerId = preferredTrainers[0]._id; // Assuming you want to select the first trainer with specialization in yoga
    } else {
        console.log("No trainers found with specialization");
    }
    return preferredTrainerId;
  }