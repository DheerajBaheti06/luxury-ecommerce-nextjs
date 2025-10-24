"use client";

import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/auth-context";
import { useRouter } from "next/navigation";

export function LogoutButton() {
  const { logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  return (
    <Button
      onClick={handleLogout}
      variant="outline"
      className="border-neutral-800 text-white hover:bg-neutral-800"
    >
      Logout
    </Button>
  );
}
