"use client";

import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react";

export default function RentWiseFooter() {
    return (
        <footer className="bg-[#0b1229] text-gray-300 py-6 px-6"
            id="about">
            {/* Top Subscribe Row */}
            <div className="flex flex-col md:flex-row items-center justify-between mb-6 border-b border-gray-600 pb-4">
                <h3 className="text-xl font-semibold text-white mb-3 md:mb-0">
                    Stay in the loop
                </h3>
                <div className="flex w-full sm:w-auto">
                    <Input
                        placeholder="Your email"
                        className="flex-1 rounded-r-none border-gray-50 text-white h-9 px-3 py-1"
                    />
                    <Button className="bg-[#c3c4c0] text-[#1f2937] hover:bg-[#9ca878] transition font-medium px-5 py-1.5 text-sm rounded-l-none">
                        Subscribe
                    </Button>
                </div>

            </div>

            {/* Main Grid */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {/* About */}
                <div>
                    <h4 className="text-base font-semibold text-white mb-2">About RentWise</h4>
                    <p className="text-xs text-gray-400">
                        RentWise simplifies luxury renting for owners & tenants. We believe in trust, ease, and good vibes. Manage, pay, and live stress-free.
                    </p>
                </div>

                {/* Quick Links */}
                <div>
                    <h4 className="text-base font-semibold text-white mb-2">Links</h4>
                    <ul className="space-y-1 text-sm">
                        <li><Link href="/about" className="hover:text-white transition">About Us</Link></li>
                        <li><Link href="/properties" className="hover:text-white transition">Explore</Link></li>
                        <li><Link href="/how-it-works" className="hover:text-white transition">How It Works</Link></li>
                        <li><Link href="/support" className="hover:text-white transition">Support</Link></li>
                    </ul>
                </div>

                {/* Hours */}
                <div>
                    <h4 className="text-base font-semibold text-white mb-2">Working Hours</h4>
                    <p className="text-xs text-gray-400">Mon – Fri: 9AM – 7PM</p>
                    <p className="text-xs text-gray-400">Sat – Sun: 10AM – 5PM</p>
                </div>

                {/* Contact */}
                <div>
                    <h4 className="text-base font-semibold text-white mb-2">Get In Touch</h4>
                    <p className="text-xs text-gray-400 mb-1">📍 New Delhi, India</p>
                    <p className="text-xs text-gray-400 mb-1">✉️ support@rentwise.com</p>
                    <p className="text-xs text-gray-400 mb-2">📞 +91 98765 43210</p>
                    <div className="flex space-x-3">
                        <Link href="#"><Facebook className="w-4 h-4 hover:text-white transition" /></Link>
                        <Link href="#"><Instagram className="w-4 h-4 hover:text-white transition" /></Link>
                        <Link href="#"><Linkedin className="w-4 h-4 hover:text-white transition" /></Link>
                        <Link href="#"><Twitter className="w-4 h-4 hover:text-white transition" /></Link>
                    </div>
                </div>
            </div>

            {/* Copyright */}
            <div className="mt-6 text-center text-gray-500 text-xs border-t border-gray-600 pt-3">
                &copy; {new Date().getFullYear()} RentWise. All rights reserved.
            </div>
        </footer>
    );
}
