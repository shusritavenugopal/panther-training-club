**Project Report: Panther Training Club**

**Introduction:**
Panther Training Club is a comprehensive fitness web application built using Node.js, Express.js, MongoDB, JavaScript, and EJS templating framework. It caters to gym enthusiasts by providing a platform to register, log in, and book trainers for health and training purposes. The application offers distinct user roles for gym members, trainers, and administrators.

**Objective:**
The primary objective of the project was to create a user-friendly and secure platform for gym enthusiasts to connect with trainers and access personalized fitness services. We aimed to implement features such as user authentication, profile management, booking functionalities, and admin privileges. Beyond the basic requirements, our goal was to ensure efficient data management, robust security measures, and a seamless user experience.

**Technical Architecture:**
The application follows the MVC (Model-View-Controller) architecture:
- **Models:** Define data structures and interact with MongoDB collections. Includes schemas for administrators, members, trainers, and bookings.
- **Views:** Render dynamic HTML pages using the EJS templating engine. Includes pages for user authentication, profile management, booking forms, and admin dashboard.
- **Controllers:** Handle user requests, process data, and invoke appropriate models. Responsible for implementing business logic and interacting with views to render responses.

**Functionality:**

1. Gym members can register and log in to the web app.
2. Both gym members and trainers have an exclusive profile page where they can view and update their details, except for email.
3. Gym members can book a trainer by specifying their fitness goals, preferred workout, dietary restrictions, health issues, and additional comments.
4. Bookings made by gym members are stored in the database.
5. Trainers can view bookings on their homepage based on their specialization. For example, a Zumba instructor can see all bookings for Zumba sessions.
6. Admin login functionality allows administrators to view all accounts of trainers and members and delete them if necessary.

**Implementation Details:**

- The project follows the MVC (Model-View-Controller) architecture using Node.js, Express.js, and EJS templating system.
- Log-in and sign-up functionalities are implemented using JWT (JSON Web Tokens) for authentication.
- Admin capabilities are included to perform advanced functions accessible only to specific admin users.
- Session management is implemented using JWT with an expiration feature.
- RESTful Web service API with CRUD operations is used, following proper structure and documented with Postman.
- The web app handles login and updating profile capabilities efficiently.
- Customized interfaces are provided for different user types, such as admin view, trainer view, and member view.
- Web forms for signup, login, profile page, and profile editing are implemented with form validation.

**Challenges:**
- Connecting to MongoDB.
- Ensuring proper error handling and validation for user inputs demanded attention to detail to maintain data integrity and security.
- Fine-tuning the frontend design for responsiveness across different devices and browsers was a continuous challenge throughout the development process.

**Future Work:**
- Interaction between the trainers and members. 
- Introduce a rating and feedback system to gather user reviews and improve service quality.
- Enhance data analytics capabilities to provide personalized recommendations based on user preferences and progress.

**Conclusion:**
The Panther Training Club project provided valuable insights into web development technologies and standards. By successfully implementing a feature-rich fitness application with robust security measures and a user-friendly interface, we achieved our objectives. The project enabled us to deepen our understanding of web technologies and prepare for future endeavors in software development.

