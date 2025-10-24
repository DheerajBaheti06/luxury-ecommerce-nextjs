"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { X, ArrowRight, ChevronLeft, ShoppingCart } from "lucide-react";

interface OrderState {
  product: {
    id: string;
    name: string;
    price: string;
    priceValue: number;
  } | null;
  quantity: number;
  addons: {
    id: string;
    name: string;
    price: number;
  }[];
}

const PRODUCTS = {
  startup: {
    id: "startup",
    name: "Starter 3D Render",
    price_usd: 299,
    price_inr: 25000,
    description: "Perfect for single product visualization",
  },
  pro: {
    id: "pro",
    name: "Professional 3D Animation",
    price_usd: 699,
    price_inr: 55000,
    description: "Ideal for marketing campaigns",
  },
  premium: {
    id: "premium",
    name: "Premium 3D Suite",
    price_usd: 2049,
    price_inr: 170500,
    description: "Complete 3D solution for enterprises",
  },
};

const ADDONS = {
  modeling: {
    name: "3D Modeling Service",
    price_usd: 120,
    price_inr: 10000,
    description: "Professional 3D modeling for your products",
  },
  renders: {
    name: "Additional Renders",
    price_usd: 60,
    price_inr: 5000,
    description: "Extra high-quality renders (10 images)",
  },
  animation: {
    name: "Extended Animation",
    price_usd: 150,
    price_inr: 12000,
    description: "Additional 10 seconds of animation",
  },
};

type Currency = "INR" | "USD";

function guessLocalCurrency(): Currency {
  const lang = typeof navigator !== "undefined" ? navigator.language : "";
  const tz =
    typeof Intl !== "undefined"
      ? Intl.DateTimeFormat().resolvedOptions().timeZone
      : "";
  if (/-(IN|PK|BD)\b/i.test(lang) || /(Kolkata|Karachi|Dhaka)/i.test(tz || ""))
    return "INR";
  return "USD";
}

