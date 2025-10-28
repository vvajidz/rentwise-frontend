"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff } from "lucide-react";
import { useState, forwardRef } from "react";

type Props = {
  id: string;
  name: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  label?: string;
  required?: boolean;
};

// ✅ Forward the ref so `register()` from react-hook-form works
const PasswordInput = forwardRef<HTMLInputElement, Props>(
  ({ id, name, value, onChange, placeholder, label, required = false, ...rest }, ref) => {
    const [show, setShow] = useState(false);

    return (
      <div className="relative">
        {label && <Label htmlFor={id}>{label}</Label>}
        <Input
          id={id}
          name={name}
          type={show ? "text" : "password"}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          ref={ref}
          className="mt-2 pr-10"
          {...rest}
        />
        <button
          type="button"
          onClick={() => setShow((prev) => !prev)}
          className="absolute top-8 right-3 text-gray-600 hover:text-gray-900"
        >
          {show ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
        </button>
      </div>
    );
  }
);

// 🧠 Give it a name for debugging
PasswordInput.displayName = "PasswordInput";

export default PasswordInput;
