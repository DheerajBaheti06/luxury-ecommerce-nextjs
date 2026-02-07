# Next.js 15 Modern Luxury E-Commerce Platform

A high-performance, premium e-commerce application built with **Next.js 15**, **React 19**, **TypeScript**, and **Tailwind CSS v4**. This project showcases modern web development practices including Server Components, streaming, optimistic UI updates, and a seamless "luxury" aesthetic.

## 🚀 Features

- **High-Performance Architecture**: Architected using **Next.js 15 App Router** and **React Server Components** for near-instant Time to First Byte (TTFB).
- **Advanced Product Filtering**: Efficient queries for real-time product filtering, searching, and sorting (by price, rating, category) powered by **Prisma ORM**.
- **Premium UI/UX**: Custom "Dark Mode" aesthetic with glassmorphism effects, smooth transitions using **Framer Motion**, and shimmer loading states.
- **Database Integrated**: Scalable schema with complex relationships (Categories, Brands, Variants) and a robust seed script for generating realistic demo data.
- **Interactive State**: Context-based state management for Cart and Wishlist customization.
- **Responsive Design**: Fully optimized mobile, tablet, and desktop views.

## 🛠 Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4, Lucide React (Icons), Framer Motion
- **Database/ORM**: Prisma, PostgreSQL (via Neon)
- **UI Components**: Radix UI primitives, Sonner (Toasts)
- **Forms**: React Hook Form, Zod

## ⚡ Getting Started

1.  **Clone the repository**

    ```bash
    git clone https://github.com/yourusername/luxury-ecommerce-nextjs.git
    cd luxury-ecommerce-nextjs
    ```

2.  **Install dependencies**

    ```bash
    npm install
    ```

3.  **Setup Database**

    ```bash
    npx prisma generate
    npx prisma db push
    # Seed with luxury demo data
    npx prisma db seed
    ```

4.  **Run Development Server**

    ```bash
    npm run dev
    ```

    Open [http://localhost:3000](http://localhost:3000) to view the application.

## 📦 Deployment (Vercel)

This project is optimized for deployment on Vercel.

1.  Push your code to GitHub.
2.  Import the project in Vercel.
3.  **Important**: Ensure you add your `DATABASE_URL` (from Neon) to the **Environment Variables** section in your Vercel Project Settings.
4.  The project is already configured for PostgreSQL, so no code changes are needed!

## 📄 License

MIT License - feel free to use this project for your portfolio or learning.
