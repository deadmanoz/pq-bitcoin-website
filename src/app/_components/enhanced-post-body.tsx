"use client";

import { useState, useEffect, MouseEvent } from "react";
import { useSearchParams } from "next/navigation";
import markdownStyles from "./markdown-styles.module.css";
import { ImageModal } from "./image-modal";
import Script from "next/script";

type Props = {
  content: string;
};

export function EnhancedPostBody({ content }: Props) {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalImage, setModalImage] = useState({ src: "", alt: "" });
  const searchParams = useSearchParams();
  const isWideContent = searchParams.get("wide-content") !== "false";
  const hasMath =
    content.includes('class="math-inline"') ||
    content.includes('class="math-display"');

  useEffect(() => {
    if (!hasMath || typeof window === "undefined") return;

    const checkMathJax = setInterval(() => {
      const mathJax = (
        window as {
          MathJax?: {
            startup?: {
              document?: { clear: () => void; updateDocument: () => void };
            };
          };
        }
      ).MathJax;
      if (mathJax?.startup?.document) {
        mathJax.startup.document.clear();
        mathJax.startup.document.updateDocument();
        clearInterval(checkMathJax);
      }
    }, 100);

    return () => clearInterval(checkMathJax);
  }, [content, hasMath]);

  const handleContainerClick = (event: MouseEvent<HTMLDivElement>) => {
    const target = event.target as HTMLElement;
    if (target instanceof HTMLImageElement && target.src) {
      event.preventDefault();
      setModalImage({
        src: target.src,
        alt: target.alt || "Image",
      });
      setModalOpen(true);
    }
  };

  return (
    <>
      {hasMath && (
        <>
          <Script
            id="MathJax-config"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                window.MathJax = {
                  tex: {
                    inlineMath: [['\\\\(', '\\\\)']],
                    displayMath: [['\\\\[', '\\\\]']],
                  },
                  svg: {
                    fontCache: 'global'
                  }
                };
              `,
            }}
          />
          <Script
            id="MathJax-script"
            src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js"
            strategy="afterInteractive"
          />
        </>
      )}
      <div className={isWideContent ? "max-w-6xl mx-auto" : "max-w-2xl mx-auto"}>
        <div
          className={markdownStyles["markdown"]}
          onClick={handleContainerClick}
          dangerouslySetInnerHTML={{ __html: content }}
        />

        <ImageModal
          isOpen={modalOpen}
          imageSrc={modalImage.src}
          imageAlt={modalImage.alt}
          onClose={() => setModalOpen(false)}
        />
      </div>
    </>
  );
}
