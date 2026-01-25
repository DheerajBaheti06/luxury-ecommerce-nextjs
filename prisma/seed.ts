// prisma/seed.ts

import { PrismaClient } from "@prisma/client";
import { faker } from "@faker-js/faker";

const prisma = new PrismaClient();

// --- Configuration ---
const CATEGORY_NAMES = [
  "Horology",
  "Acoustic Art",
  "Executive Wear",
  "Future Tech",
  "Home Elegance",
  "Automotive",
];

const BRAND_NAMES = [
  "Luxurious Innovation",
  "Obsidian",
  "Aura",
  "Vanguard",
  "Ethereal",
  "Apex",
];

// --- Curated Data (No Random Generation) ---
const LUXURY_PRODUCTS = [
  {
    name: "Obsidian Void Watch",
    description:
      "A masterpiece of dark matter engineering. The Obsidian Void Watch features a localized gravity field display and a band made from meteorite alloy.",
    price: 45000,
    category: "Horology",
    brand: "Obsidian",
    image:
      "https://images.pexels.com/photos/2113994/pexels-photo-2113994.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
  {
    name: "Aura Symphony Speaker",
    description:
      "Experience sound as light. The Aura Symphony Speaker visualizes every note in a 360-degree holographic display.",
    price: 8900,
    category: "Acoustic Art",
    brand: "Aura",
    image:
      "https://images.pexels.com/photos/3739451/pexels-photo-3739451.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
  {
    name: "Quantum Silk Scarf",
    description:
      "Woven from bio-engineered silk that changes color based on ambient temperature and your mood.",
    price: 1200,
    category: "Executive Wear",
    brand: "Ethereal",
    image: "https://images.pexels.com/photos/375880/pexels-photo-375880.jpeg",
  },
  {
    name: "Vanguard Drone X1",
    description:
      "Silent, invisible, and autonomous. The X1 is the ultimate personal security and cinematography drone.",
    price: 15000,
    category: "Future Tech",
    brand: "Vanguard",
    image:
      "https://images.pexels.com/photos/724925/pexels-photo-724925.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
  {
    name: "Nebula Glass Set",
    description:
      "Hand-blown glass infused with fluorescent minerals that glow softly in low light.",
    price: 850,
    category: "Home Elegance",
    brand: "Luxurious Innovation",
    image:
      "https://images.pexels.com/photos/792613/pexels-photo-792613.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
  {
    name: "Titanium Executive Pen",
    description:
      "Milled from a single block of aerospace-grade titanium. Creates a line so smooth it feels like writing on air.",
    price: 450,
    category: "Executive Wear",
    brand: "Luxurious Innovation",
    image:
      "https://images.pexels.com/photos/4097159/pexels-photo-4097159.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
  {
    name: "Crystal Soundbar",
    description:
      "Transparent acoustic glass that delivers crystal clear audio while disappearing into your decor.",
    price: 3200,
    category: "Acoustic Art",
    brand: "Aura",
    image:
      "https://images.pexels.com/photos/6368944/pexels-photo-6368944.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
  {
    name: "Chronos Perpetual Calendar",
    description:
      "A mechanical wonder that tracks time, date, moon phases, and planetary alignment for the next 500 years.",
    price: 125000,
    category: "Horology",
    brand: "Obsidian",
    image:
      "https://images.pexels.com/photos/277319/pexels-photo-277319.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
  {
    name: "Apex GT Simulator",
    description:
      "Full-motion racing simulator with 8K surround display and hydraulic force feedback.",
    price: 42000,
    category: "Automotive",
    brand: "Apex",
    image:
      "https://images.pexels.com/photos/9265939/pexels-photo-9265939.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
  {
    name: "Ethereal Smart Mirror",
    description:
      "A mirror that acts as a personal stylist, overlaying digital outfits and makeup trials in real-time.",
    price: 5500,
    category: "Home Elegance",
    brand: "Ethereal",
    image:
      "https://images.pexels.com/photos/1528975/pexels-photo-1528975.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
  {
    name: "Vanguard Security Bot",
    description:
      "Patrols your estate with advanced AI, thermal vision, and non-lethal deterrents.",
    price: 28000,
    category: "Future Tech",
    brand: "Vanguard",
    image:
      "https://images.pexels.com/photos/8566472/pexels-photo-8566472.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
  {
    name: "Obsidian Diver",
    description: "Water resistant detailed timepiece for the deep explorer.",
    price: 18000,
    category: "Horology",
    brand: "Obsidian",
    image:
      "https://images.pexels.com/photos/12576214/pexels-photo-12576214.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
  {
    name: "Ceramic Minimalist Vase",
    description:
      "Hand-thrown ceramic vase with a matte finish, perfect for modern interiors.",
    price: 350,
    category: "Home Elegance",
    brand: "Luxurious Innovation",
    image:
      "https://images.pexels.com/photos/4207787/pexels-photo-4207787.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
  {
    name: "Apex Hypercar Model",
    description:
      "1:8 scale model of the concept hypercar, featuring working suspension and engine details.",
    price: 4500,
    category: "Automotive",
    brand: "Apex",
    image:
      "https://images.pexels.com/photos/3593922/pexels-photo-3593922.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
];

// Helper to shuffle array
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

async function main() {
  console.log(`🧹 Cleaning old data...`);
  // Deletion order is important to respect database constraints
  await prisma.review.deleteMany();
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.wishlistItem.deleteMany();
  await prisma.wishlist.deleteMany();
  await prisma.cartItem.deleteMany();
  await prisma.cart.deleteMany();
  await prisma.variant.deleteMany();
  await prisma.product.deleteMany();
  await prisma.brand.deleteMany();
  await prisma.category.deleteMany();
  await prisma.user.deleteMany();

  console.log(`🌱 Start seeding ...`);

  // --- Create Multiple Users ---
  const users = [];
  for (let i = 0; i < 5; i++) {
    const user = await prisma.user.create({
      data: {
        username: `vipclient${i + 1}`,
        email: `vip${i + 1}@luxury.com`,
        password: "securepassword",
      },
    });
    users.push(user);
  }
  console.log(`👤 Created ${users.length} VIP users`);

  // --- Create Multiple Brands ---
  const brands = {};
  for (const name of BRAND_NAMES) {
    brands[name] = await prisma.brand.create({ data: { name } });
  }
  console.log(`🏭 Created brands`);

  // --- Create Multiple Categories ---
  const categories = {};
  for (const name of CATEGORY_NAMES) {
    categories[name] = await prisma.category.create({
      data: { name, description: "Premium collection" },
    });
  }
  console.log(`📚 Created categories`);

  // --- Prepare Product Batch (Shuffle to prevent clustering) ---
  let productBatch = [];

  const VARIATIONS = [
    { suffix: "", priceMult: 1, stock: 5 },
    { suffix: " (Limited Edition)", priceMult: 1.5, stock: 1 },
    { suffix: " - Noir", priceMult: 1.1, stock: 3 },
    { suffix: " - Platinum", priceMult: 2.0, stock: 2 },
  ];

  for (const p of LUXURY_PRODUCTS) {
    // Find category ID
    let catId = categories[p.category]?.id;
    if (!catId) catId = categories[CATEGORY_NAMES[0]].id;

    // Find brand ID
    let brandId = brands[p.brand]?.id;
    if (!brandId) brandId = brands[BRAND_NAMES[0]].id;

    // Create variation objects
    for (const v of VARIATIONS) {
      const title = p.name + v.suffix;
      const price = Math.floor(p.price * v.priceMult);

      productBatch.push({
        data: {
          title: title,
          description: p.description,
          price: price,
          discountPrice: price > 10000 ? Math.floor(price * 0.9) : null,
          images: [p.image],
          brandId: brandId,
          categoryId: catId,
          ratingsAverage: Number((4.5 + Math.random() * 0.5).toFixed(1)),
          ratingsCount: faker.number.int({ min: 1, max: 50 }),
          variants: {
            create: [
              {
                color: "Standard",
                size: "Standard",
                stock: v.stock,
                price: price,
              },
            ],
          },
        },
      });
    }
  }

  // Shuffle the batch so creation order is random
  productBatch = shuffleArray(productBatch);

  // Execute creation
  let count = 0;
  for (const item of productBatch) {
    await prisma.product.create(item);
    count++;
  }

  console.log(`📦 Created ${count} shuffled luxury products`);
  console.log(`✅ Seeding finished.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

export default main;
