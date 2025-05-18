import { FaXTwitter } from "react-icons/fa6";
import { FaGithub, FaDiscord, FaTiktok } from "react-icons/fa";

export default function Footer() {
  return (
    <footer
      className="bg-background border-t border-gray-700 text-gray-400 mt-16"
      role="contentinfo"
      aria-label="Footer"
    >
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <section>
            <h3 className="text-sm font-semibold text-black dark:text-white uppercase tracking-wider mb-4">
              Status
            </h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="/queue"
                  className="transition-colors hover:text-black dark:hover:text-white"
                >
                  Queue Status
                </a>
              </li>
              <li>
                <a
                  href="/status"
                  className="transition-colors hover:text-black dark:hover:text-white"
                >
                  Services status
                </a>
              </li>
            </ul>
          </section>

          <section>
            <h3 className="text-sm font-semibold text-black dark:text-white uppercase tracking-wider mb-4">
              Pages
            </h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="/hot-searches"
                  className="transition-colors hover:text-black dark:hover:text-white"
                >
                  Hot searches
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="transition-colors hover:text-black dark:hover:text-white"
                  aria-disabled="true"
                  tabIndex={-1}
                  onClick={e => e.preventDefault()}
                >
                  lorem
                </a>
              </li>
            </ul>
          </section>

          <section>
            <h3 className="text-sm font-semibold text-black dark:text-white uppercase tracking-wider mb-4">
              ipsum
            </h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="transition-colors hover:text-black dark:hover:text-white"
                  aria-disabled="true"
                  tabIndex={-1}
                  onClick={e => e.preventDefault()}
                >
                  lorem
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="transition-colors hover:text-black dark:hover:text-white"
                  aria-disabled="true"
                  tabIndex={-1}
                  onClick={e => e.preventDefault()}
                >
                  lorem
                </a>
              </li>
            </ul>
          </section>

          <section>
            <h3 className="text-sm font-semibold text-black dark:text-white uppercase tracking-wider mb-4">
              Follow Us
            </h3>
            <nav aria-label="Social media links">
              <ul className="flex space-x-4">
                <li>
                  <a
                    href="https://www.tiktok.com/@statikkshiv.com?lang=pl-PL"
                    aria-label="TikTok"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="transition-colors hover:text-black dark:hover:text-white"
                  >
                    <FaTiktok />
                  </a>
                </li>
                <li>
                  <a
                    href="https://github.com/dulakgg/Statikk-shiv"
                    aria-label="GitHub"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="transition-colors hover:text-black dark:hover:text-white"
                  >
                    <FaGithub />
                  </a>
                </li>
                <li>
                  <a
                    href="https://discord.gg/Mk7qadXD4d"
                    aria-label="Discord"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="transition-colors hover:text-black dark:hover:text-white"
                  >
                    <FaDiscord />
                  </a>
                </li>
                <li>
                  <a
                    href="https://x.com/StatikkShivs"
                    aria-label="X"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="transition-colors hover:text-black dark:hover:text-white"
                  >
                    <FaXTwitter />
                  </a>
                </li>
              </ul>
            </nav>
          </section>
        </div>

        {/* Bottom legal bar */}
        <div className="mt-12 pt-8 border-t border-gray-700 flex flex-col md:flex-row items-center justify-between">
          <p className="text-sm" aria-label="Copyright notice">
            &copy; {new Date().getFullYear()} StatikkShiv. All rights reserved.
          </p>
          <nav aria-label="Legal and support links">
            <ul className="mt-4 md:mt-0 flex space-x-6">
              <li>
                <a
                  href="/privacy"
                  className="text-sm transition-colors hover:text-black dark:hover:text-white"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href="/terms"
                  className="text-sm transition-colors hover:text-black dark:hover:text-white"
                >
                  Terms of Service
                </a>
              </li>
              <li>
                <a
                  href="mailto:support@StatikkShiv.com"
                  className="text-sm transition-colors hover:text-black dark:hover:text-white"
                >
                  support@StatikkShiv.com
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </footer>
  );
}
