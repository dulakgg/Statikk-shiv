import React, { useState } from "react";
import { Head } from "@inertiajs/react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { CiLink } from "react-icons/ci";
import { FaClipboard, FaCheckCircle } from "react-icons/fa";

interface Patch {
  title: string;
  url: string;
  banner?: string | null;
  date?: string;
  summary?: string;
}

interface PatchesPageProps {
  patches: Patch[];
}

const PATCHES_PER_PAGE = 6;

const copyToClipboard = async (text: string) => {
  if (navigator.clipboard && window.isSecureContext) {
    return navigator.clipboard.writeText(text);
  } else {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    textArea.style.position = "fixed";
    textArea.style.left = "-999999px";
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    return new Promise<void>((resolve, reject) => {
      document.execCommand('copy') ? resolve() : reject();
      textArea.remove();
    });
  }
};

const Patches: React.FC<PatchesPageProps> = ({ patches }) => {
  const [visibleCount, setVisibleCount] = useState(PATCHES_PER_PAGE);
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null);
  const [showToast, setShowToast] = useState(false);

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + PATCHES_PER_PAGE);
  };

  const handleCopy = async (url: string, idx: number) => {
    await copyToClipboard(url);
    setCopiedIdx(idx);
    setShowToast(true);
    setTimeout(() => {
      setCopiedIdx(null);
      setShowToast(false);
    }, 1500);
  };

  const getPatchVersion = (title: string) => {
    const match = title.match(/(\d+\.\d+(\.\w+)?)/);
    return match ? match[1] : "";
  };

  return (
    <div className="flex flex-col min-h-screen bg-background text-black dark:text-white relative overflow-x-hidden">
      <Head>
        <link rel="canonical" href="https://statikkshiv.com/patch-notes" />
        <meta
          property="og:description"
          content="Explore the official League of Legends patch notes, champion buffs and nerfs, item changes, and meta updates. Stay ahead of the game with Statikk Shiv."
        />
      </Head>
      <Navbar />
      {/* Decorative detail: faint LoL icon or SVG */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-0 opacity-10 flex justify-center items-center"
        style={{ minHeight: 600 }}
      >
        <svg width="400" height="400" viewBox="0 0 400 400" fill="none">
          <circle cx="200" cy="200" r="180" fill="#14b8a6" fillOpacity="0.07" />
          <text x="50%" y="52%" textAnchor="middle" fill="#14b8a6" fontSize="120" fontWeight="bold" opacity="0.13" dy=".3em">
            LoL
          </text>
        </svg>
      </div>
      <main className="flex-grow flex flex-col items-center justify-start px-4 py-10 max-w-7xl mx-auto w-full relative z-10">
        <header className="mb-12 text-center">
          <span className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-teal-600/90 text-white font-semibold uppercase tracking-widest text-xs shadow mb-4">
            <FaCheckCircle className="h-5 w-5 text-white" /> Official Patch Notes
          </span>
          <h1 className="text-5xl font-extrabold mb-4 bg-gradient-to-r from-teal-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent drop-shadow-lg">
            League of Legends Patch Notes
          </h1>
          <h2 className="text-2xl font-semibold text-teal-300 mb-4">
            All Updates Direct from Riot Games
          </h2>
          <p className="text-lg text-gray-700 dark:text-gray-200 max-w-3xl mx-auto mb-2">
            Browse the latest League of Legends patch notes, including champion changes, item updates, and gameplay adjustments. All patch notes are linked directly from the official Riot Games website, ensuring you always have accurate and up-to-date information.
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
            Statikk Shiv is an independent fan project and is not endorsed by Riot Games. All trademarks and copyrights belong to their respective owners.
          </p>
        </header>
        <section>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 w-full">
            {patches && patches.length > 0 ? (
              patches.slice(0, visibleCount).map((patch, idx) => (
                <div
                  key={idx}
                  className="bg-white/95 dark:bg-neutral-900 rounded-3xl shadow-xl hover:shadow-2xl transition-all p-8 flex flex-col group border border-teal-200 dark:border-neutral-800 relative overflow-hidden"
                  tabIndex={0}
                  aria-label={`League of Legends ${patch.title}`}
                >
                  <div className="flex items-center gap-2 mb-3">
                    <span className="px-2 py-0.5 rounded bg-teal-100 dark:bg-teal-900 text-teal-700 dark:text-teal-300 text-xs font-bold tracking-wide">
                      Patch {getPatchVersion(patch.title)}
                    </span>
                    {idx === 0 && (
                      <span className="ml-2 px-2 py-0.5 rounded bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs font-bold animate-pulse">
                        NEW
                      </span>
                    )}
                  </div>
                  <a
                    href={patch.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex flex-col group"
                    tabIndex={-1}
                  >
                    <h2 className="text-2xl font-extrabold text-teal-700 dark:text-teal-300 mb-3 group-hover:underline transition break-words leading-snug">
                      {patch.title}
                    </h2>
                    {patch.date && (
                      <div className="text-xs text-gray-500 dark:text-gray-400 mb-2">
                        {patch.date}
                      </div>
                    )}
                    <div className="text-sm text-gray-700 dark:text-gray-300 mb-4 min-h-[2.5em]">
                      {patch.summary || "Read the official patch notes for all champion, item, and gameplay changes in this update."}
                    </div>
                    <span className="text-xs text-gray-500 dark:text-gray-400 mt-auto flex items-center gap-1">
                      <CiLink className="h-4 w-4 inline" /> Read full patch notes &rarr;
                    </span>
                  </a>
                  <div className="flex items-center gap-2 mt-6">
                    <button
                      className={`px-3 py-1 text-xs rounded bg-gradient-to-r from-teal-600 to-cyan-500 text-white hover:from-teal-700 hover:to-cyan-600 transition flex items-center gap-1 shadow relative focus:outline-none focus:ring-2 focus:ring-teal-400`}
                      onClick={() => handleCopy(patch.url, idx)}
                      title="Copy patch notes link"
                      type="button"
                      aria-label="Copy patch notes link"
                    >
                      <FaClipboard className="h-4 w-4" />
                      {copiedIdx === idx ? "Copied!" : "Copy Link"}
                    </button>
                    <a
                      href={patch.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1 text-xs rounded bg-gray-200 dark:bg-neutral-800 text-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-neutral-700 transition shadow focus:outline-none focus:ring-2 focus:ring-teal-400"
                      aria-label="Open official patch notes"
                    >
                      Open
                    </a>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center text-gray-500">
                No patch notes found.
              </div>
            )}
          </div>
          {visibleCount < patches.length && (
            <div className="flex justify-center mt-12">
              <button
                className="px-8 py-4 rounded-xl bg-gradient-to-r from-teal-600 to-cyan-500 text-white font-bold text-lg shadow-lg hover:from-teal-700 hover:to-cyan-600 transition-all"
                onClick={handleLoadMore}
              >
                Load More Patch Notes
              </button>
            </div>
          )}
        </section>
        {showToast && (
          <div className="fixed bottom-8 left-1/2 -translate-x-1/2 bg-teal-700 text-white px-6 py-3 rounded-full shadow-lg z-50 animate-fade-in">
            Link copied to clipboard!
          </div>
        )}
        <section className="mt-20 max-w-4xl mx-auto text-center">
          <h3 className="text-3xl font-bold mb-3 text-teal-400 drop-shadow">
            About These Patch Notes
          </h3>
          <p className="text-lg text-gray-700 dark:text-gray-200 mb-4">
            Patch notes listed here are sourced directly from Riot Games’ official League of Legends news portal. We do not alter or summarize the content—every link takes you to the original, unmodified patch notes as published by Riot.
          </p>
          <ul className="list-disc list-inside text-left text-gray-700 dark:text-gray-200 mb-8 mx-auto max-w-xl text-base">
            <li>Stay informed about champion, item, and system changes.</li>
            <li>Plan your ranked climb with the latest balance updates.</li>
            <li>Review official bug fixes, new features, and gameplay improvements.</li>
          </ul>
          <div className="bg-gradient-to-r from-teal-700 to-cyan-700 rounded-xl py-6 px-4 text-white shadow-lg font-semibold text-lg">
            <span>
              Statikk Shiv is a community resource. All patch notes are © Riot Games and provided for informational purposes only.
            </span>
          </div>
        </section>
        <section className="mt-20 max-w-3xl mx-auto text-center">
          <h4 className="text-xl font-bold mb-2 text-cyan-400">League of Legends Patch Notes FAQ</h4>
          <div className="text-gray-700 dark:text-gray-300 text-base space-y-3">
            <p>
              <strong>Where can I find the latest League of Legends patch notes?</strong><br />
              All official patch notes are published by Riot Games and are always available here at Statikk Shiv, your trusted League of Legends stats and analytics platform.
            </p>
            <p>
              <strong>How often are patch notes released?</strong><br />
              Riot Games typically releases new patches every two weeks, bringing balance changes, new content, and bug fixes.
            </p>
            <p>
              <strong>Why should I read patch notes?</strong><br />
              Reading patch notes helps you stay ahead of the meta, understand champion and item changes, and improve your gameplay.
            </p>
            <p>
              <strong>Are these patch notes official?</strong><br />
              Yes! All patch notes linked here are direct from Riot Games’ official website.
            </p>
          </div>
        </section>
      </main>
      <Footer />
      <style>{`
        .animate-fade-in {
          animation: fade-in 0.7s;
        }
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px);}
          to { opacity: 1; transform: translateY(0);}
        }
      `}</style>
    </div>
  );
};

export default Patches;