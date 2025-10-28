import { LucideIcon } from "lucide-react";

export type PropertyStatus = "approved" | "pending" | "rejected";
export type UserType = "owners" | "tenants";

export interface Property {
  id: number;
  name: string;
  owner: string;
  location: string;
  status: PropertyStatus;
  type: string;
  rent: number;
}

export interface User {
  id:string;
  _id: string;
  fullName?: string;
  email?: string;
  phone?: string | null;
  profilePicture?: string | null;
  status: "active" | "suspended";
  createdAt: string;
  propertyCount?: number;
  currentProperty?: string | null;
}

export interface UsersData {
  owners: User[];
  tenants: User[];
}

export interface Notification {
  id: number;
  type: string;
  message: string;
  time: string;
}

export interface ActivityLog {
  id: number;
  admin: string;
  action: string;
  time: string;
  date: string;
}

export interface Stats {
  totalProperties: number;
  totalOwners: number;
  totalTenants: number;
  activeRentals: number;
  monthlyRevenue: number;
}

export interface StatCardProps {
  title: string;
  value: number;
  icon: LucideIcon;
  trend?: number;
}

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export interface PropertiesProps {
  onViewItem: (item: Property) => void;
}

export interface UsersProps {
  onEditUser: (item: User) => void;
}
