import { AboutContent } from "@/components/about-content";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

/**
 * Main About Page (Server Component)
 */
export default async function AboutPage() {
  // Fetch featured products (limit to 4 for the about page)
  let featuredProducts = [];
  try {
    const products = await prisma.product.findMany({
      take: 4,
      include: {
        brand: true,
        category: true,
      },
      orderBy: {
        ratingsAverage: "desc", // Show highest rated products
      },
      where: {
        price: {
          gt: 1000, // Show expensive luxury items
        },
      },
    });

    // Serialize for client component
    featuredProducts = JSON.parse(JSON.stringify(products));
  } catch (error) {
    console.error("Failed to fetch about page products", error);
  }

  return <AboutContent featuredProducts={featuredProducts} />;
}
