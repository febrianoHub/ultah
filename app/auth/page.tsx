/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import GradientButton from "@/components/GradientButton";
import TextInputGroup from "@/components/TextInputGroup";
import { CiHeart } from "react-icons/ci";

export default function LoginPage() {
  const [inputValues, setInputValues] = useState<string[]>(Array(6).fill(""));
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleInputChange = (values: string[]) => {
    setInputValues(values);
    if (error) setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const enteredKey = inputValues.join("");

      if (enteredKey.length !== 6) {
        setError("Mohon isi semua angka");
        setIsLoading(false);
        return;
      }

      const response = await fetch("/api/validate-key", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ key: enteredKey }),
      });

      const data = await response.json();

      if (data.success) {
        router.push("/home");
      } else {
        setError("Tanggal Lahir salah! Coba lagi 💔");
        setInputValues(Array(6).fill(""));
      }
    } catch (error) {
      setError("Terjadi kesalahan. Silakan coba lagi.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-svh flex justify-center items-center bg-gradient-to-br from-pink-50 to-red-50">
      <div className="md:min-w-lg w-11/12 sm:w-auto flex-col bg-white shadow-xl rounded-lg p-8 flex justify-center items-center">
        <span className="text-6xl animate-pulse">❤️</span>
        <h1 className="font-bold text-2xl font-sans text-gray-900 mt-4">
          Birthday Lock
        </h1>
        <p className="text-gray-600 sm:text-sm text-xs mt-3 font-sans font-light text-center max-w-xs">
          Buka kunci dengan tanggal lahir 💕
        </p>

        <form
          onSubmit={handleSubmit}
          className="mt-6 flex flex-col items-center gap-6"
        >
          <TextInputGroup
            length={6}
            values={inputValues}
            onChange={handleInputChange}
            disabled={isLoading}
          />

          {error && (
            <div className="text-red-500 text-sm font-medium text-center animate-shake">
              {error}
            </div>
          )}

          <GradientButton type="submit">
            <CiHeart className="text-xl" />
            {isLoading ? "Checking..." : "Unlock Love"}
          </GradientButton>
        </form>

        <p className="text-xs text-gray-400 mt-4 text-center">Format: DDMMYY</p>
      </div>
    </div>
  );
}
