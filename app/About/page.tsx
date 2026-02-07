import { AboutContent } from "@/components/about-content";
import { prisma } from "@/lib/prisma";
import { Metadata } from "next";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Our Story",
  description:
    "Discover the intersection of high-end craftsmanship and future technology. Skitbit curates only the finest in Horology, Tech, and Design.",
};

async function getFeaturedProducts() {
  try {
    const products = await prisma.product.findMany({
      take: 4,
      where: {
        price: { gt: 1000 },
      },
      include: {
        brand: true,
        category: true,
      },
      orderBy: {
        ratingsAverage: "desc",
      },
    });

    if (products.length === 0) {
      return await prisma.product.findMany({
        take: 4,
        include: {
          brand: true,
          category: true,
        },
        orderBy: {
          createdAt: "desc",
        },
      });
    }

    return products;
  } catch (error) {
    console.error("Database Error on About Page:", error);
    return [];
  }
}

export default async function AboutPage() {
  const products = await getFeaturedProducts();

  const serializedProducts = JSON.parse(JSON.stringify(products));

  return (
    <main className="min-h-screen bg-transparent relative">
      <AboutContent featuredProducts={serializedProducts} />
    </main>
  );
}