export default function CheckoutPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [currentStep, setCurrentStep] = useState(1);
  const [isInitialized, setIsInitialized] = useState(false);
  const [currency, setCurrency] = useState<Currency>("USD");
  const [order, setOrder] = useState<OrderState>({
    product: null,
    quantity: 1,
    addons: [],
  });

  // Load currency from geo API
  useEffect(() => {
    let cancelled = false;
    async function loadCurrency() {
      try {
        const res = await fetch("/api/geo", { cache: "no-store" });
        if (!res.ok) throw new Error("geo failed");
        const data = await res.json();
        if (!cancelled) setCurrency(data?.currency === "INR" ? "INR" : "USD");
      } catch {
        if (!cancelled) setCurrency(guessLocalCurrency());
      }
    }
    loadCurrency();
    return () => {
      cancelled = true;
    };
  }, []);

  // Initialize order from URL params only once
  useEffect(() => {
    if (isInitialized || currency === null) return;

    const productId = searchParams.get("product");
    if (productId && PRODUCTS[productId as keyof typeof PRODUCTS]) {
      const productData = PRODUCTS[productId as keyof typeof PRODUCTS];

      const product = {
        id: productData.id,
        name: productData.name,
        price:
          currency === "INR"
            ? `₹${productData.price_inr.toLocaleString()}/-`
            : `$${productData.price_usd}`,
        priceValue:
          currency === "INR" ? productData.price_inr : productData.price_usd,
      };

      setOrder({
        product,
        quantity: 1,
        addons: [],
      });

      setIsInitialized(true);
    } else {
      router.push("/products");
    }
  }, [searchParams, router, isInitialized, currency]);

  const calculateTotal = () => {
    let total = (order.product?.priceValue || 0) * order.quantity;
    order.addons.forEach((addon) => {
      total += addon.price;
    });
    return total;
  };

  const formatPrice = (price: number) => {
    if (currency === "INR") {
      return `₹${price.toLocaleString()}`;
    } else {
      return `$${price.toLocaleString()}`;
    }
  };

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep === 1) {
      router.push(`/products/${order.product?.id}`);
      return;
    }
    setCurrentStep(currentStep - 1);
  };

  const generateWhatsAppMessage = () => {
    let message = `Hi, I would like to order:\n\n`;
    message += `📦 Product: ${order.product?.name} - ${order.product?.price}\n`;
    message += `🔢 Quantity: ${order.quantity}\n`;

    if (order.addons.length > 0) {
      message += `\n➕ Add-ons:\n`;
      order.addons.forEach((addon) => {
        const addonPrice = formatPrice(addon.price);
        message += `  • ${addon.name} - ${addonPrice}\n`;
      });
    }

    message += `\n💰 Total: ${formatPrice(calculateTotal())}\n\n`;
    message += `Currency: ${currency}\n`;
    message += `Please confirm the details and let me know the next steps.`;

    return encodeURIComponent(message);
  };

  const handleConfirmOrder = () => {
    const whatsappMessage = generateWhatsAppMessage();
    // Using a generic business number since we don't have the specific one
    const whatsappUrl = `https://wa.me/1234567890?text=${whatsappMessage}`;
    window.open(whatsappUrl, "_blank");
    router.push("/");
  };

  const toggleAddon = (addonId: string) => {
    const addonData = ADDONS[addonId as keyof typeof ADDONS];
    if (!addonData) return;

    const addonPrice =
      currency === "INR" ? addonData.price_inr : addonData.price_usd;

    setOrder((prev) => {
      const existingAddonIndex = prev.addons.findIndex((a) => a.id === addonId);

      if (existingAddonIndex >= 0) {
        // Remove addon
        const newAddons = [...prev.addons];
        newAddons.splice(existingAddonIndex, 1);
        return { ...prev, addons: newAddons };
      } else {
        // Add addon
        return {
          ...prev,
          addons: [
            ...prev.addons,
            {
              id: addonId,
              name: addonData.name,
              price: addonPrice,
            },
          ],
        };
      }
    });
  };

  const updateQuantity = (newQuantity: number) => {
    if (newQuantity >= 1 && newQuantity <= 10) {
      setOrder((prev) => ({ ...prev, quantity: newQuantity }));
    }
  };

  const getProgressPercentage = () => {
    return (currentStep / 3) * 100;
  };

  // Show loading state until initialized
  if (!isInitialized || !order.product) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <div className="w-6 h-6 border-2 border-[#C6FF3A] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      {/* Cleaner Inline Header */}
      <div className="sticky top-0 z-50 liquid-glass-header border-b border-neutral-900">
        <div className="px-4 py-3 sm:px-6 sm:py-4">
          <div className="flex items-center justify-between mb-3 sm:mb-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleBack}
              className="p-2 hover:bg-neutral-800 rounded-full -ml-2 sm:p-2.5"
            >
              {currentStep === 1 ? (
                <X className="h-4 w-4 sm:h-5 sm:w-5" />
              ) : (
                <ChevronLeft className="h-4 w-4 sm:h-5 sm:w-5" />
              )}
            </Button>
            {/* Inline Product Name and Price */}
            <div className="flex items-center justify-between flex-1 mx-3 sm:mx-4">
              <div className="text-base font-semibold text-white sm:text-lg">
                Checkout
              </div>
              <div className="text-base font-bold text-[#C6FF3A] sm:text-lg">
                {formatPrice(calculateTotal())}
              </div>
            </div>
            <div className="w-8 sm:w-10" /> {/* Spacer for balance */}
          </div>

          {/* Refined Progress Bar */}
          <div className="h-0.5 bg-neutral-800 rounded-full overflow-hidden sm:h-1">
            <div
              className="h-full bg-[#C6FF3A] rounded-full transition-all duration-500 ease-out"
              style={{ width: `${getProgressPercentage()}%` }}
            />
          </div>
        </div>
      </div>

      {/* Content with Responsive Spacing */}
      <div className="px-4 py-8 pb-32 sm:px-6 sm:py-12 sm:pb-40">
        <div className="max-w-sm mx-auto sm:max-w-md">
          {currentStep === 1 && (
            // Product Review Step
            <div className="space-y-8 sm:space-y-10">
              <div className="text-center space-y-3 sm:space-y-4">
                <h2 className="text-2xl font-bold text-white sm:text-3xl">
                  Review Your Order
                </h2>
                <p className="text-neutral-400 text-base leading-relaxed sm:text-lg">
                  Confirm your product selection and quantity
                </p>
              </div>

              <Card className="border-neutral-800 liquid-glass rounded-xl sm:rounded-2xl">
                <CardContent className="p-5 space-y-4 sm:p-8 sm:space-y-6">
                  <div className="flex justify-between items-center py-3 border-b border-neutral-800 sm:py-4">
                    <div>
                      <h4 className="font-semibold text-white text-base sm:text-lg">
                        {order.product.name}
                      </h4>
                      <p className="text-neutral-400 text-sm mt-0.5 sm:mt-1">
                        {
                          PRODUCTS[order.product.id as keyof typeof PRODUCTS]
                            ?.description
                        }
                      </p>
                    </div>
                    <span className="font-bold text-white text-base sm:text-lg">
                      {order.product.price}
                    </span>
                  </div>

                  <div className="flex justify-between items-center py-4 bg-[#C6FF3A]/10 rounded-xl px-4 mt-4 sm:py-6 sm:rounded-2xl sm:px-6 sm:mt-6">
                    <div>
                      <h4 className="text-lg font-bold text-white sm:text-xl">
                        Quantity
                      </h4>
                      <div className="flex items-center gap-3 mt-2">
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => updateQuantity(order.quantity - 1)}
                          disabled={order.quantity <= 1}
                          className="border-neutral-700 text-white hover:bg-neutral-800"
                        >
                          -
                        </Button>
                        <span className="text-lg font-semibold w-8 text-center">
                          {order.quantity}
                        </span>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => updateQuantity(order.quantity + 1)}
                          disabled={order.quantity >= 10}
                          className="border-neutral-700 text-white hover:bg-neutral-800"
                        >
                          +
                        </Button>
                      </div>
                    </div>
                    <span className="text-2xl font-bold text-[#C6FF3A] sm:text-3xl">
                      {formatPrice(
                        (order.product.priceValue || 0) * order.quantity
                      )}
                    </span>
                  </div>
                </CardContent>
              </Card>

              <Button
                onClick={handleNext}
                className="w-full h-12 text-base font-semibold bg-[#C6FF3A] text-black hover:bg-[#C6FF3A]/90 rounded-xl shadow-lg shadow-[#C6FF3A]/20 sm:h-16 sm:text-xl sm:rounded-2xl"
              >
                Continue to Add-ons
                <ArrowRight className="h-4 w-4 ml-2 sm:h-6 sm:w-6 sm:ml-3" />
              </Button>
            </div>
          )}

          {currentStep === 2 && (
            // Add-ons Step
            <div className="space-y-8 sm:space-y-10">
              <div className="text-center space-y-3 sm:space-y-4">
                <h2 className="text-2xl font-bold text-white sm:text-3xl">
                  Enhance Your Order
                </h2>
                <p className="text-neutral-400 text-base leading-relaxed sm:text-lg">
                  Add optional services to your purchase
                </p>
              </div>

              <div className="space-y-4">
                {Object.entries(ADDONS).map(([addonId, addon]) => {
                  const addonPrice =
                    currency === "INR"
                      ? `+₹${addon.price_inr.toLocaleString()}`
                      : `+$${addon.price_usd}`;
                  const isSelected = order.addons.some((a) => a.id === addonId);

                  return (
                    <Card
                      key={addonId}
                      className={`border-neutral-800 liquid-glass rounded-xl sm:rounded-2xl cursor-pointer transition-all ${
                        isSelected
                          ? "border-[#C6FF3A] bg-[#C6FF3A]/5"
                          : "hover:border-neutral-700"
                      }`}
                      onClick={() => toggleAddon(addonId)}
                    >
                      <CardContent className="p-5 sm:p-6">
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="font-semibold text-white text-base sm:text-lg">
                              {addon.name}
                            </h4>
                            <p className="text-neutral-400 text-sm mt-1 sm:mt-2">
                              {addon.description}
                            </p>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className="text-[#C6FF3A] font-bold text-sm sm:text-base">
                              {addonPrice}
                            </span>
                            <div
                              className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                                isSelected
                                  ? "border-[#C6FF3A] bg-[#C6FF3A]"
                                  : "border-neutral-600"
                              }`}
                            >
                              {isSelected && (
                                <div className="w-2 h-2 rounded-full bg-black"></div>
                              )}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>

              <div className="flex gap-3">
                <Button
                  variant="outline"
                  onClick={handleBack}
                  className="flex-1 h-12 text-base border-neutral-700 text-white hover:bg-neutral-800 rounded-xl sm:h-16 sm:text-xl sm:rounded-2xl"
                >
                  Back
                </Button>
                <Button
                  onClick={handleNext}
                  className="flex-1 h-12 text-base font-semibold bg-[#C6FF3A] text-black hover:bg-[#C6FF3A]/90 rounded-xl shadow-lg shadow-[#C6FF3A]/20 sm:h-16 sm:text-xl sm:rounded-2xl"
                >
                  Continue to Summary
                  <ArrowRight className="h-4 w-4 ml-2 sm:h-6 sm:w-6 sm:ml-3" />
                </Button>
              </div>
            </div>
          )}

          {currentStep === 3 && (
            // Summary Step
            <div className="space-y-8 sm:space-y-10">
              <div className="text-center space-y-3 sm:space-y-4">
                <h2 className="text-2xl font-bold text-white sm:text-3xl">
                  Order Summary
                </h2>
                <p className="text-neutral-400 text-base leading-relaxed sm:text-lg">
                  Review your selections before confirming
                </p>
              </div>

              <Card className="border-neutral-800 liquid-glass rounded-xl sm:rounded-2xl">
                <CardContent className="p-5 space-y-4 sm:p-8 sm:space-y-6">
                  <div className="flex justify-between items-center py-3 border-b border-neutral-800 sm:py-4">
                    <div>
                      <h4 className="font-semibold text-white text-base sm:text-lg">
                        {order.product.name}
                      </h4>
                      <p className="text-neutral-400 text-sm mt-0.5 sm:mt-1">
                        Quantity: {order.quantity}
                      </p>
                    </div>
                    <span className="font-bold text-white text-base sm:text-lg">
                      {formatPrice(
                        (order.product.priceValue || 0) * order.quantity
                      )}
                    </span>
                  </div>

                  {order.addons.map((addon) => (
                    <div
                      key={addon.id}
                      className="flex justify-between items-center py-3 border-b border-neutral-800 sm:py-4"
                    >
                      <div>
                        <h4 className="font-semibold text-white text-sm sm:text-base">
                          {addon.name}
                        </h4>
                      </div>
                      <span className="font-bold text-white text-sm sm:text-base">
                        +{formatPrice(addon.price)}
                      </span>
                    </div>
                  ))}

                  <div className="flex justify-between items-center py-4 bg-[#C6FF3A]/10 rounded-xl px-4 mt-4 sm:py-6 sm:rounded-2xl sm:px-6 sm:mt-6">
                    <h4 className="text-lg font-bold text-white sm:text-xl">
                      Total
                    </h4>
                    <span className="text-2xl font-bold text-[#C6FF3A] sm:text-3xl">
                      {formatPrice(calculateTotal())}
                    </span>
                  </div>
                </CardContent>
              </Card>

              <Button
                onClick={handleConfirmOrder}
                className="w-full h-12 text-base font-semibold bg-[#C6FF3A] text-black hover:bg-[#C6FF3A]/90 rounded-xl shadow-lg shadow-[#C6FF3A]/20 sm:h-16 sm:text-xl sm:rounded-2xl"
              >
                <ShoppingCart className="h-5 w-5 mr-2 sm:h-6 sm:w-6" />
                Confirm Order via WhatsApp
                <ArrowRight className="h-4 w-4 ml-2 sm:h-6 sm:w-6 sm:ml-3" />
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
