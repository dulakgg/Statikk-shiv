import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

// Typewriter component
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

  return <>{text}</>;
};

const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: custom => ({ opacity: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 10, delay: custom * 0.05 } }),
};

const buttonBounce = {
  initial: { scale: 0.8 },
  animate: { scale: [1.1, 0.9, 1.05, 1], transition: { duration: 0.6, times: [0, 0.4, 0.8, 1], ease: "easeOut" } },
};

const HeroSection = () => {
  const [nickname, setNickname] = useState("");
  const [tagline, setTagline] = useState("");
  const [region, setRegion] = useState("na");
  const dynamicWords = [
    "Summoners", "ADCs", "Teemo Players[*]", "Top Laners", "Jungle Players", "Mid Players", "Grinders", 
    "Grinder Kings", "Champions", "Fed Players", "Ranked Climbers", "Solo Queue Masters", 
    "Support Mains", "Carry Bots", "AFK Players", "Champion Chasers", "Pro Junglers", "Team Players", 
    "Legends", "Flamers", "Try hard Mids", "Clutch ADCs", "Zoned Out Players", "KDA Grinders", 
    "Ranked Climbers", "Ultimate Sweats", "Legendary Tops"
  ];
  return (
    <motion.div
      className="flex flex-col items-center mt-6 lg:mt-20"
      variants={containerVariants}
      initial="hidden"
      animate="show"
    >
      <motion.h1
        variants={itemVariants}
        custom={0}
        className="text-4xl sm:text-6xl lg:text-7xl text-center tracking-wide dark:text-white text-black"
      >
        Lol Stats
        <span className="bg-gradient-to-r text-transparent bg-clip-text from-orange-500 to-red-800">
          {" "}for <Typewriter words={dynamicWords} />
        </span>
      </motion.h1>

      <motion.form
        action={window.routes.profileSearch}
        method="GET"
        className="mt-10 flex flex-col sm:flex-row items-center gap-4"
        variants={itemVariants}
        custom={1}
      >
        <motion.input
          name="nickname"
          value={nickname}
          onChange={e => setNickname(e.target.value)}
          type="text"
          placeholder="Enter Nickname"
          className="px-4 py-2 rounded-md border dark:bg-neutral-900 dark:text-white dark:border-neutral-700 text-black border-neutral-300"
          required
          variants={itemVariants}
          custom={2}
        />
        #
        <motion.input
          name="tagline"
          value={tagline}
          onChange={e => setTagline(e.target.value)}
          type="text"
          placeholder="Enter Tagline"
          className="px-4 py-2 rounded-md border dark:bg-neutral-900 dark:text-white dark:border-neutral-700 text-black border-neutral-300"
          variants={itemVariants}
          custom={3}
        />

        <motion.select
          name="region"
          value={region}
          onChange={e => setRegion(e.target.value)}
          className="px-4 py-2 rounded-md border dark:bg-neutral-900 dark:text-white dark:border-neutral-700 text-black border-neutral-300"
          required
          variants={itemVariants}
          custom={4}
        >
          <option value="europe">EUROPE</option>
          <option value="americas">AMERICA</option>
          <option value="asia">ASIA</option>
        </motion.select>

        <motion.button
          type="submit"
          className="bg-gradient-to-r py-3 px-6 rounded-md transition delay-10 duration-150 ease-in-out hover:-translate-y-1 hover:scale-110 from-orange-500 to-orange-800 text-white"
          variants={buttonBounce}
          initial="initial"
          animate="animate"
          whileHover={{ scale: 1.1, y: -2 }}
          whileTap={{ scale: 0.95 }}
        >
          Search
        </motion.button>
      </motion.form>
    </motion.div>
  );
};

export default HeroSection;
