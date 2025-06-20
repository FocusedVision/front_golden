const VALIDATION_RULES = {
  NAME: {
    MIN_LENGTH: 2,
    MAX_LENGTH: 50,
    PATTERN: /^[a-zA-Z\s'-]+$/,
  },
  EMAIL: {
    PATTERN:
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
  },
  PASSWORD: {
    MIN_LENGTH: 8,
    MAX_LENGTH: 128,
    PATTERNS: {
      LOWERCASE: /(?=.*[a-z])/,
      UPPERCASE: /(?=.*[A-Z])/,
      NUMBER: /(?=.*\d)/,
      SPECIAL_CHAR: /(?=.*[!@#$%^&*(),.?":{}|<>])/,
    },
  },
} as const;

const ERROR_MESSAGES = {
  REQUIRED: {
    FIRST_NAME: "First name is required",
    LAST_NAME: "Last name is required",
    EMAIL: "Email address is required",
    PASSWORD: "Password is required",
    CONFIRM_PASSWORD: "Password confirmation is required",
    TERMS:
      "You must accept the Terms of Service and Privacy Policy to continue",
  },
  INVALID: {
    FIRST_NAME:
      "First name must contain only letters, spaces, hyphens, and apostrophes",
    LAST_NAME:
      "Last name must contain only letters, spaces, hyphens, and apostrophes",
    EMAIL: "Please enter a valid email address",
    PASSWORD_LENGTH: `Password must be between ${VALIDATION_RULES.PASSWORD.MIN_LENGTH} and ${VALIDATION_RULES.PASSWORD.MAX_LENGTH} characters`,
    PASSWORD_COMPLEXITY:
      "Password must include uppercase letters, lowercase letters, numbers, and special characters",
    CONFIRM_PASSWORD: "Passwords do not match",
  },
  LENGTH: {
    NAME_TOO_SHORT: `Name must be at least ${VALIDATION_RULES.NAME.MIN_LENGTH} characters`,
    NAME_TOO_LONG: `Name must not exceed ${VALIDATION_RULES.NAME.MAX_LENGTH} characters`,
  },
} as const;

// Individual validation functions
const validateName = (
  name: string,
  fieldName: "firstName" | "lastName",
): string | null => {
  const trimmedName = name.trim();
  const isFirstName = fieldName === "firstName";

  if (!trimmedName) {
    return isFirstName
      ? ERROR_MESSAGES.REQUIRED.FIRST_NAME
      : ERROR_MESSAGES.REQUIRED.LAST_NAME;
  }

  if (trimmedName.length < VALIDATION_RULES.NAME.MIN_LENGTH) {
    return ERROR_MESSAGES.LENGTH.NAME_TOO_SHORT;
  }

  if (trimmedName.length > VALIDATION_RULES.NAME.MAX_LENGTH) {
    return ERROR_MESSAGES.LENGTH.NAME_TOO_LONG;
  }

  if (!VALIDATION_RULES.NAME.PATTERN.test(trimmedName)) {
    return isFirstName
      ? ERROR_MESSAGES.INVALID.FIRST_NAME
      : ERROR_MESSAGES.INVALID.LAST_NAME;
  }

  return null;
};

const validateEmail = (email: string): string | null => {
  const trimmedEmail = email.trim();

  if (!trimmedEmail) {
    return ERROR_MESSAGES.REQUIRED.EMAIL;
  }

  if (!VALIDATION_RULES.EMAIL.PATTERN.test(trimmedEmail)) {
    return ERROR_MESSAGES.INVALID.EMAIL;
  }

  return null;
};

const validatePassword = (password: string): string | null => {
  if (!password) {
    return ERROR_MESSAGES.REQUIRED.PASSWORD;
  }

  if (
    password.length < VALIDATION_RULES.PASSWORD.MIN_LENGTH ||
    password.length > VALIDATION_RULES.PASSWORD.MAX_LENGTH
  ) {
    return ERROR_MESSAGES.INVALID.PASSWORD_LENGTH;
  }

  const hasLowercase =
    VALIDATION_RULES.PASSWORD.PATTERNS.LOWERCASE.test(password);
  const hasUppercase =
    VALIDATION_RULES.PASSWORD.PATTERNS.UPPERCASE.test(password);
  const hasNumber = VALIDATION_RULES.PASSWORD.PATTERNS.NUMBER.test(password);
  const hasSpecialChar =
    VALIDATION_RULES.PASSWORD.PATTERNS.SPECIAL_CHAR.test(password);

  if (!hasLowercase || !hasUppercase || !hasNumber || !hasSpecialChar) {
    return ERROR_MESSAGES.INVALID.PASSWORD_COMPLEXITY;
  }

  return null;
};

const validateConfirmPassword = (
  password: string,
  confirmPassword: string,
): string | null => {
  if (!confirmPassword) {
    return ERROR_MESSAGES.REQUIRED.CONFIRM_PASSWORD;
  }

  if (password !== confirmPassword) {
    return ERROR_MESSAGES.INVALID.CONFIRM_PASSWORD;
  }

  return null;
};

export {
  validateName,
  validateEmail,
  validatePassword,
  validateConfirmPassword,
  ERROR_MESSAGES,
};
