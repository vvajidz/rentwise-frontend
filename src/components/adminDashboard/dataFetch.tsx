// src/data/dataFetcher.ts
import axios from "../../lib/axios";
import axiosAd from "../../lib/adminAxios";
import { Stats, Property, UsersData, Notification, ActivityLog } from '@/types/admin';

// Helper for clear API error logs
const logError = (endpoint: string, error: any) => {
  console.log(`❌ API Error for ${endpoint}:`);
  console.log('-> Message:', error.message);
  console.log('-> Status:', error.response?.status);
  console.log('-> Data:', error.response?.data);
  console.log('-> Full:', error);
};

// 📊 Fetch dashboard stats
export const fetchStats = async (): Promise<Stats> => {
  console.log('🔵 Fetching stats...');
  try {
    const propertyRes = await axios.get('/property/allproperty');
    const ownersRes = await axiosAd.get('/admin/users/owner');
    const tenantsRes = await axiosAd.get('/admin/users/tenant');

    return {
      totalProperties: propertyRes.data.totalItems || 0,
      totalOwners: ownersRes.data?.data?.length || 0,
      totalTenants: tenantsRes.data?.data?.length || 0,
      activeRentals: 0,
      monthlyRevenue: 0
    };
  } catch (error) {
    logError('fetchStats', error);
    return { totalProperties: 0, totalOwners: 0, totalTenants: 0, activeRentals: 0, monthlyRevenue: 0 };
  }
};

// 🏠 Fetch property list
export const fetchProperties = async (): Promise<Property[]> => {
  console.log('🔵 Fetching properties...');
  try {
    const res = await axios.get('/property/allproperty');
    if (!res.data?.data) return [];

    return res.data.data.map((p: any) => ({
      id: p._id,
      name: p.propertyName,
      type: p.propertyType,
      address: p.address,
      location: p.address,
      coordinates: p.location?.coordinates || [0, 0],
      rent: p.monthlyRent,
      isAvailable: p.isAvailable,
      bedrooms: p.bedrooms,
      bathrooms: p.bathrooms,
      description: p.description,
      amenities: p.amenities || [],
      furnishing: p.furnishing,
      images: p.images || [],
      securityDeposit: p.securityDeposit,
      utilitiesIncluded: p.utilitiesIncluded,
      availableFrom: p.availableFrom ? new Date(p.availableFrom).toLocaleDateString() : 'N/A',
      minimumStay: p.minimumStay,
      leaseTerms: p.leaseTerms,
      guidelines: p.guidelines || [],
      requiredDocuments: p.requiredDocuments || []
    }));
  } catch (error) {
    logError('fetchProperties', error);
    return [];
  }
};

// 👥 Fetch owners + tenants
// 👥 Fetch owners + tenants
export const fetchUsers = async (): Promise<UsersData> => {
  console.log('🔵 Fetching users...');
  try {
    const ownersRes = await axiosAd.get('/admin/users/owner');
    const tenantsRes = await axiosAd.get('/admin/users/tenant');
    console.log("owner",ownersRes)

    // For owners, map the nested structure:
    const mapOwner = (o: any) => ({
      ownerId: o.ownerId,
      id: o.user._id,
      fullName: o.user.fullName || (o.user.email ? o.user.email.charAt(0).toUpperCase() : 'U'),
      email: o.user.email,
      profilePicture: o.user.profilePicture || null,
      status: o.user.status || 'unknown',
      propertyCount: o.propertyCount || 0
      
    });

    // For tenants, assuming simpler flat structure like before:
    const mapTenant = (t: any) => ({
      id: t._id,
      fullName: t.fullName || (t.email ? t.email.charAt(0).toUpperCase() : 'U'),
      email: t.email,
      phone: t.phone || null,
      profilePicture: t.profilePicture || null,
      verified: t.verified || false,
      status: t.status || 'unknown',
      currentRental: t.currentProperty?.propertyName || null,
      joined: new Date(t.createdAt).toISOString().split('T')[0]
    });

    return {
      owners: ownersRes.data?.data?.map(mapOwner) || [],
      tenants: tenantsRes.data?.data?.map(mapTenant) || []
    };
  } catch (error) {
    logError('fetchUsers', error);
    return { owners: [], tenants: [] };
  }
};


// 🔔 Mock notifications
export const mockNotifications: Notification[] = [
  { id: 1, type: 'property', message: 'New property "Seaside Villa" needs approval', time: '2 hours ago' },
  { id: 2, type: 'owner', message: 'Owner verification request from "David Kumar"', time: '5 hours ago' },
  { id: 3, type: 'property', message: 'Property report for "Downtown Loft" needs review', time: '1 day ago' }
];

// 📜 Mock admin activity log
export const mockActivityLog: ActivityLog[] = [
  { id: 1, admin: 'Admin User', action: 'Approved property "Luxury Villa Marina"', time: '10:30 AM', date: 'Today' },
  { id: 2, admin: 'Super Admin', action: 'Rejected owner verification for "Fake Account"', time: '09:15 AM', date: 'Today' },
  { id: 3, admin: 'Admin User', action: 'Updated platform commission rate to 8%', time: '04:45 PM', date: 'Yesterday' }
];
