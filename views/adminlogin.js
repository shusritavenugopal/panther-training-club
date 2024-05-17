document.getElementById('login').addEventListener('submit', function(event) {
  event.preventDefault();
  
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  let apiEndpoint = 'https://panther-training-club.glitch.me/api/admin/login';
  
  let formData = {
    email,
    password
  };
  
  // Send the form data to the backend
  fetch(apiEndpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData),
  })
  .then(response => response.json())
  .then(data => {
    if (data.token) {
      // Save the token and redirect or display logged in state
      localStorage.setItem('admintoken', data.token);
      localStorage.setItem('adminId', data.adminId);
      //document.getElementById('message').textContent = 'Logged in successfully';
      alert("Logged in Successfully: " + data.message);
      // Redirect to profile page or wherever you wish
      window.location.href = '/adminhome';
    } else {
      //document.getElementById('message').textContent = data.message;
      alert("Log in Failed: " + data.message);
    }
  })
  .catch((error) => {
    console.error('Error:', error);
    document.getElementById('message').textContent = 'Login failed: ' + error.message;
  });
});
