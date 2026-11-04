"use client";

import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const quotes = [
  {
    text: "A reader lives a thousand lives before he dies. The man who never reads lives only one.",
    author: "George R.R. Martin",
    image:
      "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?auto=format&fit=crop&w=1600&q=80",
  },
  {
    text: "A book is a dream that you hold in your hand.",
    author: "Neil Gaiman",
    image:
      "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=1600&q=80",
  },
  {
    text: "Books are a uniquely portable magic.",
    author: "Stephen King",
    image:
      "https://images.unsplash.com/photo-1519682337058-a94d519337bc?auto=format&fit=crop&w=1600&q=80",
  },
  {
    text: "Today a reader, tomorrow a leader.",
    author: "Margaret Fuller",
    image:
      "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=1600&q=80",
  },
];

export default function QuoteSection() {
  return (
    <section className="container mx-auto mt-16">
      <Swiper
        modules={[Autoplay, Navigation, Pagination]}
        autoplay={{ delay: 6000, disableOnInteraction: false }}
        loop
        navigation
        pagination={{ clickable: true }}
        slidesPerView={1}
        className="h-80 w-full overflow-hidden rounded-lg border border-border md:h-96 [--swiper-navigation-color:#fff] [--swiper-pagination-bullet-inactive-color:#fff] [--swiper-pagination-bullet-inactive-opacity:0.5] [--swiper-pagination-color:#f97316]"
      >
        {quotes.map((quote) => (
          <SwiperSlide key={quote.author}>
            <div
              className="relative flex h-full items-center justify-center bg-cover bg-center"
              style={{ backgroundImage: `url(${quote.image})` }}
            >
              <div className="absolute inset-0 bg-black/65" />
              <figure className="relative z-10 max-w-3xl px-12 text-center">
                <span
                  aria-hidden="true"
                  className="block font-heading text-7xl leading-none text-orange-500/50 select-none"
                >
                  &ldquo;
                </span>
                <blockquote className="font-heading mt-2 text-lg leading-relaxed font-medium text-white italic md:text-2xl">
                  {quote.text}
                </blockquote>
                <figcaption className="mt-5 text-xs font-medium tracking-widest text-white/70 uppercase md:text-sm">
                  {quote.author}
                </figcaption>
              </figure>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
