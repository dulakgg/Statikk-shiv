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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 items-start">
          {/* Brand/Logo & Description */}
          <section className="flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <span className="inline-block w-10 h-10 rounded-full bg-gradient-to-br from-[#64ddcd] to-[#3c8277] flex items-center justify-center text-2xl font-bold text-white shadow-lg">
                SS
              </span>
              <span className="text-2xl font-extrabold text-white tracking-wide">
                StatikkShiv
              </span>
            </div>
            <p className="text-sm text-gray-400 max-w-xs mt-2">
              The ultimate League of Legends stats & search platform.
            </p>
          </section>

          {/* Pages */}
          <section>
            <h3 className="text-sm font-semibold text-black dark:text-white uppercase tracking-wider mb-4">
              Pages
            </h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="/hot-searches"
                  className="transition-colors hover:text-[#64ddcd] dark:hover:text-[#64ddcd] font-medium"
                >
                  Hot Searches
                </a>
              </li>
              <li>
                <a
                  href="/match-search"
                  className="transition-colors hover:text-[#64ddcd] dark:hover:text-[#64ddcd] font-medium"
                >
                  Match Searcher
                </a>
              </li>
            </ul>
          </section>

          {/* Socials */}
          <section>
            <h3 className="text-sm font-semibold text-black dark:text-white uppercase tracking-wider mb-4">
              Follow Us
            </h3>
            <nav aria-label="Social media links">
              <ul className="flex space-x-5">
                <li>
                  <a
                    href="https://www.tiktok.com/@statikkshiv.com?lang=pl-PL"
                    aria-label="TikTok"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="transition-transform hover:scale-125 hover:text-[#64ddcd] duration-200 text-xl"
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
                    className="transition-transform hover:scale-125 hover:text-[#64ddcd] duration-200 text-xl"
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
                    className="transition-transform hover:scale-125 hover:text-[#64ddcd] duration-200 text-xl"
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
                    className="transition-transform hover:scale-125 hover:text-[#64ddcd] duration-200 text-xl"
                  >
                    <FaXTwitter />
                  </a>
                </li>
              </ul>
            </nav>
          </section>
        </div>

        {/* Bottom legal bar */}
        <div className="mt-12 pt-8 border-t border-gray-700 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm" aria-label="Copyright notice">
            &copy; {new Date().getFullYear()} StatikkShiv. All rights reserved.
          </p>
          <nav aria-label="Legal and support links">
            <ul className="flex flex-wrap gap-6 text-sm">
              <li>
                <a
                  href="/privacy"
                  className="transition-colors hover:text-[#64ddcd] dark:hover:text-[#64ddcd]"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href="/terms"
                  className="transition-colors hover:text-[#64ddcd] dark:hover:text-[#64ddcd]"
                >
                  Terms of Service
                </a>
              </li>
              <li>
                <a
                  href="mailto:support@StatikkShiv.com"
                  className="transition-colors hover:text-[#64ddcd] dark:hover:text-[#64ddcd]"
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
