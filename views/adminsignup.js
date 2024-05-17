document.getElementById('admin-signup').addEventListener('submit', function(event) {
  event.preventDefault();
  let apiEndpoint = 'https://panther-training-club.glitch.me/api/admin/';
  
  
  // get admin details:
  var name = document.getElementById('name').value;
  var email = document.getElementById('email').value;
  var password = document.getElementById('password').value;
  var phone = document.getElementById('phone').value;
  var age = document.getElementById('age').value;
  var gender = document.getElementById('gender').value;
  var height = document.getElementById('height').value;
  var weight = document.getElementById('weight').value;
  

  var formData = {
    name: name,
    email: email,
    password: password,
    phoneNo: phone,
    age: age,
    gender: gender,
    height: height,
    weight: weight
  };
  console.log(JSON.stringify(formData));
  //let jsonData = JSON.stringify(formData);
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
    if (data.message) {
      // Display success message and potentially redirect
      alert("Sign up Successful: " + data.message);
      // Redirect to login page or wherever you wish
      redirectToPage('/adminlogin');
    } else {
      // Display error message
      alert("Sign up Failed: " + data.message);
    }
  })
  .catch((error) => {
    console.error('Error:', error);
    alert('Signup failed: ' + error.message);
  });
});
function redirectToPage(path) {
  window.location.href = path;
}