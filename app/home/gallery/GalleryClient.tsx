"use client";

import Modal from "@/components/Modal";
import { useAutoPlay } from "@/hooks/useAutoPlay";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { IoMdArrowBack } from "react-icons/io";

type GalleryItem = {
  src: string;
  type: "image" | "video";
};

export default function GalleryClient({ gallery }: { gallery: GalleryItem[] }) {
  const [selected, setSelected] = useState<GalleryItem | null>(null);
  useAutoPlay();

  return (
    <div className="min-h-screen p-3">
      <Link
        href="/home"
        className="rounded-2xl w-28 flex justify-center items-center gap-2 text-pink-600 font-semibold backdrop-blur-2xl py-2 px-5 bg-gray-50/30"
      >
        <IoMdArrowBack />
        <span>Back</span>
      </Link>
      <h1 className="font-serif text-center sm:text-4xl text-2xl text-pink-600">
        Our Beautiful picture
      </h1>
      <p className="text-2xl text-center mb-6">❤️</p>

      <div className="flex flex-col items-center">
        <div className="md:w-4/5  overflow-auto w-full grid grid-cols-3 sm:grid-cols-4 gap-5 bg-white rounded-lg shadow-md p-3">
          {gallery.length === 0
            ? Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={i}
                  className="aspect-square bg-gray-200 animate-pulse rounded-md"
                />
              ))
            : gallery.map((item, i) => (
                <div
                  key={i}
                  className="aspect-square overflow-hidden rounded-md cursor-pointer"
                  onClick={() => setSelected(item)}
                >
                  {item.type === "image" ? (
                    <Image
                      width={512}
                      height={512}
                      src={item.src}
                      alt={`gallery-${i}`}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <video
                      src={item.src}
                      className="w-full h-full object-cover"
                      muted
                    />
                  )}
                </div>
              ))}
        </div>
      </div>

      <Modal open={!!selected} onClose={() => setSelected(null)}>
        {selected?.type === "image" ? (
          <Image
            width={512}
            height={512}
            src={selected.src}
            alt="preview"
            className="max-h-[80vh] max-w-[90vw] object-contain rounded-lg"
          />
        ) : selected?.type === "video" ? (
          <video
            src={selected.src}
            controls
            autoPlay
            className="max-h-[80vh] max-w-[90vw] rounded-lg"
          />
        ) : null}
      </Modal>
    </div>
  );
}
