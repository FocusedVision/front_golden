"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { RegisterCredentials, FormErrors } from "@/types/register";
import { registerUser } from "@/store/slices/authSlice";
import { AppDispatch, RootState } from "@/store";
import styles from "./page.module.css";
import {
  validateName,
  validateEmail,
  validatePassword,
  validateConfirmPassword,
  ERROR_MESSAGES,
} from "./page.rule";

export default function RegisterPage() {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  const [formData, setFormData] = useState<RegisterCredentials>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setErrors({});

    try {
      const registrationData = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        password: formData.password,
      };

      const result = await dispatch(registerUser(registrationData));
    } catch (error) {
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSocialRegister = (provider: "google") => {
    alert(`This is social register mode`);
  };

  const handleTermsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAcceptTerms(e.target.checked);
  };

  const validateForm = (): boolean => {
    const validationErrors: FormErrors = {};

    const firstNameError = validateName(formData.firstName, "firstName");
    if (firstNameError) {
      validationErrors.firstName = firstNameError;
    }

    const lastNameError = validateName(formData.lastName, "lastName");
    if (lastNameError) {
      validationErrors.lastName = lastNameError;
    }

    const emailError = validateEmail(formData.email);
    if (emailError) {
      validationErrors.email = emailError;
    }

    const passwordError = validatePassword(formData.password);
    if (passwordError) {
      validationErrors.password = passwordError;
    }

    const confirmPasswordError = validateConfirmPassword(
      formData.password,
      formData.confirmPassword,
    );
    if (confirmPasswordError) {
      validationErrors.confirmPassword = confirmPasswordError;
    }

    if (!acceptTerms) {
      validationErrors.general = ERROR_MESSAGES.REQUIRED.TERMS;
    }

    setErrors(validationErrors);
    return Object.keys(validationErrors).length === 0;
  };

  return (
    <div className={styles.section}>
      <div className={styles.formContainer}>
        <h1 className={styles.formTitle}>Create your account</h1>
        <p className={styles.formSubtitle}>Join us today and get started</p>

        <form onSubmit={handleSubmit} className={"w-full"}>
          <div className={styles.nameRow}>
            <div className={styles.inputGroup}>
              <label htmlFor="firstName" className={styles.label}>
                First Name
              </label>
              <input
                id="firstName"
                name="firstName"
                type="text"
                placeholder="Your First Name"
                value={formData.firstName}
                onChange={handleChange}
                className={`${styles.input} ${errors.firstName ? styles.error : ""}`}
                disabled={isSubmitting}
              />
              {errors.firstName && (
                <span className={styles.errorText}>{errors.firstName}</span>
              )}
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="lastName" className={styles.label}>
                Last Name
              </label>
              <input
                id="lastName"
                name="lastName"
                type="text"
                placeholder="Your Last Name"
                value={formData.lastName}
                onChange={handleChange}
                className={`${styles.input} ${errors.lastName ? styles.error : ""}`}
                disabled={isSubmitting}
              />
              {errors.lastName && (
                <span className={styles.errorText}>{errors.lastName}</span>
              )}
            </div>
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="email" className={styles.label}>
              Email Address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="Your Email Address"
              value={formData.email}
              onChange={handleChange}
              className={`${styles.input} ${errors.email ? styles.error : ""}`}
              disabled={isSubmitting}
            />
            {errors.email && (
              <span className={styles.errorText}>{errors.email}</span>
            )}
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="password" className={styles.label}>
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
              className={`${styles.input} ${errors.password ? styles.error : ""}`}
              disabled={isSubmitting}
            />
            {errors.password && (
              <span className={styles.errorText}>{errors.password}</span>
            )}
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="confirmPassword" className={styles.label}>
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              placeholder="••••••••"
              value={formData.confirmPassword}
              onChange={handleChange}
              className={`${styles.input} ${errors.confirmPassword ? styles.error : ""}`}
              disabled={isSubmitting}
            />
            {errors.confirmPassword && (
              <span className={styles.errorText}>{errors.confirmPassword}</span>
            )}
          </div>

          <div className={styles.termsContainer}>
            <div className={styles.checkboxContainer}>
              <input
                id="acceptTerms"
                name="acceptTerms"
                type="checkbox"
                checked={acceptTerms}
                onChange={handleTermsChange}
                disabled={isSubmitting}
                className={styles.checkbox}
              />
              <label htmlFor="acceptTerms" className={styles.checkboxLabel}>
                I agree to the{" "}
                <a href="/terms" className={styles.link}>
                  Terms of Service
                </a>{" "}
                and{" "}
                <a href="/privacy" className={styles.link}>
                  Privacy Policy
                </a>
              </label>
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting || isLoading}
            className={styles.submitButton}
          >
            {isSubmitting || isLoading ? (
              <div className={styles.submitButtonLoading}>
                <div className={styles.spinner}></div>
                Creating account...
              </div>
            ) : (
              "Create Account"
            )}
          </button>

          <div className={styles.dividerContainer}>
            <div className={styles.dividerLine}></div>
            <span className={styles.dividerText}>or</span>
            <div className={styles.dividerLine}></div>
          </div>

          <div className={styles.socialContainer}>
            <button
              type="button"
              onClick={() => handleSocialRegister("google")}
              disabled={isSubmitting || isLoading}
              className={styles.socialButton}
            >
              <svg
                className={styles.socialIcon}
                width={20}
                height={20}
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
              </svg>
              Sign up with Google
            </button>
          </div>

          <div className={styles.loginContainer}>
            <span className={styles.loginText}>
              Already have an account?{" "}
              <a href="/auth/login" className={styles.loginLink}>
                Sign in here
              </a>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
}
