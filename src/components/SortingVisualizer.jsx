import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const SortingVisualizer = ({ array, activeBars }) => {
  return (
    <div className="flex items-end justify-center px-4 py-6 gap-[2px] max-w-6xl mx-auto h-[70vh]">
      <AnimatePresence>
        {array.map((value, idx) => {
          const isActive = activeBars.includes(idx);
          const barColor = isActive
            ? "bg-yellow-400" // or red/yellow during comparison
            : "bg-gradient-to-t from-green-400 to-green-300";

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
