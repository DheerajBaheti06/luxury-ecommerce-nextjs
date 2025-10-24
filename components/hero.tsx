// import { Button } from "@/components/ui/button";
// import Image from "next/image";
// import Link from "next/link";
// import { ArrowRight, ShoppingBag, Zap } from "lucide-react";

// export function Hero() {
//   return (
//     <section className="relative overflow-hidden bg-gray-950 text-white">
//       {/* Background Glow Effect */}
//       <div
//         aria-hidden="true"
//         className="absolute left-1/2 top-0 -z-10 -translate-x-1/2"
//       >
//         <div className="aspect-[1155/678] w-[72.1875rem] bg-gradient-to-tr from-[#16a34a] to-[#4ade80] opacity-20"
//           style={{
//             clipPath:
//               'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
//           }}
//         />
//       </div>

//       <div className="container mx-auto px-4">
//         <div className="grid items-center gap-12 py-16 sm:py-24 lg:grid-cols-2 lg:py-32">
//           {/* Text Content */}
//           <div className="text-center lg:text-left">
//             <p className="inline-flex items-center gap-2 rounded-full bg-lime-400/10 px-4 py-1 text-sm font-medium text-lime-300">
//               <Zap className="h-4 w-4" /> New Arrivals This Week
//             </p>
//             <h1 className="mt-4 text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl">
//               <span className="block">Define Your Style,</span>
//               <span className="block text-lime-400 drop-shadow-[0_0_20px_rgba(132,204,22,0.45)]">
//                 Elevate Your Life.
//               </span>
//             </h1>
//             <p className="mx-auto mt-6 max-w-lg text-lg text-gray-400 lg:mx-0">
//               Discover our curated collection of premium products, designed with passion and precision to fit your unique lifestyle.
//             </p>
//             <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center lg:justify-start">
//               <Button
//                 asChild
//                 size="lg"
//                 className="w-full rounded-full bg-lime-400 px-8 py-3 text-base font-semibold text-black transition-all hover:scale-105 hover:bg-lime-300 sm:w-auto"
//               >
//                 <Link href="/products">
//                   Shop Now <ArrowRight className="ml-2 h-5 w-5" />
//                 </Link>
//               </Button>
//               <Button
//                 asChild
//                 size="lg"
//                 variant="outline"
//                 className="w-full rounded-full border-gray-700 px-8 py-3 text-base font-semibold text-gray-300 transition-colors hover:border-lime-400/50 hover:bg-gray-800/50 hover:text-lime-400 sm:w-auto"
//               >
//                 <Link href="/collections">
//                   Explore Collections
//                 </Link>
//               </Button>
//             </div>
//           </div>

//           {/* Image/Visual Content */}
//           <div className="relative h-full min-h-[300px] lg:min-h-[500px]">
//             <div className="group perspective-1000">
//                 <div className="relative h-full w-full rounded-2xl border border-white/10 bg-black/30 p-2 shadow-2xl transition-all duration-500 preserve-3d group-hover:rotate-y-15">
//                   <div className="absolute inset-0 bg-gradient-to-br from-lime-500/10 to-transparent"></div>
//                   <Image
//                     src="https://images.pexels.com/photos/1055691/pexels-photo-1055691.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" // Replace with your main hero product image
//                     alt="Featured Product Showcase"
//                     width={600}
//                     height={720}
//                     priority
//                     className="h-full w-full rounded-xl object-cover object-center"
//                   />
//                    <div className="absolute bottom-4 left-4 rounded-xl border border-white/10 bg-black/50 p-3 text-white backdrop-blur-lg">
//                       <h3 className="font-semibold">Aura Smartwatch</h3>
//                       <p className="text-sm text-gray-300">Now in Midnight Green</p>
//                   </div>
//                 </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }

import { Button } from "@/components/ui/button";
import Link from "next/link";

export function Hero() {
  return (
    <section className="relative h-screen min-h-[600px] w-full text-white  shadow-black">
      {/* Background Image */}
      {/* <Image
        src="https://images.pexels.com/photos/1055691/pexels-photo-1055691.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
        alt="A stylish collection of fashion apparel and accessories"
        layout="fill"
        objectFit="cover"
        quality={85}
        className="relative inset-0 z-0"
        priority
      />  */}

      {/* Dark overlay for text readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/40 to-transparent z-10" />

      {/* Content */}
      <div className="relative z-20 container mx-auto flex h-full flex-col items-center justify-center px-4 pt-10 text-center">
        <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
          <span className="block">Unleash Your Style</span>
          <span className="block text-lime-400 drop-shadow-[0_0_20px_rgba(132,204,22,0.4)]">
            New Collection is Here
          </span>
        </h1>
        <p className="mt-4 max-w-md text-base text-gray-200 sm:text-lg md:mt-6 md:max-w-xl">
          Shop the latest trends and find the pieces that are uniquely you.
          Quality, style, and value delivered to your door.
        </p>
        <div className="mt-6 md:mt-8">
          <Button
            asChild
            size="lg"
            className="rounded-full hover:bg-lime-400 px-8 py-4 text-lg font-semibold text-black transition-all hover:scale-105 bg-white hover:transition-all font-bold hover:outline-10 hover:outline-lime-400 hover:text-black hover:shadow-md"
          >
            <Link href="/products">Shop Now</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
