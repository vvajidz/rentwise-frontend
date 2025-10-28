import React, { memo } from "react";
import { Building, Key } from "lucide-react";

const FloatingElements = memo(() => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    {/* Background Elements */}
    <div className="absolute -top-1/2 -right-1/2 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
    <div className="absolute -bottom-1/2 -left-1/2 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
    <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-teal-500/5 rounded-full blur-2xl animate-bounce delay-500" />

    {/* Floating Icons */}
    <Building className="absolute top-20 left-20 w-8 h-8 text-white/10 animate-float" />
    <Building className="absolute top-40 right-32 w-6 h-6 text-white/10 animate-float delay-1000" />
    <Building className="absolute bottom-32 left-1/4 w-10 h-10 text-white/10 animate-float delay-2000" />
    <Key className="absolute top-1/3 right-20 w-7 h-7 text-white/10 animate-float delay-1500" />
  </div>
));

FloatingElements.displayName = "FloatingElements";
export default FloatingElements;