"use client";

import { useAuth } from "@/context/auth-context";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { User, Mail, Calendar } from "lucide-react";
import { LogoutButton } from "@/components/auth/logout-button";

export function UserInfo() {
  const { isAuthenticated, user } = useAuth();

  if (!isAuthenticated) {
    return (
      <Card className="bg-[#1a1a1a] border-neutral-800">
        <CardHeader>
          <CardTitle className="text-white">User Profile</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-neutral-400">You are not logged in.</p>
          <Button className="mt-4 bg-lime-400 text-black hover:bg-lime-400/90">
            Login
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-[#1a1a1a] border-neutral-800">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <User className="h-5 w-5" />
          User Profile
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="bg-lime-400 rounded-full w-12 h-12 flex items-center justify-center">
            <User className="text-black h-6 w-6" />
          </div>
          <div>
            <h3 className="font-medium text-white">{user?.name || "User"}</h3>
            <p className="text-sm text-neutral-400 flex items-center gap-1">
              <Mail className="h-3 w-3" />
              {user?.email || "user@example.com"}
            </p>
          </div>
        </div>

        <div className="pt-4 border-t border-neutral-800">
          <div className="flex items-center justify-between">
            <span className="text-neutral-400 flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Member since
            </span>
            <span className="text-white">January 2024</span>
          </div>
        </div>

        <div className="pt-4">
          <LogoutButton />
        </div>
      </CardContent>
    </Card>
  );
}
