## How to run api

The web service is hosted on Azure appService.
  ```
  https://authserviceps.azurewebsites.net/
  ```

## How to run api locally

Step 1 - Clone the git repository

Step 2 - Open cmd and check the node version. Node 14 (or newer) is required
  ```
  node -v
  ```

Step 2 - Paste [.env](https://drive.google.com/drive/folders/1FUgprbfIlTmGLC1suaLDq31dvTww-m61?usp=sharing) file into the repository folder

Step 4 - Open CMD from repository folder and run the npm commands
  ```
  npm install
  npm run build
  npm start
  ```
Step 5 - Open link in the browser
  ```
  http://localhost:5000/
  ```
  
## Architecture

#### Clean architecture

![alt text](https://github.com/zcavic/AuthenticationService/blob/main/documentation/AuthServicePS-Arch.png?raw=true)

#### Sequential diagram for reset password

![alt text](https://github.com/zcavic/AuthenticationService/blob/main/documentation/AuthServicePS-Seq.png?raw=true)

# APIs

Home page

```bash
GET /
```

The page simulates confidential data and it is visible only for logged users

```bash
GET /confidential
```

Opens form where user can enter the sign up data 

```bash
GET /auth/signup
```

Create a new user. Username and email have to be unique.

```bash
POST /auth/signup
```

Opens form where user can enter the login data 

```bash
GET /auth/login
```

Login user. The username and password have match to one of the existing users.

```bash
POST /auth/login
```

Opens form where user can enter the email and ask for password reset 

```bash
GET /auth/forgotPassword
```

Send email for password reset. The email has to belong to one of the existing users

```bash
POST /auth/forgotPassword
```

Opens form where user can reset password

```bash
GET /auth/changePassword/:token
```

Save the new password

```bash
POST /auth/changePassword/:token
```

## What is done

Create a new user:
 - Basic html for that purpose
 - Required email, password & full name
 - User is saved into database after creation

Login the user
 - Basic html for that purpose
 - Required email, password
 - Validate the user info
 - Fail the API on mismatch
 - Redirect the user to the confidental data page
 
 Reset password
  - Basic html for that purpose
  - User will need to provide his email
  - The email is sent by SendGrid to the user email with a reset password link 
  - Clicking on the link allows the user to change the previous password
  - When the user change the password, user will be redirected to the login page

Testing tool:
  - Postman
 
## Future improvement

- Use JWT token for authentication mechanism
- Automated tests
- Improve UX: status massages in browser
- Separate client app from webApi
- Build docker image
- Configure CICD pipeline
