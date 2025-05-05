import React, { useState } from "react";

const HeroSection = () => {
  const [nickname, setNickname] = useState("");
  const [tagline, setTagline]   = useState("");
  const [region, setRegion]     = useState("na"); // default to NA

  return (
    <div className="flex flex-col items-center mt-6 lg:mt-20">
      <h1 className="text-4xl sm:text-6xl lg:text-7xl text-center tracking-wide dark:text-white text-black">
        Lol Stats 
        <span className="bg-gradient-to-r text-transparent bg-clip-text from-orange-500 to-red-800">
          {" "} for player
        </span>
      </h1>

      {/* Let the browser do the GET for us */}
        <form
        action={window.routes.profileSearch}
        method="GET"
        className="mt-10 flex flex-col sm:flex-row items-center gap-4"
        >
        <input
          name="nickname"
          value={nickname}
          onChange={e => setNickname(e.target.value)}
          type="text"
          placeholder="Enter Nickname"
          className="px-4 py-2 rounded-md border dark:bg-neutral-900 dark:text-white dark:border-neutral-700 text-black border-neutral-300"
          required
        />

        <input
          name="tagline"
          value={tagline}
          onChange={e => setTagline(e.target.value)}
          type="text"
          placeholder="Enter Tagline"
          className="px-4 py-2 rounded-md border dark:bg-neutral-900 dark:text-white dark:border-neutral-700 text-black border-neutral-300"
        />

        <select
          name="region"
          value={region}
          onChange={e => setRegion(e.target.value)}
          className="px-4 py-2 rounded-md border dark:bg-neutral-900 dark:text-white dark:border-neutral-700 text-black border-neutral-300"
          required
        >
          <option value="europe">EU</option>
          <option value="eune">EUNE</option>
          <option value="kr">KR</option>
        </select>

        <button
          type="submit"
          className="bg-gradient-to-r py-3 px-6 rounded-md transition delay-10 duration-150 ease-in-out hover:-translate-y-1 hover:scale-110 from-orange-500 to-orange-800 text-white"
        >
          Search
        </button>
      </form>
    </div>
  );
};

export default HeroSection;
