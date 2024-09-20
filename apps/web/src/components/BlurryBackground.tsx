import React from "react";

const BlurryBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-white/30 backdrop-blur-3xl" />
      <div className="absolute -top-1/2 -left-1/2 w-[200%] h-[200%] animate-slow-spin">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-pulse"
            style={{
              backgroundColor: ["#ffb0ee", "#F2EC66", "#A3B5EF"][i % 3],
              width: `${Math.random() * 30 + 10}%`,
              height: `${Math.random() * 30 + 10}%`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 8}s`,
              animationDuration: `${Math.random() * 10 + 10}s`,
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default BlurryBackground;
