"use client";

import { User } from "@/store/zustand/zustand";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Camera, User as UserIcon, Mail, Phone, Image, Save, X } from "lucide-react";
import { useState, useEffect } from "react";
import axios from "@/lib/axios";
import toast from "react-hot-toast";

type EditTenantModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSave: (updatedUser: User | null) => void;
  initialData: User;
};

export default function EditTenantModal({
  isOpen,
  onClose,
  onSave,
  initialData,
}: EditTenantModalProps) {
  const [formData, setFormData] = useState<User>(initialData);

  useEffect(() => {
    setFormData(initialData);
  }, [initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    try {
      const { data } = await axios.put("/auth/userEdit", formData);
      toast.success("Profile updated successfully ✨");
      onSave(data); // Update Zustand
      onClose();    // Close the modal
    } catch (error: any) {
      console.error("Update failed", error);

      const errorMessage =
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        "Failed to update profile. Please try again 😢";

      toast.error(errorMessage);
      onSave(null); // Optionally handle in parent
    }
  };


  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md w-full max-w-[90vw] p-0 overflow-hidden bg-white rounded-xl shadow-2xl border-0" showCloseButton={false}>
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-900 to-blue-950 px-6 py-4">
          <DialogHeader className="space-y-0">
            <div className="flex items-center justify-between">
              <DialogTitle className="text-xl font-semibold text-white flex items-center gap-2">
                <UserIcon className="w-5 h-5" />
                Edit Profile
              </DialogTitle>
              <Button
                variant="ghost"
                size="sm"
                onClick={onClose}
                className="text-white hover:bg-white/20 rounded-full p-1 h-8 w-8"
              >
                <X className="w-5 h-5" />
              </Button>
            </div>
          </DialogHeader>
        </div>

        {/* Content */}
        <div className="px-6 py-6 space-y-6">
          {/* Profile Picture */}
          <div className="flex flex-col items-center space-y-4">
            <div className="relative">
              <Avatar className="w-24 h-24 border-4 border-blue-100 shadow-lg">
                <AvatarImage
                  src={formData.profilePicture || undefined}
                  alt={formData.fullName || "Profile"}
                />

                <AvatarFallback className="bg-blue-50 text-blue-600 text-xl font-semibold">
                  {formData.fullName
                    ? formData.fullName
                      .split(" ")
                      .map((n) => n[0])
                      .join("")
                      .toUpperCase()
                      .slice(0, 2)
                    : <Camera className="w-8 h-8" />}
                </AvatarFallback>
              </Avatar>
              <div className="absolute -bottom-2 -right-2 bg-blue-600 rounded-full p-2 shadow-lg">
                <Camera className="w-4 h-4 text-white" />
              </div>
            </div>

            <div className="w-full space-y-1">
              <Label htmlFor="profilePicture" className="text-sm font-medium text-gray-700 flex items-center gap-2">
                <Image className="w-4 h-4" />
                Profile Picture URL
              </Label>
              <Input
                id="profilePicture"
                name="profilePicture"
                value={formData.profilePicture || ""}
                onChange={handleChange}
                placeholder="https://example.com/image.jpg"
              />
            </div>
          </div>

          {/* Fields */}
          <div className="space-y-4">
            {/* Full Name */}
            <div className="space-y-1">
              <Label htmlFor="fullName" className="text-sm font-medium text-gray-700 flex items-center gap-2">
                <UserIcon className="w-4 h-4" />
                Full Name *
              </Label>
              <Input
                id="fullName"
                name="fullName"
                value={formData.fullName || ""}
                onChange={handleChange}
                required
              />
            </div>

            {/* Email */}
            <div className="space-y-1">
              <Label htmlFor="email" className="text-sm font-medium text-gray-700 flex items-center gap-2">
                <Mail className="w-4 h-4" />
                Email Address *
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email || ""}
                onChange={handleChange}
                required
              />
            </div>

            {/* Phone */}
            <div className="space-y-1">
              <Label htmlFor="phone" className="text-sm font-medium text-gray-700 flex items-center gap-2">
                <Phone className="w-4 h-4" />
                Phone Number *
              </Label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                value={formData.phone || ""}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-gray-50 px-6 py-4 flex justify-end gap-3 border-t border-gray-100">
          <Button variant="outline" onClick={onClose} className="px-6">
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            className="px-6 bg-blue-800 hover:bg-blue-700 text-white flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            Save Changes
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
