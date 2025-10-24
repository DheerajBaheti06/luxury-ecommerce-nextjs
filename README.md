# Modern E-commerce Platform

A modern, responsive e-commerce platform built with cutting-edge technologies for selling digital and physical products. This platform provides a complete solution for online retailers with features designed to enhance user experience and drive conversions.

[![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-blue?style=for-the-badge&logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3-blue?style=for-the-badge&logo=tailwindcss)](https://tailwindcss.com/)
[![Vercel](https://img.shields.io/badge/Vercel-Deployment-black?style=for-the-badge&logo=vercel)](https://vercel.com/)

## Overview

This is a fully functional e-commerce platform designed for selling products online with a focus on user experience and performance. The platform includes all essential e-commerce features and is built with modern web technologies.

Key features include:

- Product catalog with categories and search functionality
- Shopping cart with quantity adjustment
- Wishlist for saving favorite items
- User authentication and account management
- Detailed product pages with images and specifications
- Fully responsive design for all device sizes
- SEO optimization with structured data
- Admin dashboard for managing products and content

## Features

- **Product Catalog**: Organized product listings with categories, search, and filtering
- **Shopping Cart**: Intuitive cart management with quantity adjustments
- **Wishlist**: Save and manage favorite products
- **User Accounts**: Secure authentication with profile management
- **Product Details**: Comprehensive product pages with images, descriptions, and specifications
- **Responsive Design**: Mobile-first approach optimized for all devices
- **SEO Optimization**: Meta tags, structured data, and semantic HTML for better search visibility
- **Admin Dashboard**: Content management system for products, pricing, and site configuration
- **Performance**: Optimized images, static generation, and efficient code for fast loading
- **Order Management**: Streamlined checkout process with multiple payment options

## Tech Stack

- **Frontend Framework**: Next.js 15 with App Router
- **UI Library**: React 19 with TypeScript
- **Styling**: Tailwind CSS for utility-first CSS
- **UI Components**: Radix UI for accessible UI primitives
- **Icons**: Lucide React for consistent iconography
- **State Management**: React Context API for global state
- **Animations**: Framer Motion for smooth transitions
- **Form Handling**: React Hook Form with Zod validation
- **Deployment**: Vercel or any Node.js compatible platform
- **Package Management**: pnpm for efficient dependency management

## Getting Started

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd <project-directory>
   ```

2. Install dependencies:

   ```bash
   pnpm install
   ```

3. Run the development server:

   ```bash
   pnpm dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### Build for Production

To create a production build:

```bash
pnpm build
```

To start the production server:

```bash
pnpm start
```

## Deployment

The website is designed for deployment on Vercel or similar platforms that support Next.js applications. The application uses static generation for optimal performance and can be deployed with any CI/CD pipeline.

## Project Structure

```
├── app/                 # Next.js app router pages and layouts
├── components/          # Reusable UI components
├── context/             # React context providers for global state
├── lib/                 # Utility functions and shared data
├── public/              # Static assets (images, icons, fonts)
└── styles/              # Global stylesheets
```

## Key Components

- **Product Catalog**: Browse products by category with search and filtering capabilities
- **Product Details**: Comprehensive product pages with images, descriptions, and specifications
- **Shopping Cart**: Full cart functionality with add/remove items and quantity adjustments
- **Wishlist**: Save favorite products for later viewing
- **User Authentication**: Secure login/signup system with session management
- **Admin Dashboard**: Content management system for products, pricing, and site configuration
- **Responsive Layout**: Mobile-first design approach with Tailwind CSS
- **SEO Optimization**: Meta tags, structured data, and semantic HTML for better search engine visibility

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

This project is proprietary and confidential. All rights reserved.
