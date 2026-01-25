# Next.js Luxury E-Commerce Store

A high-performance, premium e-commerce application built with Next.js 14, TypeScript, and Tailwind CSS. Designed to showcase modern web development practices including Server Side Rendering (SSR), advanced filtering, and a seamless responsive UI.

![Project Preview](https://images.pexels.com/photos/1055691/pexels-photo-1055691.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1)

## 🚀 Features

- **High-Performance Architecture**: Utilizes Next.js Server Components for lightning-fast initial page loads and improved SEO.
- **Advanced Product Filtering**: URL-based filtering, searching, and sorting (by price, rating, category) powered by Prisma ORM.
- **Premium UI/UX**: Custom "Dark Mode" aesthetic with glassmorphism effects, smooth transitions, and shimmer loading states.
- **Database Integrated**: Real-time data fetching using Prisma with a robust seed script for generating curated luxury demos.
- **Interactive Cart & Wishlist**: Context-based state management for shopping features.
- **Responsive Design**: Fully optimized mobile, tablet, and desktop views.

## 🛠 Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS, Lucide React (Icons)
- **Database/ORM**: Prisma, SQLite (easy to swap for PostgreSQL)
- **UI Components**: Custom components with Radix UI primitives

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
    npx tsx prisma/seed.ts
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
