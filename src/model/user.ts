interface User {
  email: string;
  firstName: string;
  lastName: string;
  username: string;
  password: string;
}

interface ExistingUser extends User {
  id: string;
}

export { User, ExistingUser };
