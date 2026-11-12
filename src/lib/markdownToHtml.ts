import { remark } from "remark";
import html from "remark-html";

// Custom function to handle superscript syntax ^text^
function processSuperscript(htmlString: string): string {
  // Replace ^text^ with <sup>text</sup>
  return htmlString.replace(/\^([^\^]+)\^/g, "<sup>$1</sup>");
}

// Color mapping for chart consistency
const colorMap: Record<string, string> = {
  magenta: "#FF00FF",
  pink: "#FF006E",
  cyan: "#00D9FF",
  purple: "#8B5CF6",
  orange: "#FFA500",
  lightblue: "#42D4F4",
  green: "#10B981",
  yellow: "#EAB308",
  red: "#E6194B",
  blue: "#3B82F6",
  teal: "#14B8A6",
  lime: "#84CC16",
  indigo: "#6366F1",
};

// Process colored text with syntax {{color:text}}
function processColoredText(htmlString: string): string {
  return htmlString.replace(
    /\{\{([^:]+):([^}]+)\}\}/g,
    (match, colorName, text) => {
      const color = colorMap[colorName.toLowerCase()];
      if (color) {
        return `<span style="color: ${color}; font-weight: bold;">${text}</span>`;
      }
      return match; // Return original if color not found
    }
  );
}

// Preserve math delimiters for client-side MathJax processing
function preserveMathDelimiters(htmlString: string): string {
  // Process display math \[...\]
  let processed = htmlString.replace(/\\\[([^\]]+?)\\\]/g, (_match, math) => {
    // Double escape the backslashes to survive markdown processing
    return `<div class="math-display">\\\\[${math}\\\\]</div>`;
  });

  // Process inline math \(...\)
  processed = processed.replace(/\\\(([^)]+?)\\\)/g, (_match, math) => {
    // Double escape the backslashes to survive markdown processing
    return `<span class="math-inline">\\\\(${math}\\\\)</span>`;
  });

  return processed;
}

// Post-process annotations after remark HTML conversion
function postProcessAnnotations(htmlString: string): string {
  let counter = 0;

  // Look for [[text||tooltip]] pattern in the HTML
  return htmlString.replace(
    /\[\[([^\|\]]+)\|\|([^\]]+)\]\]/g,
    (_match, text, tooltip) => {
      counter++;
      const normalizedTooltip = tooltip
        .replace(/\s+/g, " ")
        .trim()
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#39;");
      const id = `annotation-${counter}`;
      return `<span class="annotation" data-tooltip="${normalizedTooltip}" id="${id}" tabindex="0" aria-label="${text} (${normalizedTooltip})">${text}</span>`;
    }
  );
}

// Process figures with captions and automatic numbering
function processFigures(markdown: string, htmlString: string): string {
  let figureCounter = 0;
  const figureRefs = new Map<string, number>();

  // First pass: Find all figure definitions in markdown and create mapping
  const figurePattern = /!\[([^\]]*)\]\([^)]+\)\s*\{#fig:([^}]+)\}/g;
  let match;
  while ((match = figurePattern.exec(markdown)) !== null) {
    const id = match[2];
    if (!figureRefs.has(id)) {
      figureRefs.set(id, ++figureCounter);
    }
  }

  // Process images with figure syntax
  htmlString = htmlString.replace(
    /<p><img src="([^"]+)" alt="([^"]+)">\s*\{#fig:([^}]+)\}<\/p>/g,
    (_match, src, alt, id) => {
      const figNum = figureRefs.get(id) || ++figureCounter;
      // Check if alt text starts with "Figure:" to use as caption
      const caption = alt.startsWith("Figure:")
        ? alt.substring(7).trim()
        : alt;
      return `<figure class="figure-container" id="fig-${id}">
        <img src="${src}" alt="${alt}" />
        <figcaption><strong>Figure ${figNum}:</strong> ${caption}</figcaption>
      </figure>`;
    }
  );

  // Replace figure references
  htmlString = htmlString.replace(/\{@fig:([^}]+)\}/g, (match, id) => {
    const figNum = figureRefs.get(id);
    if (figNum) {
      return `<a href="#fig-${id}" class="figure-ref">Figure ${figNum}</a>`;
    }
    return match;
  });

  return htmlString;
}

export default async function markdownToHtml(markdown: string) {
  const processedMarkdown = preserveMathDelimiters(markdown);

  const result = await remark().use(html).process(processedMarkdown);
  let htmlString = result.toString();

  // Post-process transformations
  htmlString = processSuperscript(htmlString);
  htmlString = processColoredText(htmlString);
  htmlString = processFigures(markdown, htmlString);
  htmlString = postProcessAnnotations(htmlString);

  return htmlString;
}
