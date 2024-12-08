export type CreateRegisterInput = {
  username: string;
  password: string;
  confirmPassword: string;
};

export type CreateLoginInput = {
  username: string;
  password: string;
};

export const resetRegisterForm = {
  username: '',
  password: '',
  confirmPassword: '',
};

export const resetLoginForm = {
  username: '',
  password: '',
};