import { NextRequest, NextResponse } from "next/server";

// Simple authentication middleware for API routes
export function authMiddleware(request: NextRequest) {
  // Check for user session cookie
  const userSession = request.cookies.get("user-session");

  if (!userSession || userSession.value !== "authenticated") {
    return NextResponse.json(
      { error: "Unauthorized: No valid session found" },
      { status: 401 }
    );
  }

  return null; // Return null to indicate success
}

// Helper function to check if user is authenticated
export function isAuthenticated(request: NextRequest) {
  const userSession = request.cookies.get("user-session");
  return userSession && userSession.value === "authenticated";
}
