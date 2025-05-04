import { CheckCircle2 } from "lucide-react";

const Pricing = () => {
  return (
    <div className="mt-20">
      <h2 className=" text-3xl sm:text-5xl lg:text-6xl text-center my-8 tracking-dark:wide
      dark:text-white text-black
      ">
        Pricing
      </h2>
      <div className="flex flex-wrap">
          <div className="w-full sm:w-1/2 lg:w-1/3 p-2 dark:
          dark:text-white text-black
          ">
            <div className="p-10 border rounded-xl
            border-neutral-700 
            ">
              <p className="text-4xl mb-8">
                free
                  <span className="bg-gradient-to-r  text-transparent bg-clip-text text-xl mb-4 ml-2
                  from-orange-500 to-red-400
                  ">
                    (Boring)
                  </span>
              </p>
              <p className="mb-8">
                <span className="text-5xl mt-6 mr-2">0$</span>
                <span className=" tracking-tight
                  dark:text-white text-black
                ">
                  /Month
                </span>
              </p>
              <ul>
                  <li className="mt-8 flex items-center">
                    <span className="ml-2">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Illo, a incidunt culpa enim quae animi consequatur nemo iste exercitationem omnis delectus facere. Officiis animi praesentium maiores! Aut aliquid est eius.</span>
                  </li>
              </ul>
              <a
                href="#"
                className="inline-flex justify-center items-center text-center w-full h-12 p-5 mt-20 tracking-tight text-xl  rounded-lg transition duration-200
                hover:bg-orange-900 border border-orange-900
                ">
                Subscribe
              </a>
            </div>
          </div>
          <div className="w-full sm:w-1/2 lg:w-1/3 p-2 
          dark:text-white text-black
          ">
            <div className="p-10 border rounded-xl 
            border-orange-700 
            ">
              <p className="text-4xl mb-8">
                good
                  <span className="bg-gradient-to-r  text-transparent bg-clip-text text-xl mb-4 ml-2
                  from-orange-500 to-red-400
                  ">
                    (Most Popular)
                  </span>
              </p>
              <p className="mb-8 ">
                <span className="text-5xl mt-6 mr-2">2$</span>
                <span className=" tracking-tight
                dark:text-white text-black
                ">
                  /Month
                </span>
              </p>
              <ul>
                  <li className="mt-8 flex items-center">
                    <span className="ml-2">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Maiores nesciunt voluptas perspiciatis est, iure omnis ratione ex voluptate libero, qui laboriosam, nam blanditiis molestias? In suscipit voluptate ipsam expedita illo.</span>
                  </li>
              </ul>
              <a
                href="#"
                className="inline-flex justify-center items-center text-center w-full h-12 p-5 mt-20 tracking-tight text-xl  rounded-lg transition duration-200
                hover:bg-orange-900 border border-orange-900"
              >
                Subscribe
              </a>
            </div>
          </div>
          <div className="w-full sm:w-1/2 lg:w-1/3 p-2 
          dark:text-white text-black
          ">
            <div className="p-10 border border-neutral-700 rounded-xl ">
              <p className="text-4xl mb-8">
                crazy
                  <span className="bg-gradient-to-r  text-transparent bg-clip-text text-xl mb-4 ml-2
                  from-orange-500 to-red-400
                  ">
                    (Most Powerfull)
                  </span>
              </p>
              <p className="mb-8">
                <span className="text-5xl mt-6 mr-2">8$</span>
                <span className=" tracking-tight
                dark:text-white text-black
                ">
                  /Month
                </span>
              </p>
              <ul>
                  <li className="mt-8 flex items-center">
                    <span className="ml-2">Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita dignissimos aperiam cupiditate nihil nesciunt aliquid in assumenda soluta amet. Ex iste adipisci alias nam incidunt dolores natus fuga nostrum beatae.</span>
                  </li>
              </ul>
              <a
                href="#"
                className="inline-flex justify-center items-center text-center w-full h-12 p-5 mt-20 tracking-tight text-xl  rounded-lg transition duration-200
                hover:bg-orange-900 border border-orange-900
                ">
                Subscribe
              </a>
            </div>
          </div>
      </div>
    </div>
  );
};

export default Pricing;