**Resources and references:**
- [MongoDB documentation](https://www.mongodb.com/community/forums/t/expressjs-server-not-getting-connected-with-the-mongodb-atlas-cluster/220686)
- [JWT](https://www.youtube.com/watch?v=7Q17ubqLfaM)
- [project reference for JWT, ejs, and organising file structure](https://glitch.com/edit/#!/pittdash)
- [Express Api](https://www.geeksforgeeks.org/how-to-implement-jwt-authentication-in-express-js-app/)
- [npm](https://www.npmjs.com/package/express)
- [Express with mongoDB](https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/mongoose#setting_up_the_mongodb_database)
- [JWT auth](https://www.youtube.com/watch?v=favjC6EKFgw)
- [Delete functions](https://www.geeksforgeeks.org/express-js-app-delete-function/)
- [method overriding](https://philipm.at/2017/method-override_in_expressjs.html)
- [RESTful API testing with postman](https://web.postman.co/)
- [Web application reference](https://www.mapmyfitness.com/)
- [Web application reference images](https://www.cult.fit/)
- [Express.js with mongoDB activity](https://glitch.com/edit/#!/shv73-activity9)

**Testing Instructions:**
- Register as a gym member or trainer using valid credentials.
- Log in to access exclusive features such as profile management and booking.
- Update profile details, including age and weight, from the profile page.
- Book a trainer by specifying goals, preferred workout, dietary restrictions, and health issues.
- Ensure proper functionality of admin capabilities, including account deletion and user management.

## API Documentation

### 1. Get All Members
- **Method:** GET
- **Endpoint:** `/api/admin/members`
- **Description:** Retrieves a list of all gym members.
- **Output Format:**
  ```json
  {
      "members": [
          {
              "_id": "66315e263b74fcb47fa107d6",
              "name": "Shusrita Venugopal",
              "email": "shv73@pitt.edu",
              "phoneNo": "4126264706",
              "age": 24,
              "gender": "female",
              "height": 154,
              "weight": 50
          },
          {
              "_id": "663168c7b3ecaa58c73ab38a",
              "name": "Bhavana Devulapally",
              "email": "bhd30@pitt.edu",
              "phoneNo": "4125435612",
              "age": 22,
              "gender": "female",
              "height": 182,
              "weight": 55
          }
      ]
  }
  ```

### 2. Get All Trainers
- **Method:** GET
- **Endpoint:** `/api/admin/trainers`
- **Description:** Retrieves a list of all gym trainers.
- **Output Format:**
  ```json
  {
      "trainers": [
          {
              "_id": "663070601dd800a383bd1118",
              "name": "Bhavana Devulapally",
              "email": "bhd30@pitt.edu",
              "phoneNo": "4125468486",
              "age": 22,
              "gender": "female",
              "specializations": "Zumba"
          },
          {
              "_id": "66310ff6e0629b418d2c85c2",
              "name": "Shusrita Venugopal",
              "email": "shv73@gmail.com",
              "phoneNo": "4122223333",
              "age": 24,
              "gender": "female",
              "specializations": "Yoga"
          }
      ]
  }
  ```

### 3. Delete Member
- **Method:** DELETE
- **Endpoint:** `/api/admin/members/{memberId}`
- **Description:** Deletes a gym member with the specified ID.

### 4. Get Member Details
- **Method:** GET
- **Endpoint:** `/api/member/{memberId}`
- **Description:** Retrieves details of a gym member with the specified ID.
- **Output Format:**
  ```json
  {
      "_id": "66315e263b74fcb47fa107d6",
      "name": "Shusrita Venugopal",
      "email": "shv73@pitt.edu",
      "phoneNo": "4126264706",
      "age": 24,
      "gender": "female",
      "height": 154,
      "weight": 50
  }
  ```

### 5. Get Trainer Details
- **Method:** GET
- **Endpoint:** `/api/trainer/{trainerId}`
- **Description:** Retrieves details of a gym trainer with the specified ID.
- **Output Format:**
  ```json
  {
      "_id": "663070601dd800a383bd1118",
      "name": "Bhavana Devulapally",
      "email": "bhd30@pitt.edu",
      "phoneNo": "4125468486",
      "age": 22,
      "gender": "female",
      "specializations": "Zumba"
  }
  ```

### 6. Get Bookings for Trainers
- **Method:** GET
- **Endpoint:** `/api/booktrainer/`
- **Description:** Retrieves all bookings for trainers.
- **Output Format:**
  ```json
  [
      {
          "_id": "66315e4c3b74fcb47fa107da",
          "memberId": "66315e263b74fcb47fa107d6",
          "goal": "Training",
          "preferredWorkout": "Yoga",
          "foodPreferences": "vegan",
          "medicalHistory": "",
          "additionalMessage": ""
      },
      {
          "_id": "6631690eb3ecaa58c73ab38d",
          "memberId": "663168c7b3ecaa58c73ab38a",
          "goal": "Build Muscles",
          "preferredWorkout": "Weights",
          "foodPreferences": "eggetarian",
          "medicalHistory": "Nothing.",
          "additionalMessage": "Preferred on Weekends."
      },
      {
          "_id": "6631697bb3ecaa58c73ab395",
          "memberId": "663168c7b3ecaa58c73ab38a",
          "goal": "Build Muscles",
          "preferredWorkout": "Zumba",
          "foodPreferences": "eggetarian",
          "medicalHistory": "Nothing",
          "additionalMessage": "Weekends are preferred."
      },
      {
          "_id": "66316a29b3ecaa58c73ab39d",
          "memberId": "663168c7b3ecaa58c73ab38a",
          "goal": "Build Muscles",
          "preferredWorkout": "Zumba",
          "foodPreferences": "eggetarian",
          "medicalHistory": "Nothing",
          "additionalMessage": "NA"
      }
  ]
  ```

### 7. Update Trainer Profile
- **Method:** PUT
- **Endpoint:** `/api/trainer/{trainerId}/updateTrainerProfile`
- **Description:** Updates the profile of a gym trainer with the specified ID.
- **Request Body Format:**
  ```json
  {
      "_id": "663070601dd800a383bd1118",
      "name": "Bhavana Devulapally",
      "email": "bhd30@pitt.edu",
      "password": "$2b$10$ZKUZSgYggX.dLBXTAgPSKOw3O7Lsau4Ag7irXRtXS8G7MQusbrWpS",
      "phoneNo": "4125468486",
      "age": 22,
      "gender": "female",
      "specializations": "Zumba",
      "reviews": [],
      "__v": 0
  }
  ```
- **Response Format:**
  - If successful:
    - Status Code: 200
    - Response Body: Updated trainer profile object
  - If unsuccessful:
    - Status Code: 400 (Bad Request) or 404 (Not Found)
    - Response Body: Error message explaining the reason for failure.
    
    

# CRUD Operations Implementation

In this project, we have successfully implemented all four CRUD (Create, Read, Update, Delete) operations to 
manage both trainer and member accounts. Below is a comprehensive overview of how each operation was executed:

## 1. Create (C)

- **Create Trainer and Member Accounts:** 
  - Implemented functionality to allow the creation of new trainer and member accounts.
  - Users can register by providing necessary information such as name, email, password, etc.
  - Authentication mechanisms were integrated to ensure secure account creation, including password hashing and validation checks.

## 2. Read (R)

- **Read Data Operations:**
  - Developed functionalities to retrieve data from the database for both trainers and members.
  - Users can view their profile information after logging in, including personal details, contact information, and other relevant data.
  - Additionally, administrators have access to read information about all trainers and members registered in the system.

## 3. Update (U)

- **Update Profile Information:**
  - Users, both trainers, and members, can update their profile information as needed.
  - This includes modifying personal details such as name, email, phone number, address, etc.
  - The update functionality ensures data integrity and security by validating inputs and performing necessary checks before updating the database.

## 4. Delete (D)

- **Delete Member or Trainer Accounts:**
  - Administrators are granted the authority to delete member or trainer accounts if required.
  - This feature allows the removal of accounts that are no longer needed .
  - Deletion operations are performed securely, ensuring that associated data is properly handled and removed from the database.

  