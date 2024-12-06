import React from "react";

const Logo = ({ color = "text-primary" }: { color?: string }) => { 
  return (
    <div className="flex items-center justify-center text-4xl mt-8">
        <div className="relative">
            <div className="absolute top-[-25px] left-1/2 transform -translate-x-[60%] text-yellow-400 text-3xl">
                ★ ★ ★
            </div>
            <div className="flex items-center">
                <span className={`text-5xl text-shadow-turquoise ${color}`}>A</span>
                <span className={`text-shadow-turquoise ${color}`}>PARTMAN</span>
                <span className={`text-5xl text-shadow-turquoise ${color}`}>I</span>
                <span className="text-white text-stroke-black text-red-border ml-2 font-italic">3m</span>
            </div>
        </div>
    </div>
  );
}

export default Logo;
