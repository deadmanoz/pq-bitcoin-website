"use client";

import { useState, useEffect } from "react";
import markdownStyles from "./markdown-styles.module.css";
import { ImageModal } from "./image-modal";

type Props = {
  content: string;
};

export function EnhancedPostBody({ content }: Props) {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalImage, setModalImage] = useState({ src: "", alt: "" });

  useEffect(() => {
    const handleImageClick = (event: Event) => {
      const target = event.target as HTMLImageElement;
      if (target.tagName === "IMG" && target.src) {
        event.preventDefault();
        setModalImage({
          src: target.src,
          alt: target.alt || "Image"
        });
        setModalOpen(true);
      }
    };

    // Use a timeout to ensure DOM is ready
    const timeoutId = setTimeout(() => {
      const markdownContainer = document.querySelector(`.${markdownStyles.markdown}`);
      if (markdownContainer) {
        const images = markdownContainer.querySelectorAll("img");
        images.forEach(img => {
          img.style.cursor = "pointer";
          // Remove existing listeners to avoid duplicates
          img.removeEventListener("click", handleImageClick);
          img.addEventListener("click", handleImageClick);
        });
      }
    }, 100);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [content, modalOpen]); // Re-run when modalOpen changes

  return (
    <div className="max-w-2xl mx-auto">
      <div
        className={markdownStyles["markdown"]}
        dangerouslySetInnerHTML={{ __html: content }}
      />
      
      <ImageModal
        isOpen={modalOpen}
        imageSrc={modalImage.src}
        imageAlt={modalImage.alt}
        onClose={() => setModalOpen(false)}
      />
    </div>
  );
}