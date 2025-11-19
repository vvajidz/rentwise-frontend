"use client";

import { User, Phone, Mail, Calendar, Check, X } from "react-feather";
import { useState, useEffect } from "react";
import api from "@/lib/axios";
import { useUserStore } from "@/store/zustand/zustand";
import toast from "react-hot-toast";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

interface Tenant {
  _id: string; // bookingId
  tenantId: {
    _id: string;
    name: string;
    email: string;
    phone?: string;
  };
  propertyId: {
    _id: string;
    propertyName: string;
    address?: string;
  };
  moveIn?: string;
  rent?: number;
}

interface BookingRequest {
  _id: string;
  ownerId: string;
  tenantId: {
    _id: string;
    email: string;
    name?: string;
    phone?: string;
  };
  propertyId: {
    _id: string;
    location: { type: string; coordinates: number[] };
    address?: string;
    propertyName: string;
  };
  confirm: boolean;
  createdAt: string;
}

export default function TenantsPage() {
  const [tenants, setTenants] = useState<Tenant[]>([]);
  const [bookingRequests, setBookingRequests] = useState<BookingRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [rejectDialogOpen, setRejectDialogOpen] = useState(false);
  const [requestToReject, setRequestToReject] = useState<string | null>(null);

  const owner = useUserStore((state) => state.user);
  console.log("Current owner:", owner); // Log owner info

  useEffect(() => {
    console.log("Component mounted, loading data...");
    loadBookingRequests();
    loadTenants();
  }, []);

  const loadBookingRequests = async () => {
    console.log("Loading booking requests...");
    try {
      const { data } = await api.get("/owner/property/accepted/request");
      console.log("Booking requests data:", data);
      setBookingRequests(data.requests || []);
    } catch (err) {
      console.error("❌ Failed to fetch booking requests:", err);
      setError("Failed to fetch booking requests");
    } finally {
      setLoading(false);
    }
  };

  const loadTenants = async () => {
    console.log("Loading tenants...");
    try {
      const { data } = await api.get("/owner/confirm/tenants");
      console.log("Tenants data:", data);
      setTenants(data.tenants || []);
    } catch (err) {
      console.error("❌ Failed to fetch tenants:", err);
    }
  };

  const handleConfirmRequest = async (requestId: string) => {
    console.log("Confirming request with ID:", requestId);
    try {
      const promise = api.put(`owner/property/request/${requestId}/confirm`);
      
      toast.promise(promise, {
        loading: 'Confirming request...',
        success: () => {
          console.log("Request confirmed successfully:", requestId);
          setBookingRequests((prev) => {
            const updated = prev.filter((req) => req._id !== requestId);
            console.log("Updated booking requests after confirmation:", updated);
            return updated;
          });
          loadTenants(); // instantly refresh tenants list
          return 'Request confirmed successfully!';
        },
        error: (err) => {
          console.error("Error confirming request:", err);
          return 'Failed to confirm request';
        },
      });
    } catch (err) {
      console.error("❌ Error confirming request:", err);
    }
  };

  const openRejectDialog = (requestId: string) => {
    console.log("Opening reject dialog for request:", requestId);
    setRequestToReject(requestId);
    setRejectDialogOpen(true);
  };

  const handleRejectRequest = async () => {
    if (!requestToReject) {
      console.warn("No request to reject");
      return;
    }
    
    console.log("Rejecting request with ID:", requestToReject);
    try {
      const promise = api.delete(`owner/delete/request/${requestToReject}`);
      
      toast.promise(promise, {
        loading: 'Rejecting request...',
        success: () => {
          console.log("Request rejected successfully:", requestToReject);
          setBookingRequests((prev) => {
            const updated = prev.filter((req) => req._id !== requestToReject);
            console.log("Updated booking requests after rejection:", updated);
            return updated;
          });
          return 'Request rejected successfully!';
        },
        error: (err) => {
          console.error("Error rejecting request:", err);
          return 'Failed to reject request';
        },
      });
    } catch (err) {
      console.error("❌ Error rejecting request:", err);
    } finally {
      setRejectDialogOpen(false);
      setRequestToReject(null);
    }
  };

  if (loading) {
    console.log("Loading state: true - showing loading message");
    return <div className="p-8 text-center">Loading...</div>;
  }
  if (error) {
    console.log("Error state:", error);
    return <div className="p-8 text-center text-red-600">{error}</div>;
  }

  console.log("Rendering with tenants:", tenants.length, "and booking requests:", bookingRequests.length);
  return (
    <div className="p-6">
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-blue-950">Tenant Management</h1>
        <button className="bg-blue-950 text-white px-4 py-2 rounded-lg hover:bg-blue-900">
          Add New Tenant
        </button>
      </header>

      {/* Booking Requests */}
      <section className="bg-white rounded-lg shadow overflow-hidden mb-8">
        <div className="p-4 border-b border-blue-100">
          <h2 className="text-lg font-semibold text-blue-950">New Booking Requests</h2>
        </div>
        <div className="overflow-x-auto">
          {bookingRequests.length > 0 ? (
            <table className="w-full">
              <thead>
                <tr className="text-left border-b border-blue-100">
                  <th className="p-4">Tenant</th>
                  <th className="p-4">Property</th>
                  <th className="p-4">Request Date</th>
                  <th className="p-4">Status</th>
                  <th className="p-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {bookingRequests.map((req) => (
                  <tr key={req._id} className="border-b border-blue-50 hover:bg-blue-50">
                    <td className="p-4">
                      <div className="font-medium">{req.tenantId.email}</div>
                      {req.tenantId.name && (
                        <div className="text-sm text-blue-700">{req.tenantId.name}</div>
                      )}
                      {req.tenantId.phone && (
                        <div className="flex items-center space-x-2 text-blue-700 mt-1">
                          <Phone size={14} />
                          <span>{req.tenantId.phone}</span>
                        </div>
                      )}
                    </td>
                    <td className="p-4">
                      <div>Property Name: {req.propertyId.propertyName}</div>
                      {req.propertyId.address && (
                        <div className="text-sm text-blue-700">{req.propertyId.address}</div>
                      )}
                    </td>
                    <td className="p-4 flex items-center space-x-2">
                      <Calendar size={14} className="text-blue-700" />
                      <span>{new Date(req.createdAt).toLocaleDateString()}</span>
                    </td>
                    <td className="p-4">
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${
                          req.confirm
                            ? "bg-green-100 text-green-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {req.confirm ? "Confirmed" : "Pending"}
                      </span>
                    </td>
                    <td className="p-4 flex space-x-2">
                      <button
                        onClick={() => handleConfirmRequest(req._id)}
                        className="p-2 bg-green-100 text-green-800 rounded-full hover:bg-green-200"
                        title="Confirm"
                      >
                        <Check size={16} />
                      </button>
                      <button
                        onClick={() => openRejectDialog(req._id)}
                        className="p-2 bg-red-100 text-red-800 rounded-full hover:bg-red-200"
                        title="Reject"
                      >
                        <X size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="p-8 text-center text-blue-700">No pending booking requests</div>
          )}
        </div>
      </section>

      {/* Existing Tenants */}
      <section className="bg-white rounded-lg shadow overflow-hidden">
        <div className="p-4 border-b border-blue-100">
          <h2 className="text-lg font-semibold text-blue-950">Existing Tenants</h2>
        </div>
        {tenants.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left border-b border-blue-100">
                  <th className="p-4">Tenant</th>
                  <th className="p-4">Property</th>
                  <th className="p-4">Move-In Date</th>
                </tr>
              </thead>
              <tbody>
                {tenants.map((tenant) => (
                  <tr key={tenant._id} className="border-b border-blue-50 hover:bg-blue-50">
                    <td className="p-4">
                      <div className="font-medium">{tenant.tenantId.email}</div>
                      {tenant.tenantId.name && (
                        <div className="text-sm text-blue-700">{tenant.tenantId.name}</div>
                      )}
                      {tenant.tenantId.phone && (
                        <div className="flex items-center space-x-2 text-blue-700 mt-1">
                          <Phone size={14} />
                          <span>{tenant.tenantId.phone}</span>
                        </div>
                      )}
                    </td>
                    <td className="p-4">
                      <div>Property Name: {tenant.propertyId.propertyName}</div>
                      {tenant.propertyId.address && (
                        <div className="text-sm text-blue-700">{tenant.propertyId.address}</div>
                      )}
                    </td>
                    <td className="p-4 flex items-center space-x-2">
                      <Calendar size={14} className="text-blue-700" />
                      <span>{tenant.moveIn ? new Date(tenant.moveIn).toLocaleDateString() : "—"}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-8 text-center text-blue-700">
            No tenants found. Approve booking requests to add tenants.
          </div>
        )}
      </section>

      {/* Reject Confirmation Dialog */}
      <AlertDialog open={rejectDialogOpen} onOpenChange={setRejectDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action will permanently reject this booking request and cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleRejectRequest}
              className="bg-red-600 hover:bg-red-700"
            >
              Reject Request
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}