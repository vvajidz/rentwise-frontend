export interface LoginFormData {
  email: string;
  password: string;
}

export interface ApiError {
  response?: {
    data?: {
      message?: string;
    };
  };
}