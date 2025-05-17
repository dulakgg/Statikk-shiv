import { FaXTwitter } from "react-icons/fa6";
import { FaGithub } from "react-icons/fa";
import { FaDiscord } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-background border-t border-gray-700 text-gray-400 mt-16">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8 ">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
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
          </div>

          <div>
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
                >
                  lorem
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-black dark:text-white uppercase tracking-wider mb-4">
              ipsum
            </h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="transition-colors hover:text-black dark:hover:text-white"
                >
                  lorem
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="transition-colors hover:text-black dark:hover:text-white"
                >
                  lorem
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-black dark:text-white uppercase tracking-wider mb-4">
              Follow Us
            </h3>
            <div className="flex space-x-4">
              <a
                href="#"
                aria-label="Twitter"
                className="transition-colors hover:text-black dark:hover:text-white"
              >
                <FaXTwitter />
              </a>
              <a
                href="https://github.com/dulakgg/Statikk-shiv"
                aria-label="GitHub"
                className="transition-colors hover:text-black dark:hover:text-white"
              >
                <FaGithub />
              </a>
              <a
                href="https://discord.gg/Mk7qadXD4d"
                aria-label="Discord"
                className="transition-colors hover:text-black dark:hover:text-white"
              >
                <FaDiscord />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom legal bar */}
        <div className="mt-12 pt-8 border-t border-gray-700 flex flex-col md:flex-row items-center justify-between">
          <p className="text-sm">&copy; {new Date().getFullYear()} StatikkShiv. All rights reserved.</p>
          <div className="mt-4 md:mt-0 flex space-x-6">
            <a
              href="/privacy-policy"
              target="_blank"
              className="text-sm transition-colors hover:text-black dark:hover:text-white"
            >
              Privacy Policy
            </a>
            <a
              href="/terms-of-service"
              target="_blank"
              className="text-sm transition-colors hover:text-black dark:hover:text-white"
            >
              Terms of Service
            </a>
            <a
              href=""
              className="text-sm transition-colors hover:text-black dark:hover:text-white"
            >
              support@StatikkShiv.com
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
