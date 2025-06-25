"use client";

import { useState, useEffect, useCallback } from "react";
import { HOME_LAYOUT_CONSTANTS } from "@/constant";
import { HomeLayoutState } from "@/types/home";

export const useLayout = () => {
  const [state, setState] = useState<HomeLayoutState>({
    sidebar: {
      open: true,
      collapsed: false,
    },
    profileMenuAnchor: null,
    isHydrated: false,
  });

  useEffect(() => {
    const initializeLayout = () => {
      setState((prev) => ({
        ...prev,
        sidebar: {
          open: true,
          collapsed: false, // Keep sidebar expanded to show text labels
        },
        isHydrated: true,
      }));
    };

    initializeLayout();

    // Handle window resize
    const handleResize = () => {
      setState((prev) => ({
        ...prev,
        sidebar: {
          ...prev.sidebar,
          // Adjust sidebar behavior based on screen size if needed
        },
      }));
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleSidebarToggle = useCallback(() => {
    const isMobile =
      window.innerWidth < HOME_LAYOUT_CONSTANTS.SIDEBAR.MOBILE_BREAKPOINT;

    setState((prev) => {
      if (isMobile) {
        // On mobile, toggle open/close
        return {
          ...prev,
          sidebar: {
            ...prev.sidebar,
            open: !prev.sidebar.open,
          },
        };
      } else {
        // On desktop, toggle collapsed/expanded
        if (prev.sidebar.open) {
          return {
            ...prev,
            sidebar: {
              ...prev.sidebar,
              collapsed: !prev.sidebar.collapsed,
            },
          };
        } else {
          return {
            ...prev,
            sidebar: {
              open: true,
              collapsed: false,
            },
          };
        }
      }
    });
  }, []);

  const handleSidebarClose = useCallback(() => {
    setState((prev) => ({
      ...prev,
      sidebar: {
        ...prev.sidebar,
        open: false,
      },
    }));
  }, []);

  const handleProfileMenuOpen = useCallback(
    (event: React.MouseEvent<HTMLElement>) => {
      const currentTarget = event.currentTarget;
      setState((prev) => ({
        ...prev,
        profileMenuAnchor: currentTarget,
      }));
    },
    [],
  );

  const handleProfileMenuClose = useCallback(() => {
    setState((prev) => ({
      ...prev,
      profileMenuAnchor: null,
    }));
  }, []);

  const getCurrentSidebarWidth = useCallback(() => {
    const isMobile =
      typeof window !== "undefined" &&
      window.innerWidth < HOME_LAYOUT_CONSTANTS.SIDEBAR.MOBILE_BREAKPOINT;

    if (isMobile) {
      return HOME_LAYOUT_CONSTANTS.SIDEBAR.WIDTH;
    }

    return state.sidebar.collapsed
      ? HOME_LAYOUT_CONSTANTS.SIDEBAR.COLLAPSED_WIDTH
      : HOME_LAYOUT_CONSTANTS.SIDEBAR.WIDTH;
  }, [state.sidebar.collapsed]);

  const isMobile =
    typeof window !== "undefined" &&
    window.innerWidth < HOME_LAYOUT_CONSTANTS.SIDEBAR.MOBILE_BREAKPOINT;

  return {
    sidebarOpen: state.sidebar.open,
    sidebarCollapsed: state.sidebar.collapsed,
    profileMenuAnchor: state.profileMenuAnchor,
    isHydrated: state.isHydrated,
    isMobile,
    handleSidebarToggle,
    handleSidebarClose,
    handleProfileMenuOpen,
    handleProfileMenuClose,
    currentSidebarWidth: getCurrentSidebarWidth(),
  };
};
