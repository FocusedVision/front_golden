"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

interface ProtectedRouteProps {
  children: React.ReactNode;
  redirectTo?: string;
}

export function ProtectedRoute({
  children,
  redirectTo = "/auth/login",
}: ProtectedRouteProps) {
  const router = useRouter();
  const { isAuthenticated, token } = useSelector(
    (state: RootState) => state.auth,
  );

  useEffect(() => {
    // Check if user is authenticated
    if (!isAuthenticated || !token) {
      router.push(redirectTo);
      return;
    }

    // Check if token is expired
    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      const currentTime = Date.now() / 1000;

      if (payload.exp < currentTime) {
        // Token is expired, redirect to login
        router.push(redirectTo);
        return;
      }
    } catch (error) {
      // Invalid token format, redirect to login
      router.push(redirectTo);
      return;
    }
  }, [isAuthenticated, token, router, redirectTo]);

  // Show loading or nothing while checking authentication
  if (!isAuthenticated || !token) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return <>{children}</>;
}
