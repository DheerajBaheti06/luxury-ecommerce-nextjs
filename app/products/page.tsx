import { prisma } from "@/lib/prisma";
import { ProductGridClient } from "@/components/product-grid-client";
import { Prisma } from "@prisma/client";

export const dynamic = "force-dynamic";

interface ProductsPageProps {
  searchParams: {
    page?: string;
    limit?: string;
    search?: string;
    category?: string;
    sort?: string;
  };
}

export default async function ProductsPage({
  searchParams,
}: ProductsPageProps) {
  // Parse params
  const page = Math.max(1, parseInt(searchParams.page || "1"));
  const limit = Math.max(1, Math.min(50, parseInt(searchParams.limit || "12"))); // Cap limit at 50, default 12
  const search = searchParams.search || "";
  const category = searchParams.category || "";
  const sort = searchParams.sort || "latest";

  // Build Prisma Where Clause
  const where: Prisma.ProductWhereInput = {};

  if (search) {
    where.OR = [
      { title: { contains: search } }, // Case insensitive in SQLite usually requires separate handling or specific collation, but usually defaults to insensitive in simple setups or sensitive. Prisma standard compliant.
      { description: { contains: search } },
    ];
  }

  if (category && category !== "all") {
    // If filtering by name, we need to find the category first or filter by relation
    where.category = {
      name: category,
    };
  }

  // Build Sort Order
  let orderBy: Prisma.ProductOrderByWithRelationInput = { createdAt: "desc" };
  if (sort === "price-low") {
    orderBy = { price: "asc" };
  } else if (sort === "price-high") {
    orderBy = { price: "desc" };
  } else if (sort === "rating") {
    orderBy = { ratingsAverage: "desc" };
  }

  // Fetch Data Transactions
  try {
    const [products, total, categories] = await Promise.all([
      prisma.product.findMany({
        where,
        include: {
          brand: true,
          category: true,
        },
        orderBy,
        take: limit,
        skip: (page - 1) * limit,
      }),
      prisma.product.count({ where }),
      prisma.category.findMany({ select: { id: true, name: true } }),
    ]);

    const totalPages = Math.ceil(total / limit);

    // Serialize for client component
    const serializedProducts = JSON.parse(JSON.stringify(products));

    return (
      <div className="min-h-screen text-white pt-24 pb-12">
        <ProductGridClient
          products={serializedProducts}
          categories={categories}
          pagination={{
            page,
            limit,
            total,
            totalPages,
          }}
        />
      </div>
    );
  } catch (error) {
    console.error("Failed to load products page:", error);
    return (
      <div className="min-h-screen text-white flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-500 mb-2">
            Error Loading Products
          </h2>
          <p className="text-gray-400">Please try again later.</p>
        </div>
      </div>
    );
  }
}
