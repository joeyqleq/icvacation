"use client";

import { useEffect, useRef, useState } from "react";

export function AnimatedMascotBird({
  className = "",
  playOnView = true,
  alt = "",
}: {
  className?: string;
  playOnView?: boolean;
  alt?: string;
}) {
  const rootRef = useRef<HTMLDivElement>(null);
  const [isFlying, setIsFlying] = useState(!playOnView);

  useEffect(() => {
    if (!playOnView) {
      setIsFlying(true);
      return;
    }

    const node = rootRef.current;
    if (!node || typeof IntersectionObserver === "undefined") {
      setIsFlying(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsFlying(true);
          observer.disconnect();
        }
      },
      { threshold: 0.35, rootMargin: "0px 0px -12% 0px" },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [playOnView]);

  return (
    <div
      ref={rootRef}
      className={`ic-animated-bird ${isFlying ? "is-flying" : ""} ${className}`}
      aria-hidden={alt === ""}
    >
      <svg
        className="ic-animated-bird__svg"
        width="490"
        height="486"
        viewBox="0 0 490 486"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        role={alt === "" ? undefined : "img"}
        aria-label={alt || undefined}
      >
        <path
          className="ic-animated-bird__body"
          fillRule="evenodd"
          clipRule="evenodd"
          d="M219.488 40.9213C219.488 40.9213 146.259 -52.2888 53.4177 49.781C-33.822 145.693 -17.5549 394.9 160.45 420.422C338.46 445.934 400.218 302.559 415.569 245.144C430.911 187.729 486.418 24.9744 486.418 24.9744H408.647L391.362 154.151L396.449 24.9744H334.663L345.328 157.342L326.26 26.5699H246.537C246.537 26.5699 306.318 158.49 308.913 173.377C313.521 199.693 276.665 227.405 227.561 209.863C178.457 192.321 132.018 83.9824 219.488 40.9213Z"
          fill="url(#animated_bird_body_gradient)"
        />
        <path
          className="ic-animated-bird__body-shade"
          fillRule="evenodd"
          clipRule="evenodd"
          d="M219.488 40.9213C219.488 40.9213 146.259 -52.2888 53.4177 49.781C-33.822 145.693 -17.5549 394.9 160.45 420.422C338.46 445.934 400.218 302.559 415.569 245.144C430.911 187.729 486.418 24.9744 486.418 24.9744H408.647L391.362 154.151L396.449 24.9744H334.663L345.328 157.342L326.26 26.5699H246.537C246.537 26.5699 306.318 158.49 308.913 173.377C313.521 199.693 276.665 227.405 227.561 209.863C178.457 192.321 132.018 83.9824 219.488 40.9213Z"
          fill="black"
          fillOpacity="0.2"
        />
        <path
          className="ic-animated-bird__body-stroke"
          fillRule="evenodd"
          clipRule="evenodd"
          d="M219.488 40.9213C219.488 40.9213 146.259 -52.2888 53.4177 49.781C-33.822 145.693 -17.5549 394.9 160.45 420.422C338.46 445.934 400.218 302.559 415.569 245.144C430.911 187.729 486.418 24.9744 486.418 24.9744H408.647L391.362 154.151L396.449 24.9744H334.663L345.328 157.342L326.26 26.5699H246.537C246.537 26.5699 306.318 158.49 308.913 173.377C313.521 199.693 276.665 227.405 227.561 209.863C178.457 192.321 132.018 83.9824 219.488 40.9213Z"
          stroke="#C2C2C2"
          strokeWidth="4"
        />
        <path
          className="ic-animated-bird__eye"
          fillRule="evenodd"
          clipRule="evenodd"
          d="M158.128 40.5383C158.128 49.2555 150.794 56.3269 141.72 56.3269C132.656 56.3269 125.323 49.2555 125.323 40.5383C125.323 31.8162 132.656 24.7446 141.72 24.7446C150.794 24.7446 158.128 31.8162 158.128 40.5383Z"
          fill="#26FC00"
        />
        <path
          className="ic-animated-bird__pupil"
          fillRule="evenodd"
          clipRule="evenodd"
          d="M158.128 40.4572C158.128 46.6228 153.576 51.6243 147.943 51.6243C142.318 51.6243 137.766 46.6228 137.766 40.4572C137.766 34.2882 142.318 29.2866 147.943 29.2866C153.576 29.2866 158.128 34.2882 158.128 40.4572Z"
          fill="black"
        />
        <path
          className="ic-animated-bird__wing"
          fillRule="evenodd"
          clipRule="evenodd"
          d="M116.892 213.528C116.892 213.528 198.023 369.288 321.449 298.975C321.449 298.975 316.989 276.703 305.766 251.087C289.464 213.878 258.899 169.193 207.054 171.98C148.071 177.346 116.892 213.528 116.892 213.528Z"
          fill="#FFE500"
          stroke="#ADADAD"
          strokeWidth="2.45002"
        />
        <path
          className="ic-animated-bird__tail ic-animated-bird__tail--left"
          fillRule="evenodd"
          clipRule="evenodd"
          d="M195.475 409.832L213.928 485.382L203.625 403.07L195.475 409.832Z"
          fill="#FFE500"
        />
        <path
          className="ic-animated-bird__tail ic-animated-bird__tail--right"
          fillRule="evenodd"
          clipRule="evenodd"
          d="M213.66 405.551L225.926 485.092L224.509 409.995L213.66 405.551Z"
          fill="#FFE500"
        />
        <defs>
          <linearGradient
            id="animated_bird_body_gradient"
            x1="336.383"
            y1="-75.2665"
            x2="284.787"
            y2="432.898"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0.003165" stopColor="#543131" />
            <stop offset="0.070651" stopColor="#543131" />
            <stop offset="0.181695" stopColor="#444444" />
            <stop offset="0.261298" />
            <stop offset="0.428993" stopColor="#8F8787" />
            <stop offset="0.523956" stopColor="#220A0A" />
            <stop offset="0.62504" stopColor="#565656" />
            <stop offset="0.627567" stopColor="#231414" />
            <stop offset="0.782182" stopColor="#4E4B4B" />
            <stop offset="0.979006" />
            <stop offset="1" stopColor="#595959" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}
