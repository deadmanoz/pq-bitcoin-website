import { remark } from "remark";
import html from "remark-html";

// Custom function to handle superscript syntax ^text^
function processSuperscript(htmlString: string): string {
  // Replace ^text^ with <sup>text</sup>
  return htmlString.replace(/\^([^\^]+)\^/g, '<sup>$1</sup>');
}

export default async function markdownToHtml(markdown: string) {
  const result = await remark().use(html).process(markdown);
  const htmlString = result.toString();
  
  // Post-process to add superscript support
  return processSuperscript(htmlString);
}
