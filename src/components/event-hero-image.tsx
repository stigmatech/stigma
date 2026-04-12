"use client";

import { useState } from "react";

interface EventHeroImageProps {
    src: string;
    alt: string;
}

export function EventHeroImage({ src, alt }: EventHeroImageProps) {
    const [imgSrc, setImgSrc] = useState(src || "/images/event-placeholder.webp");

    return (
        <img 
            src={imgSrc} 
            alt={alt}
            onError={() => setImgSrc("/images/event-placeholder.webp")}
            className="absolute inset-0 w-full h-full object-cover"
        />
    );
}
