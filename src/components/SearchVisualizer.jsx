import { motion, AnimatePresence } from "framer-motion";
import React from "react";

const SearchVisualizer = ({ array, activeIndex, foundIndex }) => {
  return (
    <div className="flex items-end justify-center px-4 py-6 gap-[2px] max-w-[95vw] md:max-w-6xl mx-auto h-[60vh] overflow-x-auto scrollbar-thin">
      <AnimatePresence>
        {array.map((value, idx) => {
          const isActive = idx === activeIndex;
          const isFound = idx === foundIndex;

          let barColor = "bg-gradient-to-t from-green-400 to-green-300"; // default

          if (isFound) {
            barColor = "bg-purple-500";
          } else if (isActive) {
            barColor = "bg-yellow-400";
          }

          return (
            <motion.div
              key={idx}
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ layout: { duration: 0.4 }, duration: 0.2 }}
              style={{ height: `${value}px` }}
              className={`w-[30px] sm:w-[20px] md:w-[40px] ${barColor} array-bar rounded-sm`}
            >
              <p className="font-medium text-white text-xs sm:text-sm px-1 text-center">
                {value}
              </p>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
};

export default SearchVisualizer;
