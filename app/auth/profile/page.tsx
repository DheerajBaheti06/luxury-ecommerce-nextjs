"use client";

import type React from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  User, Mail, Phone, MapPin, Calendar, ShoppingBag, Heart,
  LogOut, Edit3, Save, X, ChevronDown, ChevronUp,
} from "lucide-react";
import { ProtectedRoute } from "@/components/auth/protected-route";

// --- MOCK DATA ---
const mockUser = {
  name: "John Doe",
  email: "john.doe@example.com",
  phone: "+1 (555) 123-4567",
  address: "123 Main St, New York, NY 10001",
  joinDate: "January 15, 2024",
  orders: 12,
  wishlist: 8,
};

const mockOrders = [
  { id: "12345", date: "2024-10-15", total: 249.99, status: "Delivered", items: 3 },
  { id: "12344", date: "2024-10-10", total: 129.99, status: "Shipped", items: 1 },
  { id: "12343", date: "2024-10-05", total: 399.99, status: "Delivered", items: 2 },
];

type TabType = "profile" | "orders";

export default function UserProfile() {
  const [user, setUser] = useState(mockUser);
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState(mockUser);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<TabType>("profile");
  const [collapsedSections, setCollapsedSections] = useState<Record<string, boolean>>({
    personalInfo: false,
    stats: false,
  });
  
  const router = useRouter();

  // --- HANDLERS ---
  const handleLogout = () => {
    document.cookie = "user-session=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    router.push("/auth/login");
  };

  const handleSave = () => {
    setIsLoading(true);
    setTimeout(() => {
      setUser(editedUser);
      setIsEditing(false);
      setIsLoading(false);
    }, 1000);
  };

  const toggleSection = (section: string) => {
    setCollapsedSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  // --- SUB-COMPONENTS (Organized UI) ---
  
  const Sidebar = () => (
    <Card className="bg-[#1a1a1a] border-neutral-800">
      <CardHeader className="text-center pb-3 md:pb-4">
        <div className="mx-auto bg-lime-400 rounded-full w-10 h-10 md:w-12 md:h-12 flex items-center justify-center mb-2 md:mb-3">
          <User className="text-black h-5 w-5 md:h-6 md:w-6" />
        </div>
        <CardTitle className="text-white text-base md:text-lg">{user.name}</CardTitle>
        <p className="text-neutral-400 text-xs">{user.email}</p>
      </CardHeader>
      <CardContent className="pt-0">
        <nav className="space-y-1">
          {[
            { id: "profile", label: "Profile", icon: User },
            { id: "orders", label: "Orders", icon: ShoppingBag },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as TabType)}
              className={`w-full flex items-center gap-2 px-2 py-2 rounded-lg text-xs md:text-sm ${
                activeTab === tab.id ? "bg-lime-400/10 text-lime-400" : "text-neutral-400 hover:text-white hover:bg-neutral-800"
              }`}
            >
              <tab.icon className="h-4 w-4" />
              <span>{tab.label}</span>
            </button>
          ))}
          <button onClick={() => router.push("/wishlist")} className="w-full flex items-center gap-2 px-2 py-2 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800 text-xs md:text-sm">
            <Heart className="h-4 w-4" />
            <span>Wishlist</span>
          </button>
          <button onClick={handleLogout} className="w-full flex items-center gap-2 px-2 py-2 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800 text-xs md:text-sm">
            <LogOut className="h-4 w-4" />
            <span>Logout</span>
          </button>
        </nav>
      </CardContent>
    </Card>
  );

  const ProfileInfo = () => (
    <div className="space-y-4 md:space-y-6">
      <Card className="bg-[#1a1a1a] border-neutral-800">
        <CardHeader className="pb-2 md:pb-3 cursor-pointer flex flex-row items-center justify-between" onClick={() => toggleSection("personalInfo")}>
          <CardTitle className="text-white flex items-center gap-2 text-base md:text-lg">
            <User className="h-4 w-4" /> Personal Information
          </CardTitle>
          {collapsedSections.personalInfo ? <ChevronDown className="h-4 w-4 text-neutral-400" /> : <ChevronUp className="h-4 w-4 text-neutral-400" />}
        </CardHeader>
        {!collapsedSections.personalInfo && (
          <CardContent className="space-y-3 md:space-y-4 pt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
              {[
                { label: "Full Name", key: "name", type: "text" },
                { label: "Email Address", key: "email", type: "email" },
                { label: "Phone Number", key: "phone", type: "text" },
                { label: "Address", key: "address", type: "text" },
              ].map((field) => (
                <div key={field.key} className="space-y-1.5">
                  <Label className="text-neutral-400 text-xs md:text-sm">{field.label}</Label>
                  {isEditing ? (
                    <Input
                      type={field.type}
                      value={editedUser[field.key as keyof typeof editedUser]}
                      onChange={(e) => setEditedUser({ ...editedUser, [field.key]: e.target.value })}
                      className="bg-[#0f0f0f] border-neutral-800 text-white h-8 md:h-9 text-xs md:text-sm"
                    />
                  ) : (
                    <p className="text-white text-xs md:text-sm">{user[field.key as keyof typeof user]}</p>
                  )}
                </div>
              ))}
            </div>
            <div className="pt-2 md:pt-3 border-t border-neutral-800">
              <div className="flex items-center gap-2 text-neutral-400 text-xs">
                <Calendar className="h-3 w-3" />
                <span>Member since {user.joinDate}</span>
              </div>
            </div>
          </CardContent>
        )}
      </Card>

      <Card className="bg-[#1a1a1a] border-neutral-800">
        <CardHeader className="pb-2 md:pb-3 cursor-pointer flex flex-row items-center justify-between" onClick={() => toggleSection("stats")}>
          <CardTitle className="text-white flex items-center gap-2 text-base md:text-lg">
            <ShoppingBag className="h-4 w-4" /> Account Statistics
          </CardTitle>
          {collapsedSections.stats ? <ChevronDown className="h-4 w-4 text-neutral-400" /> : <ChevronUp className="h-4 w-4 text-neutral-400" />}
        </CardHeader>
        {!collapsedSections.stats && (
          <CardContent className="pt-0">
            <div className="grid grid-cols-3 gap-2 md:gap-4">
              {[
                { label: "Orders", val: user.orders, icon: ShoppingBag },
                { label: "Wishlist", val: user.wishlist, icon: Heart },
                { label: "Support", val: "24/7", icon: Mail },
              ].map((stat, i) => (
                <Card key={i} className="bg-[#0f0f0f] border-neutral-800">
                  <CardContent className="p-3 md:p-4">
                    <div className="flex items-center gap-2 md:gap-3">
                      <div className="bg-lime-400/10 p-1.5 md:p-2 rounded-lg">
                        <stat.icon className="h-4 w-4 md:h-5 md:w-5 text-lime-400" />
                      </div>
                      <div>
                        <p className="text-base md:text-xl font-bold text-white">{stat.val}</p>
                        <p className="text-neutral-400 text-xs">{stat.label}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        )}
      </Card>
    </div>
  );

  const OrderHistory = () => (
    <Card className="bg-[#1a1a1a] border-neutral-800">
      <CardContent className="pt-4 md:pt-5">
        <div className="space-y-2 md:space-y-3">
          {mockOrders.length > 0 ? (
            mockOrders.map((order) => (
              <div key={order.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-2 md:p-3 bg-[#0f0f0f] rounded-lg border border-neutral-800">
                <div>
                  <p className="font-medium text-white text-xs md:text-sm">Order #{order.id}</p>
                  <p className="text-xs text-neutral-400">{order.items} items • {order.date}</p>
                </div>
                <div className="flex items-center gap-2 md:gap-3 mt-2 sm:mt-0">
                  <span className="text-white font-medium text-xs md:text-sm">${order.total.toFixed(2)}</span>
                  <span className={`px-1.5 py-0.5 rounded text-xs font-medium ${order.status === "Delivered" ? "bg-green-500/10 text-green-400" : "bg-yellow-500/10 text-yellow-400"}`}>
                    {order.status}
                  </span>
                  <Button variant="outline" size="sm" className="h-6 md:h-7 border-neutral-800 text-black hover:bg-lime-400 text-xs px-2">Details</Button>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-8">
              <ShoppingBag className="h-12 w-12 text-neutral-600 mx-auto mb-3" />
              <p className="text-neutral-400">No orders yet</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );

  // --- MAIN RENDER ---
  return (
    <ProtectedRoute>
      <div className="min-h-screen text-white">
        <div className="container mx-auto px-3 py-4 md:px-4 md:py-6">
          <div className="flex flex-col md:flex-row gap-4 md:gap-6">
            <div className="md:w-1/4">
              <Sidebar />
            </div>

            <div className="md:w-3/4">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-4 md:mb-5">
                <h1 className="text-xl md:text-2xl font-bold">
                  {activeTab === "profile" ? "My Profile" : "My Orders"}
                </h1>
                {activeTab === "profile" && (
                  <div className="flex gap-1">
                    {isEditing ? (
                      <>
                        <Button variant="outline" onClick={() => setIsEditing(false)} className="h-7 md:h-8 border-neutral-800 text-white hover:bg-neutral-800 text-xs px-2 md:px-3">
                          <X className="h-3 w-3 mr-1" /> Cancel
                        </Button>
                        <Button onClick={handleSave} disabled={isLoading} className="h-7 md:h-8 bg-lime-400 text-black hover:bg-lime-400/90 text-xs px-2 md:px-3">
                          {isLoading ? <div className="w-2 h-2 md:w-3 md:h-3 border-2 border-black border-t-transparent rounded-full animate-spin mr-1" /> : <Save className="h-3 w-3 mr-1" />}
                          {isLoading ? "Saving..." : "Save"}
                        </Button>
                      </>
                    ) : (
                      <Button onClick={() => setIsEditing(true)} className="h-7 md:h-8 bg-lime-400 text-black hover:bg-lime-400/90 text-xs px-2 md:px-3">
                        <Edit3 className="h-3 w-3 mr-1" /> Edit
                      </Button>
                    )}
                  </div>
                )}
              </div>

              {activeTab === "profile" ? <ProfileInfo /> : <OrderHistory />}
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}