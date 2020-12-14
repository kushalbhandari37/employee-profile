Clone the project first then run "npm install" to install all the dependancies.

Type "npm run server" to run server. I have used MongoDB atlas for DB and used bcrypt for password encryption. Also, I have used Gravatar for user avatar.

API URLs:
1.  Registering User:
POST http://localhost:5000/api/users

2.  Login User(Employee):
POST http://localhost:5000/api/auth

3.  Creating and updating Employee Profile:
POST http://localhost:5000/api/profile

4.  Deleting User(Deletes both user and profile):
Delete http://localhost:5000/api/profile

5.  Get Current User Details:
GET http://localhost:5000/api/profile/me
