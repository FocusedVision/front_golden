import { SvgIconComponent } from "@mui/icons-material";

export interface HomeLayoutState {
  sidebar: SidebarState;
  profileMenuAnchor: HTMLElement | null;
  isHydrated: boolean;
}

export interface SidebarState {
  open: boolean;
  collapsed: boolean;
}

export interface NavItem {
  id: string;
  label: string;
  href: string;
  icon: SvgIconComponent;
  badge?: number;
  children?: NavItem[];
}

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export interface RouteConfig {
  path: string;
  title: string;
  description?: string;
  requiresAuth?: boolean;
  roles?: string[];
}

export interface TopBarProps {
  onSidebarToggle: () => void;
  onProfileMenuOpen: (event: React.MouseEvent<HTMLElement>) => void;
  profileMenuAnchor: HTMLElement | null;
  onProfileMenuClose: () => void;
}

export interface SearchBarProps {
  placeholder?: string;
  onSearch?: (query: string) => void;
  className?: string;
}

export interface ProfileSectionProps {
  user: UserProfile;
  onClick: (event: React.MouseEvent<HTMLElement>) => void;
  className?: string;
}

export interface UserProfile {
  firstName: string;
  lastName: string;
  avatar?: string;
  initials: string;
}

export interface NotificationProps {
  count: number;
  onClick?: () => void;
  className?: string;
}

export interface StatCardData {
  title: string;
  value: string;
  iconSrc: string;
  trend: string;
  trendLabel: string;
  trendDirection: "up" | "down" | "neutral";
  iconBg: string;
}

export interface FacilityData {
  facility_name: string;
  reviews: number;
  conversion_rate: number;
  average_rate: number;
  feedback_not_reviewed: number;
  review_not_responded: number;
  performance: "good" | "bad" | "normal";
}

export interface ReviewData {
  tenent: string;
  unit: string;
  rating: number;
  review: string;
  facility: string;
  review_site: string;
  date: string;
  status: string;
}

export interface FeedbackData {
  date: string;
  facility: string;
  tenant: string;
  communication: number;
  friendliness: number;
  cleanliness: number;
  unit_selection: number;
  rental_process: number;
  overall_rating: number;
  review: string;
  status: string;
}

export interface ReviewManagementData {
  date: string;
  facility: string;
  tenant: string;
  overall_rating: number;
  review: string;
  response: string;
}

export interface ProgressBarData {
  label: string;
  value: number;
  maxValue?: number;
  color?: "primary" | "success" | "warning" | "error";
}

export interface FeedbackStatData {
  name: string;
  value: number;
}

export interface ReviewsTrendData {
  day: string;
  reviews: number;
  displayDay: string;
}

export interface StatCardProps {
  data: StatCardData;
  className?: string;
}

export interface FacilityProps {
  data: FacilityData[];
  className?: string;
}

export interface ReviewProps {
  data: ReviewData[];
  className?: string;
}

export interface FeedbackProps {
  data: FeedbackData[];
  className?: string;
}

export interface ReviewManagementProps {
  data: ReviewManagementData[];
  className?: string;
}

export interface FeedbackStatsProps {
  data: FeedbackStatData[];
  className?: string;
}

export interface ReviewsTrendProps {
  data: ReviewsTrendData[];
  className?: string;
}

export interface ProgressBarProps {
  data: ProgressBarData;
  showLabel?: boolean;
  showValue?: boolean;
  className?: string;
}

export interface ChipProps {
  variant: "good" | "bad" | "normal" | "published" | "unpublished";
  children: React.ReactNode;
  size?: "sm" | "md" | "lg";
}
