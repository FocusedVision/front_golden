const VALIDATION_RULES = {
  EMAIL: {
    MIN_LENGTH: 3,
    MAX_LENGTH: 255,
    PATTERN:
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
  },
  PASSWORD: {
    MIN_LENGTH: 8,
    MAX_LENGTH: 128,
  },
} as const;

const ERROR_MESSAGES = {
  REQUIRED: {
    EMAIL: "Email is required",
    PASSWORD: "Password is required",
  },
  INVALID: {
    EMAIL: "Please enter a valid email address",
    PASSWORD: "Password must be at least 8 characters long",
  },
} as const;

const validateEmail = (email: string): string | undefined => {
  if (!email) {
    return ERROR_MESSAGES.REQUIRED.EMAIL;
  }

  if (email.length < VALIDATION_RULES.EMAIL.MIN_LENGTH) {
    return ERROR_MESSAGES.INVALID.EMAIL;
  }

  if (email.length > VALIDATION_RULES.EMAIL.MAX_LENGTH) {
    return ERROR_MESSAGES.INVALID.EMAIL;
  }

  if (!VALIDATION_RULES.EMAIL.PATTERN.test(email)) {
    return ERROR_MESSAGES.INVALID.EMAIL;
  }

  return undefined;
};

const validatePassword = (password: string): string | undefined => {
  if (!password) {
    return ERROR_MESSAGES.REQUIRED.PASSWORD;
  }

  if (password.length < VALIDATION_RULES.PASSWORD.MIN_LENGTH) {
    return ERROR_MESSAGES.INVALID.PASSWORD;
  }

  if (password.length > VALIDATION_RULES.PASSWORD.MAX_LENGTH) {
    return ERROR_MESSAGES.INVALID.PASSWORD;
  }

  return undefined;
};

export { validateEmail, validatePassword };
