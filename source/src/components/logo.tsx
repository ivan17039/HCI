import React from "react";

const Logo = ({ color = "text-primary", size = "text-4xl" }: { color?: string; size?: string }) => {
  return (
    <div className="flex items-center justify-center mt-2.5">

      <div className="relative">
        <div className={`absolute top-[-32px] left-1/2 transform -translate-x-[60%] text-yellow-600 text-2xl mt-2.5`}>
          ★ ★ ★
        </div>
        <div className="flex items-center">
          <span className={`text-shadow-turquoise ${color} ${size}`}>A</span>
          <span className={`text-shadow-turquoise text-2xl ${color} `}>PARTMAN</span>
          <span className={`text-shadow-turquoise ${color} ${size}`}>I</span>
          <span className={`text-white text-stroke-black text-red-border ml-2 font-bold text-4xl italic`}>3m</span>
        </div>
      </div>
      </div>
  );
};

export default Logo;
