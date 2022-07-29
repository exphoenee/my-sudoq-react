/* Libraries */
import React from "react";
import { motion } from "framer-motion";

/* Other imports */

/* Components */

export default function AnimatedPage({ children }) {
  const animation = {
    initial: { opacity: 0, x: -50 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 50 },
  };
  return (
    <motion.div
      variants={animation}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.5 }}
    >
      {children}
    </motion.div>
  );
}

/* Styled Components */
