"use client";

import { useState } from "react";
import {
  Lightbox,
  LightboxImage,
  LightboxNext,
  LightboxPopup,
  LightboxPrevious,
  LightboxTrigger,
} from "@/registry/default/ui/lightbox";

const images = [
  {
    alt: "Snow-capped mountain range at sunrise",
    src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1600&q=80",
    thumb:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=320&q=80",
  },
  {
    alt: "Forest path covered in autumn leaves",
    src: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1600&q=80",
    thumb:
      "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=320&q=80",
  },
  {
    alt: "Calm lake reflecting the evening sky",
    src: "https://images.unsplash.com/photo-1439066615861-d1af74d74000?w=1600&q=80",
    thumb:
      "https://images.unsplash.com/photo-1439066615861-d1af74d74000?w=320&q=80",
  },
];

export default function Particle() {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  const showAt = (i: number) => {
    setIndex(i);
    setOpen(true);
  };

  const previous = () =>
    setIndex((i) => (i - 1 + images.length) % images.length);
  const next = () => setIndex((i) => (i + 1) % images.length);

  const active = images[index];

  return (
    <Lightbox onOpenChange={setOpen} open={open}>
      <div className="flex flex-wrap gap-2">
        {images.map((image, i) => (
          <LightboxTrigger
            className="size-20 cursor-pointer overflow-hidden rounded-lg border outline-none transition-opacity hover:opacity-80 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 focus-visible:ring-offset-background"
            key={image.src}
            onClick={() => showAt(i)}
          >
            <img
              alt={image.alt}
              className="size-full object-cover"
              src={image.thumb}
            />
          </LightboxTrigger>
        ))}
      </div>
      <LightboxPopup>
        <LightboxPrevious onClick={previous} />
        {active && <LightboxImage alt={active.alt} src={active.src} />}
        <LightboxNext onClick={next} />
      </LightboxPopup>
    </Lightbox>
  );
}
