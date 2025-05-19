import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Typewriter component (unchanged)
const Typewriter = ({ words, typingSpeed = 150, deletingSpeed = 50, pauseTime = 2500 }) => {
  const [text, setText] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const current = words[wordIndex % words.length];
    let timeout;

    if (!isDeleting && text.length < current.length) {
      timeout = setTimeout(() => setText(current.slice(0, text.length + 1)), typingSpeed);
    } else if (!isDeleting && text.length === current.length) {
      timeout = setTimeout(() => setIsDeleting(true), pauseTime);
    } else if (isDeleting && text.length > 0) {
      timeout = setTimeout(() => setText(current.slice(0, text.length - 1)), deletingSpeed);
    } else if (isDeleting && text.length === 0) {
      setIsDeleting(false);
      setWordIndex(prev => prev + 1);
    }

    return () => clearTimeout(timeout);
  }, [text, isDeleting, wordIndex, words, typingSpeed, deletingSpeed, pauseTime]);

  return (
    <span aria-live="polite" aria-atomic="true" role="text">
      {text}
    </span>
  );
};

const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: custom => ({
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 100, damping: 10, delay: custom * 0.05 },
  }),
};

const buttonBounce = {
  initial: { scale: 0.8 },
  animate: {
    scale: [1.1, 0.9, 1.05, 1],
    transition: { duration: 0.6, times: [0, 0.4, 0.8, 1], ease: "easeOut" },
  },
};

const HeroSection = () => {
  const [nickname, setNickname] = useState("");
  const [tagline, setTagline] = useState("");
  const [region, setRegion] = useState("eun1");
  const [searching, setSearching] = useState(false);

  const dynamicWords = [
    "Summoners",
    "ADCs",
    "Teemo Players[*]",
    "Top Laners",
    "Jungle Players",
    "Mid Players",
    "Grinders",
    "Grinder Kings",
    "Champions",
    "Fed Players",
    "Ranked Climbers",
    "Solo Queue Masters",
    "Support Mains",
    "Carry Bots",
    "AFK Players",
    "Champion Chasers",
    "Pro Junglers",
    "Team Players",
    "Legends",
    "Flamers",
    "Try hard Mids",
    "Clutch ADCs",
    "Zoned Out Players",
    "KDA Grinders",
    "Ranked Climbers",
    "Ultimate Sweats",
    "Legendary Tops",
  ];

  // Handle search with instant feedback
  const handleSubmit = (e) => {
    e.preventDefault();
    setSearching(true);
    // Simulate a short delay before actual navigation (remove setTimeout in production)
    setTimeout(() => {
      e.target.submit();
    }, 1200);
  };

  return (
    <motion.section
      className="flex flex-col items-center mt-6 lg:mt-20"
      aria-label="Hero section with search form"
      variants={containerVariants}
      initial="hidden"
      animate="show"
    >
      <motion.h1
        variants={itemVariants}
        custom={0}
        className="text-4xl sm:text-6xl lg:text-7xl text-center tracking-wide dark:text-white text-black"
      >
        LOL Stats
        <span className="bg-gradient-to-r text-transparent bg-clip-text from-[#64ddcd] to-[#3c8277]">
          {" "}
          for <Typewriter words={dynamicWords} />
        </span>
      </motion.h1>

      <motion.form
        action={window.routes.profileSearch}
        method="GET"
        className="mt-10 flex flex-col sm:flex-row items-center gap-4"
        variants={itemVariants}
        custom={1}
        aria-label="Search summoner profile form"
        onSubmit={handleSubmit}
      >
        <motion.label htmlFor="nickname" className="sr-only">
          Nickname
        </motion.label>
        <motion.input
          id="nickname"
          name="nickname"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          type="text"
          placeholder="Enter Nickname"
          className="px-4 py-2 rounded-md border dark:bg-neutral-900 dark:text-white dark:border-neutral-700 text-black border-neutral-300"
          required
          variants={itemVariants}
          custom={2}
          aria-required="true"
        />

        <motion.label htmlFor="tagline" className="sr-only">
          Tagline
        </motion.label>
        <motion.input
          id="tagline"
          name="tagline"
          value={tagline}
          onChange={(e) => setTagline(e.target.value)}
          type="text"
          placeholder="Enter Tagline"
          className="px-4 py-2 rounded-md border dark:bg-neutral-900 dark:text-white dark:border-neutral-700 text-black border-neutral-300"
          variants={itemVariants}
          custom={3}
        />

        <motion.label htmlFor="region" className="sr-only">
          Region
        </motion.label>
        <motion.select
          id="region"
          name="region"
          value={region}
          onChange={(e) => setRegion(e.target.value)}
          className="px-4 py-2 rounded-md border dark:bg-neutral-900 dark:text-white dark:border-neutral-700 text-black border-neutral-300"
          required
          variants={itemVariants}
          custom={4}
          aria-required="true"
        >
          <option value="br1">BR1</option>
          <option value="eun1">EUN1</option>
          <option value="euw1">EUW1</option>
          <option value="jp1">JP1</option>
          <option value="kr">KR</option>
          <option value="la1">LA1</option>
          <option value="la2">LA2</option>
          <option value="me1">ME1</option>
          <option value="na1">NA1</option>
          <option value="oc1">OC1</option>
          <option value="ru">RU</option>
          <option value="sg2">SG2</option>
          <option value="tr1">TR1</option>
          <option value="tw2">TW2</option>
          <option value="vn2">VN2</option>
        </motion.select>

        <motion.button
          type="submit"
          className="bg-gradient-to-r py-3 px-6 rounded-md transition delay-10 duration-150 ease-in-out hover:-translate-y-1 hover:scale-110 from-[#64ddcd] to-[#3c8277] text-white"
          variants={buttonBounce}
          initial="initial"
          animate="animate"
          whileHover={{ scale: 1.1, y: -2 }}
          whileTap={{ scale: 0.95 }}
          aria-label="Search"
          disabled={searching}
        >
          {searching ? "Searching..." : "Search"}
        </motion.button>
      </motion.form>

      {/* Searching overlay like "loading more matches" but for searching match */}
      <AnimatePresence>
        {searching && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/40"
          >
            <svg className="animate-spin h-12 w-12 text-blue-600 mx-auto mb-4" viewBox="0 0 24 24">
              <circle
                className="opacity-25"
                cx="12" cy="12" r="10"
                stroke="currentColor"
                strokeWidth="4"
                fill="none"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
              />
            </svg>
            <p className="text-lg text-center text-white px-4">
              Searching for the profile...<br />
              <span className="text-sm text-gray-200">
                This may take a second.
              </span>
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.section>
  );
};

export default HeroSection;
