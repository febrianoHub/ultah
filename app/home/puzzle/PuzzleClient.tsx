"use client";
import { useAutoPlay } from "@/hooks/useAutoPlay";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { IoMdArrowBack } from "react-icons/io";
import { JigsawPuzzle } from "react-jigsaw-puzzle/lib";
import "react-jigsaw-puzzle/lib/jigsaw-puzzle.css";

export default function PuzzleClient({ image }: { image: string }) {
  const [solved, setSolved] = useState(false);
  const [solvedTrigger, setSolvedTrigger] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  useAutoPlay();

  useEffect(() => {
    if (solvedTrigger) {
      setSolved(true);
      setSolvedTrigger(false);
    }
  }, [solvedTrigger]);

  useEffect(() => {
    const preventScroll = (e: TouchEvent) => {
      if (isDragging) {
        e.preventDefault();
      }
    };

    if (isDragging) {
      document.body.style.overflow = "hidden";
      document.addEventListener("touchmove", preventScroll, { passive: false });
    } else {
      document.body.style.overflow = "auto";
      document.removeEventListener("touchmove", preventScroll);
    }

    return () => {
      document.body.style.overflow = "auto";
      document.removeEventListener("touchmove", preventScroll);
    };
  }, [isDragging]);

  return (
    <div className="min-h-screen p-5">
      <Link
        href="/home"
        className="rounded-2xl w-28 flex justify-center items-center gap-2 text-pink-600 font-semibold backdrop-blur-2xl py-2 px-5 bg-gray-50/30"
      >
        <IoMdArrowBack />
        <span>Back</span>
      </Link>
      <h1 className="text-3xl text-center sm:text-4xl font-serif text-pink-600 mb-8">
        Puzzle Challenge
      </h1>
      <div className="flex flex-col items-center">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full max-w-xl">
          <div
            className="bg-white shadow-md rounded-xl p-2 flex items-center justify-center"
            style={{
              touchAction: "none", // Disable default touch behaviors
              userSelect: "none", // Prevent text selection
            }}
            onTouchStart={() => setIsDragging(true)}
            onTouchEnd={() => setIsDragging(false)}
            onMouseDown={() => setIsDragging(true)}
            onMouseUp={() => setIsDragging(false)}
          >
            <div className=" w-full">
              <JigsawPuzzle
                imageSrc={image}
                rows={3}
                columns={3}
                onSolved={() => {
                  setTimeout(() => setSolved(true), 0);
                }}
              />
            </div>
          </div>

          <div className="bg-white md:w-auto w-full shadow-md rounded-xl p-2 flex items-center justify-center">
            <Image
              width={1024}
              height={1024}
              src={image}
              alt="Original"
              className="rounded-lg object-contain"
            />
          </div>
        </div>

        {solved && (
          <div
            className="fixed inset-0 bg-black/60 flex items-center justify-center z-50"
            onClick={() => setSolved(false)}
          >
            <div
              className="bg-white rounded-xl shadow-lg p-6 text-center max-w-sm"
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="text-pink-600 text-2xl font-bold mb-4">
                Selamat!
              </h2>
              <p className="text-gray-700">
                Puzzle berhasil disusun dengan benar.
              </p>
              <button
                onClick={() => setSolved(false)}
                className="mt-5 px-4 py-2 bg-pink-500 text-white rounded-lg"
              >
                Tutup
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
