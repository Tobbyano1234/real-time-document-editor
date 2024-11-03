export type SignupFormValues = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export type InitialState = {
  userDetails: UserDetails | null;
  token: string | null;
  isLoggedIn: boolean;
};

export type UserDetails = {
  name: string;
  avatar?: string;
  email: string;
  _id: string;
  color: string;
};
