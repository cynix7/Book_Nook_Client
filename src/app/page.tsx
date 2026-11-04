import { BannerSlider } from "@/components/banner-slider";
import NewArrival from "@/components/new-arrival";

export default function Home() {
  return (
    <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-8">
      <BannerSlider />
      <NewArrival />
    </main>
  );
}
