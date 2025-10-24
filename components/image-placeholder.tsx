import Image from "next/image";
import { cn } from "@/lib/utils";

interface ImagePlaceholderProps {
  src: string;
  alt: string;
  className?: string;      // This will now apply to the container div
  imgClassName?: string;   // This will apply to the Next.js Image component
  sizes?: string;
  priority?: boolean;
}

const ImagePlaceholder = ({
  src,
  alt,
  className,
  imgClassName,
  sizes = "100vw",
  priority = false,
}: ImagePlaceholderProps) => {
  return (
    // This div is the key. It's a relative container that takes the aspect ratio class.
    <div className={cn("relative w-full overflow-hidden", className)}>
      <Image
        src={src}
        alt={alt}
        fill // The 'fill' prop makes the image fill this container.
        className={cn("object-cover", imgClassName)}
        sizes={sizes}
        priority={priority}
      />
    </div>
  );
};

export default ImagePlaceholder;