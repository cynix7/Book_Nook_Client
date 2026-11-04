"use client";

import Link from "next/link";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "cn";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const slides = [
  {
    title: "Discover Your Next Read",
    text: "Browse a curated collection of fiction, non-fiction, and everything in between — handpicked for every kind of reader.",
    image:
      "https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&w=1600&q=80",
  },
  {
    title: "Borrow, Return, Repeat",
    text: "Keep track of your borrowed books and due dates in one place. No more overdue surprises — just pure reading.",
    image:
      "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=1600&q=80",
  },
  {
    title: "Share Your Library",
    text: "Add the books you own and let others discover them. Build your personal shelf and grow the community catalog.",
    image:
      "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?auto=format&fit=crop&w=1600&q=80",
  },
];

export function BannerSlider() {
  return (
    <Swiper
      modules={[Autoplay, Navigation, Pagination]}
      autoplay={{ delay: 5000, disableOnInteraction: false }}
      loop
      navigation
      pagination={{ clickable: true }}
      slidesPerView={1}
      className="container mx-auto h-105 w-full overflow-hidden rounded-lg border border-border md:h-120 [--swiper-navigation-color:#fff] [--swiper-pagination-bullet-inactive-color:#fff] [--swiper-pagination-bullet-inactive-opacity:0.5] [--swiper-pagination-color:#f97316]"
    >
      {slides.map((slide) => (
        <SwiperSlide key={slide.title}>
          <div
            className="relative flex h-full items-center bg-cover bg-center"
            style={{ backgroundImage: `url(${slide.image})` }}
          >
            <div className="absolute inset-0 bg-linear-to-r from-black/75 via-black/50 to-black/20" />
            <div className="relative z-10 max-w-xl px-8 md:px-12">
              <h2 className="font-heading text-3xl font-bold text-white md:text-4xl">
                {slide.title}
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-white/85">
                {slide.text}
              </p>
              <Link
                href="/all-books"
                className={cn(
                  buttonVariants({ variant: "default" }),
                  "mt-6 h-10 gap-2 bg-linear-to-br from-orange-500 to-red-600 px-6 text-white hover:from-orange-600 hover:to-red-700",
                )}
              >
                Browse Books
              </Link>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
