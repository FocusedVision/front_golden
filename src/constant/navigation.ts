import {
  Home,
  People,
  ReviewsOutlined,
  Campaign,
  Email,
  Feedback,
  Support,
  Settings,
  Logout,
  GridView,
  Assessment,
} from "@mui/icons-material";
import { NavItem, RouteConfig } from "@/types/home";

export const navigationItems1: NavItem[] = [
  {
    id: "home",
    label: "Home",
    href: "/home/dashboard",
    icon: Home,
  },
  {
    id: "reviews",
    label: "Reviews",
    href: "/home/reviews",
    icon: ReviewsOutlined,
  },
  {
    id: "facilities",
    label: "Facilities",
    href: "/home/facilities",
    icon: GridView,
  },
  {
    id: "campaigns",
    label: "Campaigns",
    href: "/home/campaigns",
    icon: Campaign,
  },
  {
    id: "analytics",
    label: "Analytics",
    href: "/home/analytics",
    icon: Assessment,
  },
];

export const navigationItems2: NavItem[] = [
  {
    id: "customers",
    label: "Customers",
    href: "/home/customers",
    icon: People,
  },
  {
    id: "es-templates",
    label: "Email/SMS templates",
    href: "/home/es-templates",
    icon: Email,
  },
  {
    id: "team-management",
    label: "Team Management",
    href: "/home/team-management",
    icon: People,
  },
  {
    id: "feedback",
    label: "Feedback Submissions",
    href: "/home/feedbackSubmission",
    icon: Feedback,
  },
  {
    id: "review-management",
    label: "Review Management",
    href: "/home/reviewManagement",
    icon: ReviewsOutlined,
  },
  {
    id: "support",
    label: "Support",
    href: "/home/support",
    icon: Support,
  },
  {
    id: "audit-logs",
    label: "Audit Logs",
    href: "/home/audit-logs",
    icon: Support,
  },
];

export const navigationItems3: NavItem[] = [
  {
    id: "settings",
    label: "Settings",
    href: "/home/settings",
    icon: Settings,
  },
  {
    id: "logout",
    label: "Logout",
    href: "/home/logout",
    icon: Logout,
  },
];

// Enhanced route configurations with role-based access control
export const protectedRouteConfigs: RouteConfig[] = [
  {
    path: "/home",
    title: "Dashboard",
    description: "Main dashboard with overview stats",
    requiresAuth: true,
  },
  {
    path: "/home/reviews",
    title: "Reviews",
    description: "View and manage customer reviews",
    requiresAuth: true,
  },
  {
    path: "/home/facilities",
    title: "Facilities",
    description: "Manage facility information",
    requiresAuth: true,
  },
  {
    path: "/home/campaigns",
    title: "Campaigns",
    description: "Create and manage marketing campaigns",
    requiresAuth: true,
  },
  {
    path: "/home/analytics",
    title: "Analytics",
    description: "View analytics and reports",
    requiresAuth: true,
  },
  {
    path: "/home/customers",
    title: "Customers",
    description: "Manage customer information",
    requiresAuth: true,
  },
  {
    path: "/home/es-templates",
    title: "Email/SMS Templates",
    description: "Manage email and SMS templates",
    requiresAuth: true,
  },
  {
    path: "/home/team-management",
    title: "Team Management",
    description: "Manage team members and roles",
    requiresAuth: true,
  },
  {
    path: "/home/feedback-submissions",
    title: "Feedback Submissions",
    description: "View customer feedback submissions",
    requiresAuth: true,
  },
  {
    path: "/home/feedbackSubmission",
    title: "Feedback Submission",
    description: "View customer feedback submissions",
    requiresAuth: true,
  },
  {
    path: "/home/reviewManagement",
    title: "Review Management",
    description: "Manage review responses and moderation",
    requiresAuth: true,
  },
  {
    path: "/home/support",
    title: "Support",
    description: "Access support and help resources",
    requiresAuth: true,
  },
  {
    path: "/home/audit-logs",
    title: "Audit Logs",
    description: "View system audit logs",
    requiresAuth: true,
  },
  {
    path: "/home/settings",
    title: "Settings",
    description: "Application settings and configuration",
    requiresAuth: true,
  },
];

// Legacy route configs for backward compatibility
export const routeConfigs: RouteConfig[] = protectedRouteConfigs.map(
  (config) => ({
    path: config.path,
    title: config.title,
    description: config.description,
    requiresAuth: config.requiresAuth,
    roles: config.roles,
  }),
);

// Helper function to get route config by path
export const getRouteConfig = (path: string): RouteConfig | undefined => {
  return protectedRouteConfigs.find((config) => config.path === path);
};
