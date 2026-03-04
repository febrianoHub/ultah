"use client";

import HomeCard from "@/components/HomeCard";
import { CiHeart } from "react-icons/ci";
import { useAutoPlay } from "@/hooks/useAutoPlay";

export default function Home() {
  useAutoPlay();

  return (
    <div className="min-h-screen p-2 pb-20">
      {" "}
      <h1 className="text-5xl font-serif text-pink-500 text-center">
        Menu Of Our Birthday
      </h1>
      <div className="text-xl space-x-2 flex justify-center items-center font-serif text-pink-600 text-center">
        <CiHeart />
        <p>To Afina Meutya Putri</p>
        <CiHeart />
      </div>
      <div className="flex justify-center items-center">
        <div className="grid grid-cols-2 md:w-4/5 w-full gap-5 p-4">
          <HomeCard
            image="/images/card/camera.png"
            href="/home/memories"
            title="Our Memories"
            description="Every precious moment ❤️"
          />
          <HomeCard
            image="/images/card/gallery.png"
            href="/home/gallery"
            title="Our Gallery"
            description="Beautiful picture 💞"
          />
          <HomeCard
            image="/images/card/puzzle.png"
            href="/home/puzzle"
            title="Secret Puzzle"
            description="Core memory"
          />
          <HomeCard
            image="/images/card/surat.png"
            href="/home/surat"
            title="Wish Notes"
            description="Wish messages just for you 💌"
          />
        </div>
      </div>
    </div>
  );
}
