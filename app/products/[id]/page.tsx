import type { Metadata } from "next";
import ProductDetailClientPage from "./product-client";
import { products } from "@/lib/products";

type Props = {
  params: Promise<{ id: string }> | { id: string };
  searchParams:
    | Promise<{ [key: string]: string | string[] | undefined }>
    | { [key: string]: string | string[] | undefined };
};

// Helper function to resolve params if they are promises
async function resolveParams<T>(params: Promise<T> | T): Promise<T> {
  if (params instanceof Promise) {
    return await params;
  }
  return params;
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await resolveParams(props.params);
  console.log("generateMetadata resolved params:", params);

  // Ensure we have a valid ID
  if (!params || !params.id) {
    return {
      title: "Product Not Found",
    };
  }

  // Find the product
  const product = products.find((p) => String(p.id) === String(params.id));

  if (!product) {
    return {
      title: "Product Not Found",
    };
  }

  return {
    title: `${product.name} | Skitbit`,
    description: product.description,
    keywords: [product.name, "ecommerce", "product", "shop"],
    openGraph: {
      title: product.name,
      description: product.description,
      images: [`/images/placeholder-product.svg`],
    },
  };
}

export default async function ProductDetailPage(props: Props) {
  const params = await resolveParams(props.params);
  console.log("ProductDetailPage resolved params:", params);

  // Ensure we have a valid ID
  if (!params || !params.id) {
    return (
      <div className="min-h-screen bg-white text-black flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
          <p className="text-gray-600">No product ID provided</p>
        </div>
      </div>
    );
  }

  return <ProductDetailClientPage params={params} />;
}
