import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const SortingVisualizer = ({ array, activeBars, sortedIndices }) => {
  return (
    <div className="flex items-end justify-center px-4 py-6 gap-[2px] max-w-6xl mx-auto h-[60vh]">
      <AnimatePresence>
        {array.map((value, idx) => {
          const isActive = activeBars.includes(idx);
          const isSorted = sortedIndices.includes(idx);

          let barColor = "bg-gradient-to-t from-green-400 to-green-300"; // default

          if (isSorted) {
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
              className={`w-[10px] md:w-[40px] ${barColor} array-bar rounded-sm`}
            >
              <p className="font-medium text-white text-sm px-2">{value}</p>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
};

export default SortingVisualizer;
