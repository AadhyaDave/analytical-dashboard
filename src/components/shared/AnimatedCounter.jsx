import React, { useEffect, useRef, useState } from 'react';


const AnimatedCounter = ({ value, decimals = 0, duration = 1500, prefix = '', suffix = '' }) => {
  const [displayValue, setDisplayValue] = useState(0);
  const rafRef = useRef(null);
  const targetRef = useRef(value);

  useEffect(() => {
    targetRef.current = value;
    const start = displayValue;
    const end = parseFloat(value) || 0;
    const startTs = performance.now();

    const step = (timestamp) => {
      const elapsed = timestamp - startTs;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = start + (end - start) * eased;
      setDisplayValue(current);
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(step);
      }
    };

    rafRef.current = requestAnimationFrame(step);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [value, duration]);

  const formatted = typeof displayValue === 'number'
    ? displayValue.toFixed(decimals)
    : displayValue;

  return (
    <span>{prefix}{formatted}{suffix}</span>
  );
};

export default AnimatedCounter;
