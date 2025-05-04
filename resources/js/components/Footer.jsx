import React from "react";

const Footer = () => {
  return (
    <footer className="mt-20 border-t py-10 
    border-neutral-700 text-white
    ">
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
        <div>
          <h3 className="text-md font-semibold mb-4">Resources</h3>
          <ul className="space-y-2">
              <li>
                <a
                  href="link"
                  className="dark:text-neutral-300 dark:hover:text-white text-neutral-700 hover:text-black 
                  ">
                  link text
                </a>
              </li>
          </ul>
        </div>
        <div>
          <h3 className="text-md font-semibold mb-4">Platform</h3>
          <ul className="space-y-2">
              <li>
                <a
                  href="link"
                  className="dark:text-neutral-300 dark:hover:text-white text-neutral-700 hover:text-black
                  ">
                  link text 2
                </a>
              </li>
          </ul>
        </div>
        <div>
          <h3 className="text-md font-semibold mb-4">Community</h3>
          <ul className="space-y-2">
              <li>
                <a
                  href="link"
                  className="dark:text-neutral-300 dark:hover:text-white text-neutral-700 hover:text-black
                  ">
                  link text 3
                </a>
              </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;