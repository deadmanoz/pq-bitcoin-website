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

  useEffect(() => {
    // Trigger MathJax typesetting when content changes
    if (
      typeof window !== "undefined" &&
      (
        window as {
          MathJax?: {
            startup?: {
              document?: { clear: () => void; updateDocument: () => void };
            };
          };
        }
      ).MathJax
    ) {
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
    }
  }, [content]);

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
      <Script
        id="MathJax-config"
        strategy="beforeInteractive"
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
      <style jsx global>{`
        .${markdownStyles.markdown} img {
          cursor: pointer;
        }
        .figure-container {
          margin: 2rem 0;
          text-align: center;
        }
        .figure-container img {
          margin: 0 auto 0.5rem auto;
        }
        .figure-container figcaption {
          font-size: 0.875rem;
          margin-top: 0.75rem;
          padding: 0 1rem;
          text-align: center;
          color: #00d9ff !important;
        }
        .figure-container figcaption strong {
          font-weight: bold;
          color: #ff006e !important;
        }
        .figure-ref {
          font-weight: 500;
          color: #00d9ff !important;
        }
        .figure-ref:hover {
          color: #ff006e !important;
        }

        /* Beautiful annotation styling */
        .annotation {
          position: relative !important;
          cursor: help !important;
          color: #00d9ff !important;
          font-weight: 500 !important;
          background: linear-gradient(
            90deg,
            rgba(0, 217, 255, 0.15) 0%,
            rgba(255, 0, 110, 0.15) 100%
          ) !important;
          border-bottom: 2px dotted #00d9ff !important;
          padding: 2px 4px !important;
          border-radius: 3px !important;
          transition: all 0.2s ease-in-out !important;
          text-decoration: none !important;
        }

        .annotation:hover {
          color: #ff006e !important;
          background: linear-gradient(
            90deg,
            rgba(255, 0, 110, 0.2) 0%,
            rgba(0, 217, 255, 0.2) 100%
          ) !important;
          border-bottom-color: #ff006e !important;
          transform: translateY(-1px) !important;
        }

        .annotation::after {
          content: attr(data-tooltip) !important;
          position: absolute !important;
          bottom: 100% !important;
          left: 50% !important;
          transform: translateX(-50%) translateY(-5px) !important;
          background: #001122 !important;
          color: #00d9ff !important;
          border: 2px solid #00d9ff !important;
          padding: 12px 16px !important;
          border-radius: 8px !important;
          font-size: 0.875rem !important;
          line-height: 1.4 !important;
          white-space: normal !important;
          width: max-content !important;
          max-width: 320px !important;
          text-align: left !important;
          font-weight: normal !important;
          text-decoration: none !important;
          box-shadow:
            0 8px 25px rgba(0, 217, 255, 0.4),
            0 0 0 1px rgba(0, 217, 255, 0.1) !important;
          z-index: 999999 !important;
          opacity: 0 !important;
          visibility: hidden !important;
          transition:
            opacity 0.3s ease-in-out,
            visibility 0.3s ease-in-out,
            transform 0.3s ease-in-out !important;
          pointer-events: none !important;
          margin-bottom: 12px !important;
        }

        .annotation::before {
          content: "" !important;
          position: absolute !important;
          bottom: 100% !important;
          left: 50% !important;
          transform: translateX(-50%) !important;
          margin-bottom: 6px !important;
          border: 6px solid transparent !important;
          border-top-color: #00d9ff !important;
          opacity: 0 !important;
          visibility: hidden !important;
          transition:
            opacity 0.3s ease-in-out,
            visibility 0.3s ease-in-out !important;
          z-index: 999999 !important;
        }

        .annotation:hover::after,
        .annotation:focus::after {
          opacity: 1 !important;
          visibility: visible !important;
          transform: translateX(-50%) translateY(0) !important;
        }

        .annotation:hover::before,
        .annotation:focus::before {
          opacity: 1 !important;
          visibility: visible !important;
        }

        /* Mobile touch support */
        @media (max-width: 768px) {
          .annotation::after {
            position: fixed !important;
            bottom: auto !important;
            top: 50% !important;
            left: 50% !important;
            transform: translate(-50%, -50%) !important;
            max-width: 280px !important;
            margin-bottom: 0 !important;
            font-size: 0.8125rem !important;
          }

          .annotation::before {
            display: none !important;
          }
        }
      `}</style>
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
