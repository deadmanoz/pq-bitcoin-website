import { remark } from "remark";
import html from "remark-html";

// Custom function to handle superscript syntax ^text^
function processSuperscript(htmlString: string): string {
  // Replace ^text^ with <sup>text</sup>
  return htmlString.replace(/\^([^\^]+)\^/g, '<sup>$1</sup>');
}

// Color mapping for chart consistency
const colorMap: Record<string, string> = {
  'magenta': '#FF00FF',
  'pink': '#FF006E',
  'cyan': '#00D9FF', 
  'purple': '#8B5CF6',
  'orange': '#FFA500',
  'lightblue': '#42D4F4',
  'green': '#10B981',
  'yellow': '#EAB308',
  'red': '#EF4444',
  'blue': '#3B82F6',
  'teal': '#14B8A6',
  'lime': '#84CC16',
  'indigo': '#6366F1'
};

// Process colored text with syntax {{color:text}}
function processColoredText(htmlString: string): string {
  return htmlString.replace(/\{\{([^:]+):([^}]+)\}\}/g, (match, colorName, text) => {
    const color = colorMap[colorName.toLowerCase()];
    if (color) {
      return `<span style="color: ${color}; font-weight: bold;">${text}</span>`;
    }
    return match; // Return original if color not found
  });
}

// Preserve math delimiters for client-side MathJax processing
function preserveMathDelimiters(htmlString: string): string {
  // Escape HTML entities within math delimiters to prevent remark from processing them
  return htmlString
    .replace(/\$\$([^$]+)\$\$/g, (match, math) => {
      return `<div class="math-display">$$${math}$$</div>`;
    })
    .replace(/\$([^$]+)\$/g, (match, math) => {
      return `<span class="math-inline">$${math}$</span>`;
    });
}

// Process hover annotations with syntax [[text||tooltip]]
function processAnnotations(markdownString: string): string {
  let counter = 0;
  return markdownString.replace(/\[\[([^\|\]]+)\|\|([^\]]+)\]\]/g, (match, text, tooltip) => {
    counter++;
    const id = `annotation-${counter}`;
    const escapedTooltip = tooltip.replace(/"/g, '&quot;').replace(/'/g, '&#39;');
    return `<span class="annotation" data-tooltip="${escapedTooltip}" id="${id}" tabindex="0" role="button" aria-describedby="tooltip-${id}">${text}</span>`;
  });
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
      const caption = alt.startsWith('Figure:') ? alt.substring(7).trim() : alt;
      return `<figure class="figure-container" id="fig-${id}">
        <img src="${src}" alt="${alt}" />
        <figcaption><strong>Figure ${figNum}:</strong> ${caption}</figcaption>
      </figure>`;
    }
  );

  // (Removed: Process ALL images as figures)

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
  // Pre-process to preserve math delimiters AND annotations
  let processedMarkdown = preserveMathDelimiters(markdown);
  
  // Process annotations BEFORE remark to avoid conflicts
  processedMarkdown = processAnnotations(processedMarkdown);
  
  const result = await remark().use(html).process(processedMarkdown);
  let htmlString = result.toString();

  // Post-process transformations
  htmlString = processSuperscript(htmlString);
  htmlString = processColoredText(htmlString);
  htmlString = processFigures(markdown, htmlString);

  return htmlString;
}
