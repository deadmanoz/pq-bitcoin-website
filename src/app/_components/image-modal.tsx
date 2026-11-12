"use client";

import { useEffect, useRef, MouseEvent } from "react";
import Image from "next/image";

interface ImageModalProps {
  isOpen: boolean;
  imageSrc: string;
  imageAlt: string;
  onClose: () => void;
}

export function ImageModal({
  isOpen,
  imageSrc,
  imageAlt,
  onClose,
}: ImageModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen) {
      if (!dialog.open) {
        dialog.showModal();
      }
      document.body.style.overflow = "hidden";
    } else if (dialog.open) {
      dialog.close();
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const handleBackdropClick = (event: MouseEvent<HTMLDialogElement>) => {
    if (event.target === dialogRef.current) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <dialog
      ref={dialogRef}
      onClose={onClose}
      onClick={handleBackdropClick}
      aria-label={imageAlt || "Enlarged image preview"}
      className="bg-transparent p-0 m-0 max-w-none max-h-none w-screen h-screen backdrop:bg-black/80 backdrop:backdrop-blur-sm open:flex items-center justify-center"
      {...({ closedby: "any" } as Record<string, string>)}
    >
      <div className="relative max-w-6xl max-h-[90vh] w-full h-full flex items-center justify-center p-4">
        {/* Close button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-cyber-dark-alt border-2 border-cyber-pink hover:border-cyber-cyan transition-all duration-300 flex items-center justify-center text-cyber-pink hover:text-cyber-cyan text-xl font-bold hover:shadow-[0_0_20px_rgba(255,0,110,0.5)]"
          aria-label="Close modal"
        >
          ×
        </button>

        {/* Image container */}
        <div className="relative w-full h-full flex items-center justify-center p-4">
          <Image
            src={imageSrc}
            alt={imageAlt}
            width={1200}
            height={800}
            className="rounded-lg border-2 border-cyber-cyan/30 shadow-[0_0_30px_rgba(0,217,255,0.3)]"
            style={{
              width: "auto",
              height: "auto",
              maxWidth: "95vw",
              maxHeight: "85vh",
              minWidth: "80vw",
              objectFit: "contain",
            }}
            unoptimized
          />
        </div>

        {/* Image caption */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-cyber-dark-alt/90 border border-cyber-cyan/30 rounded-lg px-4 py-2 backdrop-blur-sm">
          <p className="text-cyber-cyan text-sm text-center max-w-md">
            {imageAlt}
          </p>
        </div>
      </div>
    </dialog>
  );
}
