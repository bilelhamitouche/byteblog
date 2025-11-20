"use client";
import { useState } from "react";
import Image from "next/image";

interface SafeImageProps {
  src: string;
  alt: string;
  fallback: string;
}

export default function SafeImage({ src, alt, fallback }: SafeImageProps) {
  const [hasFailed, setHasFailed] = useState(false);

  return (
    <div className="overflow-hidden relative rounded-md min-w-[120px] min-h-[90px]">
      <Image
        src={src}
        alt={alt}
        fill
        unoptimized={true}
        className={`absolute inset-0 object-cover transition-opacity duration-300 ${
          hasFailed ? "opacity-0" : "opacity-100"
        }`}
        onError={() => {
          setHasFailed(true);
        }}
      />

      <Image
        src={fallback}
        alt={alt}
        layout="fill"
        unoptimized={true}
        className="object-cover absolute inset-0"
      />
    </div>
  );
}
