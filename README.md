## How to run api locally

- Step 1 - Clone the git repository

- Step 2 - Open cmd and check the node version. Node 14 (or newer) is required
  ```
  node -v
  ```

- Step 2 - Paste .env file into the repository folder

- Step 4 - Open CMD from repository folder and install npm package
  ```
  npm install
  npm run build
  npm start
  ```
- Step 5 - Open link in the browser
  ```
  http://localhost:5000/
  ```

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

## Future improvement

- Improve UX: status massages in browser
- Improve authentication mechanism
- Separate client app from webApi
- Build docker image
- Configure CICD pipeline
- Automated tests
