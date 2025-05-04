import React from "react";

const HeroSection = () => {
    return (
        <div className="flex flex-col items-center mt-6 lg:mt-20">
            <h1 className=" text-4xl sm:text-6xl lg:text-7xl text-center tracking-wide
            text-white
            ">
                Lol Stats 
                <span className="bg-gradient-to-r text-transparent bg-clip-text
                from-orange-500 to-red-800 
                ">
                    {" "} for player
                </span>
                
            </h1>
            <p className="mt-10 text-lg text-center max-w-4xl
            text-neutral-500 
            ">
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptatum neque eius, cupiditate consequuntur nesciunt eveniet commodi sapiente incidunt cum, explicabo quisquam eos ipsam placeat exercitationem esse ut quasi provident reiciendis!
            </p>
            <div className="flex justify-center my-10 
            text-white
            ">
                <a
                href="#"
                className="bg-gradient-to-r py-3 px-4 mx-3 rounded-md transition delay-10 duration-150 ease-in-out hover:-translate-y-1 hover:scale-110
                from-orange-500 to-orange-800
                ">
                lorem
                </a>
                <a href="#" className="py-3 px-4 mx-3 rounded-md border transition delay-10 duration-150 ease-in-out hover:-translate-y-1 hover:scale-110">
                ipsum
                </a>
            </div>
        </div>
    );
};

export default HeroSection;