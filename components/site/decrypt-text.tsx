"use client";

import { useEffect, useState, useRef } from "react";

const GLYPHS = "XX**++--001100XX$$%%&&##@@";

export function DecryptText({
  text,
  isHovered,
  className = "",
}: {
  text: string;
  isHovered: boolean;
  className?: string;
}) {
  const [displayText, setDisplayText] = useState(text);
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    if (isHovered) {
      let iteration = 0;
      if (intervalRef.current) clearInterval(intervalRef.current);

      intervalRef.current = window.setInterval(() => {
        setDisplayText(
          text
            .split("")
            .map((char, index) => {
              if (char === " ") return " ";
              if (index < iteration) {
                return text[index];
              }
              return GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
            })
            .join("")
        );

        if (iteration >= text.length) {
          if (intervalRef.current) clearInterval(intervalRef.current);
        }
        iteration += 1 / 3;
      }, 25);
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
      setDisplayText(text);
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isHovered, text]);

  return <span className={className}>{displayText}</span>;
}
