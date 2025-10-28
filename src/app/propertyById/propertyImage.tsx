"use client";

import { Dialog } from "@headlessui/react";
import { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

interface ImageGalleryProps {
  images: string[];
}

const ImageGallery: React.FC<ImageGalleryProps> = ({ images }) => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const selectedImage = selectedIndex !== null ? images[selectedIndex] : null;

  const closeModal = () => setSelectedIndex(null);

  const showNext = useCallback(() => {
    if (selectedIndex === null) return;
    setSelectedIndex((prev) => (prev! + 1) % images.length);
  }, [selectedIndex, images]);

  const showPrev = useCallback(() => {
    if (selectedIndex === null) return;
    setSelectedIndex((prev) => (prev! - 1 + images.length) % images.length);
  }, [selectedIndex, images]);

  // Keyboard nav
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!selectedImage) return;
      if (e.key === "ArrowRight") showNext();
      if (e.key === "ArrowLeft") showPrev();
      if (e.key === "Escape") closeModal();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedImage, showNext, showPrev]);

  return (
    <div className="space-y-4" data-aos="fade-up">
      {/* Desktop Grid */}
      <div
        className="hidden sm:grid grid-cols-2 md:grid-cols-3 gap-4 rounded-2xl overflow-hidden"
        data-aos="zoom-in-up"
      >
        {images.map((img, idx) => (
          <div
            key={idx}
            onClick={() => setSelectedIndex(idx)}
            className="relative cursor-pointer group"
            data-aos="fade-up"
            data-aos-delay={`${idx * 100}`}
          >
            <Image
              src={img}
              alt={`Property image ${idx + 1}`}
              width={500}
              height={400}
              className="object-cover w-full h-60 rounded-xl group-hover:brightness-90 transition"
            />
          </div>
        ))}
      </div>

      {/* Mobile Single Image */}
      <div className="sm:hidden" data-aos="fade-in">
        <div
          className="relative cursor-pointer"
          onClick={() => setSelectedIndex(0)}
        >
          <Image
            src={images[0]}
            alt="Main property image"
            width={600}
            height={400}
            className="w-full h-64 object-cover rounded-xl"
          />
        </div>
      </div>

      {/* Fullscreen Modal */}
      <Dialog
        open={selectedImage !== null}
        onClose={closeModal}
        className="fixed inset-0 z-[9999]"
      >
        <div className="fixed inset-0 bg-black/90 flex items-center justify-center px-4">
          <Dialog.Panel
            className="relative w-full max-w-6xl flex justify-center items-center"
            data-aos="zoom-in"
          >
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-white bg-black/50 p-2 rounded-full z-50"
            >
              <X className="w-5 h-5" />
            </button>

            <button
              onClick={showPrev}
              className="absolute left-4 md:left-10 text-white bg-black/50 hover:bg-black p-2 rounded-full z-50"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {selectedImage && (
              <Image
                src={selectedImage}
                alt="Fullscreen property"
                width={1600}
                height={900}
                className="max-w-full max-h-[80vh] object-contain rounded-xl"
              />
            )}

            <button
              onClick={showNext}
              className="absolute right-4 md:right-10 text-white bg-black/50 hover:bg-black p-2 rounded-full z-50"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </Dialog.Panel>
        </div>
      </Dialog>
    </div>
  );
};

export default ImageGallery;
