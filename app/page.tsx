import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="font-sans flex items-center justify-center min-h-screen">
      <div className="relative sm:h-[600px] sm:w-[600px] h-[400px] w-[400px] sm:ml-0 ml-3 flex items-center justify-center">
        <Image
          src="/images/lovebg.png"
          alt="love"
          width={1024}
          height={1024}
          className="h-full w-full object-cover"
          priority
        />

        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <h1
            className="sm:text-2xl text-xl font-serif font-bold text-white"
            style={{
              textShadow:
                "2px 2px 4px rgba(0,0,0,0.6), 4px 4px 8px rgba(0,0,0,0.4)",
            }}
          >
            Happy Birthday 21Th
          </h1>

          <p className="font-serif mt-3  text-white/90 font-light">
            Special Gift For You
          </p>
          <Link
            href={"/auth"}
            className="bg-white/80 mt-2 hover:bg-white rounded-2xl py-1 px-6  text-pink-500"
          >
            Start
          </Link>
        </div>
      </div>
    </div>
  );
}
