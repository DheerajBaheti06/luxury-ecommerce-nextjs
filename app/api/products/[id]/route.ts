import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    console.log(`Fetching product details from database... ID: ${id}`);

    const product = await prisma.product.findUnique({
      where: {
        id: id,
      },
      include: {
        brand: true,
        category: true,
        variants: true,
        reviews: {
          include: {
            user: true,
          },
        },
        // TODO: Add related models when they exist in the schema
        // features: true,
        // relatedProducts: true,
      },
    });

    if (!product) {
      return new NextResponse("Product not found", { status: 404 });
    }

    // For now, we'll add mock data for features since they're not in the schema
    // In the future, these should come from the database
    const mockFeatures = [
      "High quality materials",
      "Durable construction",
      "Easy to use",
      "Warranty included",
      "Eco-friendly design",
      "Professional grade",
    ];

    // Transform real reviews to the format expected by the frontend
    const transformedReviews = product.reviews.map((review) => ({
      id: review.id,
      userName: review.user?.username || "Anonymous User",
      rating: review.rating,
      date: review.createdAt.toISOString().split("T")[0],
      title: review.comment
        ? review.comment.substring(0, 50) +
          (review.comment.length > 50 ? "..." : "")
        : `Review for ${product.title}`,
      comment: review.comment || "No comment provided.",
      helpful: 0,
      notHelpful: 0,
    }));

    // Mock related products - in a real implementation, these would be fetched from the database
    const mockRelatedProducts = [
      {
        id: "related-1",
        name: "Related Product 1",
        price: 89,
        originalPrice: 129,
        rating: 4.5,
        image:
          "https://images.pexels.com/photos/3781527/pexels-photo-3781527.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      },
      {
        id: "related-2",
        name: "Related Product 2",
        price: 79,
        originalPrice: 119,
        rating: 4.3,
        image:
          "https://images.pexels.com/photos/267394/pexels-photo-267394.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      },
    ];

    const productWithDetails = {
      ...product,
      features: mockFeatures,
      reviews: transformedReviews,
      relatedProducts: mockRelatedProducts,
    };

    console.log(`Found product: ${product.title}`);

    return NextResponse.json(productWithDetails, { status: 200 });
  } catch (error: unknown) {
    console.error("Failed to fetch product:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
