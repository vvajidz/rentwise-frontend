// types/owner.ts

export interface Document {
  id: string;
  name: string;
  type: string;
  status: 'verified' | 'pending' | 'rejected';
  uploadDate: string;
}

export interface BankDetails {
  accountNumber: string;
  ifscCode: string;
  bankName: string;
  accountHolderName: string;
}

export interface NotificationSettings {
  emailNotifications: boolean;
  smsNotifications: boolean;
  bookingUpdates: boolean;
  marketingEmails: boolean;

}

export interface OwnerProfile {
  id: string;
  profilePicture: string;
  name: string;
  email: string;
  phone: string;
  bio: string;
  kycStatus: 'verified' | 'pending' | 'rejected';
  documents: Document[];
  bankDetails: BankDetails;
  notificationSettings: NotificationSettings;
  accountStatus: 'active' | 'suspended';
  joinDate: string;
  totalProperties: number;
  notifications: string[];
   propertyStats?: {
    total: number;
    active: number;
    inactive: number;
  };
   revenue?: {
    total: number;
    last30Days: number;
  };
    reviews?: {
    tenantName: string;
    comment: string;
    rating: number;
  }[];
  security?: {
    lastPasswordChange: string;
    twoFactorEnabled: boolean;
    loginAlerts: boolean;
  };

}
