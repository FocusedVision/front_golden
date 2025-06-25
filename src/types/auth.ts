interface RegisterCredentials {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface RegisterFormErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  general?: string;
}

interface RegisterResponse {
  user: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
  };
}

interface LoginCredentials {
  email: string;
  password: string;
  remember: boolean;
}

interface LoginFormErrors {
  email?: string;
  password?: string;
  general?: string;
}

interface LoginResponse {
  success: boolean;
  message: string;
  data: {
    user: {
      id: string;
      email: string;
      firstName: string | null;
      lastName: string | null;
      role: string;
      isActive: boolean;
      createdAt: string;
      updatedAt: string;
    };
    token: string;
    refreshToken?: string;
    expiresIn: number;
  };
}

export type {
  RegisterCredentials,
  RegisterFormErrors,
  RegisterResponse,
  LoginCredentials,
  LoginFormErrors,
  LoginResponse,
};
