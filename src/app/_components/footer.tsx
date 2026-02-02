import Container from "@/app/_components/container";

export function Footer() {
  return (
    <footer className="bg-cyber-dark-alt border-t-2 border-cyber-cyan/30">
      <Container>
        <div className="py-16 text-center">
          {/* Authors' Social Links */}
          <div className="mb-4">
            <h3 className="text-md font-semibold text-cyber-cyan mb-3">Follow the Authors</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-xl mx-auto">
              {/* Anthony Milton */}
              <div>
                <h4 className="text-cyber-pink font-medium mb-2 text-sm">Anthony Milton</h4>
                <div className="flex flex-col space-y-1">
                  <a
                    href="https://x.com/ozdeadman"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center space-x-2 text-cyber-cyan hover:text-cyber-pink transition-colors duration-300 hover:shadow-[0_0_10px_rgba(255,0,110,0.5)] p-1.5 rounded border border-cyber-cyan/30 hover:border-cyber-pink/50"
                    aria-label="Anthony Milton on X"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                    </svg>
                    <span className="text-xs font-medium">@ozdeadman</span>
                  </a>
                  <a
                    href="https://primal.net/deadmanoz"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center space-x-2 text-cyber-cyan hover:text-cyber-pink transition-colors duration-300 hover:shadow-[0_0_10px_rgba(255,0,110,0.5)] p-1.5 rounded border border-cyber-cyan/30 hover:border-cyber-pink/50"
                    aria-label="Anthony Milton on Nostr"
                  >
                    <span className="text-xs font-medium">Nostr:</span>
                    <span className="text-xs font-medium">deadmanoz</span>
                  </a>
                </div>
              </div>

              {/* Clara Shikhelman */}
              <div>
                <h4 className="text-cyber-pink font-medium mb-2 text-sm">Clara Shikhelman</h4>
                <div className="flex flex-col space-y-1">
                  <a
                    href="https://x.com/ClaraShik"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center space-x-2 text-cyber-cyan hover:text-cyber-pink transition-colors duration-300 hover:shadow-[0_0_10px_rgba(255,0,110,0.5)] p-1.5 rounded border border-cyber-cyan/30 hover:border-cyber-pink/50"
                    aria-label="Clara Shikhelman on X"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                    </svg>
                    <span className="text-xs font-medium">@ClaraShik</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* GitHub Link */}
          <div className="flex items-center justify-center space-x-6 mb-4">
            <a
              href="https://github.com/deadmanoz/pq-bitcoin-website"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 text-cyber-cyan hover:text-cyber-pink transition-colors duration-300 hover:shadow-[0_0_10px_rgba(255,0,110,0.5)] p-2 rounded-lg border border-cyber-cyan/30 hover:border-cyber-pink/50"
              aria-label="View source on GitHub"
            >
              <svg
                className="w-6 h-6"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="text-sm font-medium">View on GitHub</span>
            </a>
          </div>
          <p className="text-sm text-cyber-cyan/70">
            © 2026 Anthony Milton & Clara Shikhelman. All rights reserved.
          </p>
        </div>
      </Container>
    </footer>
  );
}

export default Footer;
