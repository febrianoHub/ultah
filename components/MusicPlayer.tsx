"use client";

import React, { useState } from "react";
import { usePathname } from "next/navigation";
import { useMusicPlayer } from "@/contexts/MusicContext";
import {
  FiPlay,
  FiPause,
  FiVolume2,
  FiVolumeX,
  FiChevronUp,
  FiChevronDown,
} from "react-icons/fi";

const MusicPlayer: React.FC = () => {
  const pathname = usePathname();
  const {
    isPlaying,
    currentTime,
    duration,
    volume,
    isVisible,
    togglePlay,
    setVolume,
    seekTo,
    hidePlayer,
  } = useMusicPlayer();

  const [isExpanded, setIsExpanded] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  // Only show music player on /home/* routes
  const shouldShowPlayer = pathname.startsWith("/home");

  if (!isVisible || !shouldShowPlayer) return null;

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = (parseFloat(e.target.value) / 100) * duration;
    seekTo(newTime);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value) / 100;
    setVolume(newVolume);
    setIsMuted(newVolume === 0);
  };

  const toggleMute = () => {
    if (isMuted) {
      setVolume(0.7);
      setIsMuted(false);
    } else {
      setVolume(0);
      setIsMuted(true);
    }
  };

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50">
      <div
        className={`bg-gradient-to-r from-pink-500 to-red-500 text-white shadow-2xl transition-all duration-300 ${
          isExpanded ? "h-32" : "h-16"
        }`}
      >
        <div className="flex items-center justify-between h-16 px-4">
          <div className="flex items-center space-x-3">
            <button
              onClick={togglePlay}
              className="bg-white/20 hover:bg-white/30 rounded-full p-2 transition-colors"
            >
              {isPlaying ? (
                <FiPause className="w-5 h-5" />
              ) : (
                <FiPlay className="w-5 h-5 ml-1" />
              )}
            </button>

            <div className="hidden sm:block">
              <div className="font-semibold text-sm">Our Birthday Song</div>
              <div className="text-xs text-pink-100">
                {formatTime(currentTime)} / {formatTime(duration)}
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={toggleMute}
              className="bg-white/20 hover:bg-white/30 rounded-full p-2 transition-colors"
            >
              {isMuted ? (
                <FiVolumeX className="w-4 h-4" />
              ) : (
                <FiVolume2 className="w-4 h-4" />
              )}
            </button>

            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="bg-white/20 hover:bg-white/30 rounded-full p-2 transition-colors"
            >
              {isExpanded ? (
                <FiChevronDown className="w-4 h-4" />
              ) : (
                <FiChevronUp className="w-4 h-4" />
              )}
            </button>
          </div>
        </div>

        <div className="px-4 pb-1">
          <input
            type="range"
            min="0"
            max="100"
            value={progress}
            onChange={handleProgressChange}
            className="w-full h-1 bg-white/30 rounded-lg appearance-none cursor-pointer slider-thumb"
          />
        </div>

        {isExpanded && (
          <div className="px-4 pb-4 space-y-3">
            <div className="flex items-center justify-center space-x-4">
              <div className="text-center">
                <div className="font-bold text-lg">💕 Our Birthday Song 💕</div>
              </div>
            </div>

            <div className="flex items-center justify-center space-x-3">
              <FiVolume2 className="w-4 h-4" />
              <input
                type="range"
                min="0"
                max="100"
                value={volume * 100}
                onChange={handleVolumeChange}
                className="w-24 h-1 bg-white/30 rounded-lg appearance-none cursor-pointer slider-thumb"
              />
            </div>

            <div className="flex justify-center">
              <button
                onClick={hidePlayer}
                className="text-xs bg-white/20 hover:bg-white/30 px-3 py-1 rounded-full transition-colors"
              >
                Hide Player
              </button>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        .slider-thumb::-webkit-slider-thumb {
          appearance: none;
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: white;
          cursor: pointer;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
        }

        .slider-thumb::-moz-range-thumb {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: white;
          cursor: pointer;
          border: none;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
        }
      `}</style>
    </div>
  );
};

export default MusicPlayer;
