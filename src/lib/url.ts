export function getAbsoluteUrl(path: string): string {
  // Remove leading slash if present to avoid double slashes
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  
  // In production, use NEXT_PUBLIC_SITE_URL
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    const cleanBaseUrl = process.env.NEXT_PUBLIC_SITE_URL.endsWith('/') 
      ? process.env.NEXT_PUBLIC_SITE_URL.slice(0, -1) 
      : process.env.NEXT_PUBLIC_SITE_URL;
    return `${cleanBaseUrl}/${cleanPath}`;
  }
  
  // In development, try to detect the actual URL from the request
  // Since this runs at build time for static export, we'll use a sensible default
  // For Next.js static export, this only matters during build, not runtime
  if (process.env.NODE_ENV === 'development') {
    // Use NEXT_PUBLIC_DEV_URL if set, otherwise use default
    const devUrl = process.env.NEXT_PUBLIC_DEV_URL || 'http://localhost:3000';
    const cleanDevUrl = devUrl.endsWith('/') ? devUrl.slice(0, -1) : devUrl;
    return `${cleanDevUrl}/${cleanPath}`;
  }
  
  // Fallback - this should rarely happen
  // In static export, we should always have NEXT_PUBLIC_SITE_URL in production
  console.warn('No NEXT_PUBLIC_SITE_URL found, using relative path');
  return path;
}