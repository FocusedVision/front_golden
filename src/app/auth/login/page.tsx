"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import styles from "./page.module.css";
import { LoginFormErrors, LoginCredentials } from "@/types/auth";
import { validateEmail, validatePassword } from "./page.rule";
import { loginUser } from "@/store/slices/authSlice";
import { RootState, AppDispatch } from "@/store";

export default function LoginPage() {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);

  const [formData, setFormData] = useState<LoginCredentials>({
    email: "",
    password: "",
    remember: false,
  });

  const [errors, setErrors] = useState<LoginFormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      router.push("/dashboard");
    }
  }, [isAuthenticated, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setErrors({});

    try {
      const result = await dispatch(
        loginUser({
          email: formData.email,
          password: formData.password,
          remember: formData.remember,
        }),
      ).unwrap();

      // If login successful, redirect to dashboard
      router.push("/dashboard");
    } catch (error: any) {
      setErrors({
        general: error || "Login failed. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const validateForm = (): boolean => {
    const validationErrors: LoginFormErrors = {};

    const emailError = validateEmail(formData.email);
    if (emailError) {
      validationErrors.email = emailError;
    }

    const passwordError = validatePassword(formData.password);
    if (passwordError) {
      validationErrors.password = passwordError;
    }

    setErrors(validationErrors);
    return Object.keys(validationErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") {
      setFormData({ ...formData, [name]: checked });
    } else {
      setFormData({ ...formData, [name]: value });
    }

    // Clear error for this field when user starts typing
    if (errors[name as keyof LoginFormErrors]) {
      setErrors({ ...errors, [name]: undefined });
    }
  };

  const handleSocialLogin = (provider: "google") => {
    console.log(`Signing in with ${provider}`);
    // TODO: Implement social login
  };

  return (
    <div className={styles.section}>
      <div className={styles.formContainer}>
        <h1 className={styles.formTitle}>Sign in</h1>

        <form onSubmit={handleSubmit} className={"w-full"}>
          <div className={styles.inputGroup}>
            <label htmlFor="email" className={styles.label}>
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="Your Email"
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

          <div className={styles.termsContainer}>
            <div className={styles.checkboxContainer}>
              <input
                id="remember"
                name="remember"
                type="checkbox"
                checked={formData.remember}
                onChange={handleChange}
                disabled={isSubmitting}
                className={styles.checkbox}
              />
              <label htmlFor="remember" className={styles.checkboxLabel}>
                Remember me
              </label>
            </div>
          </div>

          {errors.general && (
            <span className={styles.errorText}>{errors.general}</span>
          )}

          <button
            type="submit"
            disabled={isSubmitting || isLoading}
            className={styles.submitButton}
          >
            {isSubmitting || isLoading ? (
              <div className={styles.submitButtonLoading}>
                <div className={styles.spinner}></div>
                Signing in...
              </div>
            ) : (
              "Sign in"
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
              onClick={() => handleSocialLogin("google")}
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

          <div className={styles.registerContainer}>
            <span className={styles.registerText}>
              Don't have an account?{" "}
              <a href="/auth/register" className={styles.registerLink}>
                Sign up here
              </a>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
}
