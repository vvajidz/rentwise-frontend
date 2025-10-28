"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, LoginSchemaType } from "@/validation/loginSchema";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { FcGoogle } from "react-icons/fc";
import { HiOutlineEye, HiOutlineEyeOff } from "react-icons/hi";
import toast from "react-hot-toast";
import { useUserStore } from "@/store/zustand/zustand";
import api from "@/lib/axios";
import { useState } from "react";

type Props = {
  onSwitch: () => void;
};

export default function SignInCard({ onSwitch }: Props) {
  const [showPassword, setShowPassword] = useState(false);
  const { setUser } = useUserStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchemaType>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (formData: LoginSchemaType) => {
    try {
      const res = await api.post("/auth/login", formData);
      const data = res.data;

      setUser(data);

      toast.success("Logged in successfully 🚀");
    } catch (err:any) {
      toast.error(err?.response?.data?.message || "Something went wrong");
    }
  };

  const handleGoogleLogin = () => {
    console.log("Clicked Google login");
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-lg w-full">
      <h3 className="text-2xl font-bold text-gray-800 mb-6">Sign In</h3>

      <Button
        type="button"
        onClick={handleGoogleLogin}
        variant="outline"
        className="w-full flex items-center justify-center gap-2 py-5 text-base font-medium border-gray-300 hover:bg-gray-50"
      >
        <FcGoogle className="w-6 h-6" />
        Continue with Google
      </Button>

      <div className="flex items-center my-6">
        <div className="flex-1 h-px bg-gray-300"></div>
        <span className="mx-4 text-gray-500 text-sm">or</span>
        <div className="flex-1 h-px bg-gray-300"></div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="Enter your email"
            {...register("email")}
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        <div className="relative">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type={showPassword ? "text" : "password"}
            placeholder="Enter your password"
            {...register("password")}
            className="pr-10"
          />
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute top-7 right-3 text-gray-500"
          >
            {showPassword ? <HiOutlineEyeOff size={20} /> : <HiOutlineEye size={20} />}
          </button>
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
          )}
        </div>

        <Button
          type="submit"
          className="w-full py-6 text-lg bg-blue-600 hover:bg-blue-900"
        >
          Login
        </Button>
      </form>

      <p className="mt-4 text-sm text-center">
        Don&apos;t have an account?{" "}
        <button type="button" onClick={onSwitch} className="text-blue-700 underline">
          Sign up
        </button>
      </p>
    </div>
  );
}
