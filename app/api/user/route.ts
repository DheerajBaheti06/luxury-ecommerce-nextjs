import { NextRequest, NextResponse } from "next/server";
import { authMiddleware } from "@/lib/auth-middleware";

// GET /api/user - Get user profile (protected route)
export async function GET(request: NextRequest) {
  // Check authentication
  const authError = authMiddleware(request);
  if (authError) {
    return authError;
  }

  // Return mock user data
  const userData = {
    id: "user_123456",
    name: "John Doe",
    email: "john.doe@example.com",
    avatar: "https://example.com/avatar.jpg",
    createdAt: "2024-01-15T10:30:00Z",
    preferences: {
      newsletter: true,
      notifications: true,
      theme: "dark",
    },
  };

  return NextResponse.json(userData);
}

// PUT /api/user - Update user profile (protected route)
export async function PUT(request: NextRequest) {
  // Check authentication
  const authError = authMiddleware(request);
  if (authError) {
    return authError;
  }

  try {
    const userData = await request.json();

    // In a real app, you would update the user in your database
    // For now, we'll just return the updated data
    const updatedUser = {
      id: "user_123456",
      name: userData.name,
      email: userData.email,
      avatar: userData.avatar || "https://example.com/avatar.jpg",
      createdAt: "2024-01-15T10:30:00Z",
      preferences: userData.preferences || {
        newsletter: true,
        notifications: true,
        theme: "dark",
      },
    };

    return NextResponse.json(updatedUser);
  } catch (error) {
    return NextResponse.json(
      { error: "Invalid request data" },
      { status: 400 }
    );
  }
}
