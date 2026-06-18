import {
  ScrollGallery,
  ScrollGalleryItem,
  ScrollGalleryNext,
  ScrollGalleryPrevious,
  ScrollGalleryViewport,
} from "@/registry/default/ui/scroll-gallery";

const slides = [
  {
    color: "from-rose-400 to-orange-300",
    subtitle: "Mountain trails at golden hour",
    title: "Alpine Ridge",
  },
  {
    color: "from-sky-400 to-indigo-300",
    subtitle: "Where the city meets the sea",
    title: "Harbor Lights",
  },
  {
    color: "from-emerald-400 to-teal-300",
    subtitle: "Mist rolling through ancient pines",
    title: "Old Growth",
  },
  {
    color: "from-violet-400 to-fuchsia-300",
    subtitle: "Dunes shifting under a pink sky",
    title: "Desert Bloom",
  },
  {
    color: "from-amber-400 to-yellow-300",
    subtitle: "Endless rows at first light",
    title: "Field Notes",
  },
  {
    color: "from-cyan-400 to-blue-300",
    subtitle: "Tide pools and quiet shores",
    title: "Low Tide",
  },
];

export default function Particle() {
  return (
    <ScrollGallery className="w-full max-w-xl">
      <div className="flex items-center justify-between px-1">
        <div className="flex flex-col">
          <span className="font-semibold text-sm">Featured</span>
          <span className="text-muted-foreground text-xs">
            Swipe or use the arrows to browse
          </span>
        </div>
        <div className="flex gap-2">
          <ScrollGalleryPrevious />
          <ScrollGalleryNext />
        </div>
      </div>
      <ScrollGalleryViewport>
        {slides.map((slide) => (
          <ScrollGalleryItem
            className="w-64 overflow-hidden rounded-xl border bg-card"
            key={slide.title}
          >
            <div
              aria-hidden="true"
              className={`h-36 w-full bg-gradient-to-br ${slide.color}`}
            />
            <div className="flex flex-col gap-0.5 p-3">
              <span className="font-medium text-sm">{slide.title}</span>
              <span className="text-muted-foreground text-xs">
                {slide.subtitle}
              </span>
            </div>
          </ScrollGalleryItem>
        ))}
      </ScrollGalleryViewport>
    </ScrollGallery>
  );
}
