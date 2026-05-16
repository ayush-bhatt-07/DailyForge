import React from "react";
import { Users, Zap, Settings, BarChart3 } from "lucide-react";

const FeaturePill = ({ icon: Icon, text, pos, delay }) => (
  <div
    className={`absolute hidden lg:flex items-center gap-4 px-6 py-4 rounded-2xl 
               bg-white/95 backdrop-blur-md border border-[#98e1d7] shadow-xl 
               shadow-[#4eb7b3]/15 animate-float z-50 transition-all 
               duration-300 hover:scale-105 select-none ${pos}`}
    style={{ animationDelay: delay }}
  >
    <div className="p-2.5 rounded-xl bg-[#d0f6e3] text-[#3b8ea0]">
      <Icon size={24} strokeWidth={2.5} />
    </div>
    <span className="text-base font-extrabold tracking-tight text-[#3b8ea0]">
      {text}
    </span>
  </div>
);

const AuthLayout = ({ children }) => {
  const pills = [
    // Positions map neatly across the wider responsive layout grid
    { text: "Joined by 500+ students", icon: Users, pos: "top-[15%] left-[5%] xl:left-[9%]", delay: "0s" },
    { text: "Build habits 2x faster", icon: Zap, pos: "top-[28%] right-[1%] xl:right-[10%]", delay: "1.5s" },
    { text: "Customizable Routines", icon: Settings, pos: "bottom-[28%] left-[3%] xl:left-[10%]", delay: "3s" },
    { text: "Weekly Progress Insights", icon: BarChart3, pos: "bottom-[15%] right-[1%] xl:right-[8%]", delay: "4.5s" },
  ];

  return (
    <div className="relative min-h-screen app-bg flex items-center justify-center overflow-hidden p-6 w-full">
      {/* BACKGROUND DECORATION */}
      <div className="absolute w-[800px] h-[800px] bg-[#4eb7b3]/20 rounded-full blur-[150px] -z-10" />

      {/* Screen-wide canvas bounds for safe pill distribution */}
      <div className="absolute inset-0 pointer-events-none w-full h-full overflow-hidden">
        <div className="relative w-full h-full max-w-7xl mx-auto pointer-events-auto">
          {pills.map((pill, i) => (
            <FeaturePill key={i} {...pill} />
          ))}
        </div>
      </div>

      {/* Centered Authorization Form Card Container */}
      <div className="relative z-10 w-full max-w-md mx-auto">
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;