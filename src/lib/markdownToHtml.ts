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
  'red': '#E6194B',
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
  console.log('[DEBUG] Preserving math delimiters...');
  console.log('[DEBUG] Input string sample:', htmlString.substring(0, 200));

  // Process display math \[...\]
  let processed = htmlString.replace(/\\\[([^\]]+?)\\\]/g, (match, math) => {
    console.log(`[DEBUG] Found display math: ${math}`);
    // Double escape the backslashes to survive markdown processing
    return `<div class="math-display">\\\\[${math}\\\\]</div>`;
  });

  // Process inline math \(...\)
  processed = processed.replace(/\\\(([^)]+?)\\\)/g, (match, math) => {
    console.log(`[DEBUG] Found inline math: ${math}`);
    console.log(`[DEBUG] Original match: ${match}`);
    // Double escape the backslashes to survive markdown processing
    return `<span class="math-inline">\\\\(${math}\\\\)</span>`;
  });

  return processed;
}

// Don't process annotations before remark - let them pass through
function processAnnotations(markdownString: string): string {
  // Do nothing - we'll process after HTML conversion
  return markdownString;
}

// Post-process annotations after remark HTML conversion
function postProcessAnnotations(htmlString: string): string {
  console.log('[DEBUG] Post-processing annotations...');
  let counter = 0;
  
  // Look for [[text||tooltip]] pattern in the HTML
  // Remark will have escaped the brackets
  const processed = htmlString.replace(/\[\[([^\|\]]+)\|\|([^\]]+)\]\]/g, (match, text, tooltip) => {
    counter++;
    const escapedTooltip = tooltip.replace(/"/g, '&quot;').replace(/'/g, '&#39;');
    const id = `annotation-${counter}`;
    console.log(`[DEBUG] Found annotation ${counter}: text="${text}", tooltip="${tooltip}"`);
    return `<span class="annotation" data-tooltip="${escapedTooltip}" id="${id}" tabindex="0" role="button" aria-describedby="tooltip-${id}">${text}</span>`;
  });
  
  console.log(`[DEBUG] Post-processed ${counter} annotations`);
  return processed;
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
  console.log('[DEBUG] markdownToHtml called');
  
  // Check for math content
  const mathInlineCount = (markdown.match(/\\\([^)]+\\\)/g) || []).length;
  const mathDisplayCount = (markdown.match(/\\\[[^\]]+\\\]/g) || []).length;
  console.log(`[DEBUG] Found ${mathInlineCount} inline math and ${mathDisplayCount} display math expressions`);
  
  // Pre-process to preserve math delimiters AND annotations
  let processedMarkdown = preserveMathDelimiters(markdown);
  
  // Process annotations BEFORE remark to avoid conflicts
  processedMarkdown = processAnnotations(processedMarkdown);
  
  const result = await remark().use(html).process(processedMarkdown);
  let htmlString = result.toString();
  
  // Debug: Look for any remnants of our annotation syntax
  const searchPatterns = [
    { pattern: /\[\[/g, name: 'Double opening brackets' },
    { pattern: /\]\]/g, name: 'Double closing brackets' },
    { pattern: /\|\|/g, name: 'Double pipes' },
    { pattern: /long-range quantum/g, name: 'Sample annotation text' }
  ];
  
  searchPatterns.forEach(({ pattern, name }) => {
    const matches = htmlString.match(pattern);
    if (matches) {
      console.log(`[DEBUG] Found ${matches.length} instances of "${name}"`);
      // Show context around first match
      const index = htmlString.search(pattern);
      if (index >= 0) {
        const context = htmlString.substring(Math.max(0, index - 50), Math.min(htmlString.length, index + 100));
        console.log(`[DEBUG] Context: ...${context}...`);
      }
    }
  });
  
  // Log if we have any annotation spans in the final HTML
  const annotationCount = (htmlString.match(/class="annotation"/g) || []).length;
  console.log(`[DEBUG] Final HTML contains ${annotationCount} annotation spans`);

  // Post-process transformations
  htmlString = processSuperscript(htmlString);
  htmlString = processColoredText(htmlString);
  htmlString = processFigures(markdown, htmlString);
  htmlString = postProcessAnnotations(htmlString);
  
  // Final check for annotations and math
  const finalAnnotationCount = (htmlString.match(/class="annotation"/g) || []).length;
  const finalMathInlineCount = (htmlString.match(/class="math-inline"/g) || []).length;
  const finalMathDisplayCount = (htmlString.match(/class="math-display"/g) || []).length;
  console.log(`[DEBUG] FINAL HTML contains ${finalAnnotationCount} annotation spans after all processing`);
  console.log(`[DEBUG] FINAL HTML contains ${finalMathInlineCount} inline math and ${finalMathDisplayCount} display math`);

  return htmlString;
}
