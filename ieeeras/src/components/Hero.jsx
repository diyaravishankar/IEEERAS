'use client'
import React, { useState, useEffect } from "react";

// Import css from @emotion/react
// import classNames from "classnames"; // Import classNames from classnames package

function MorphingText() {
  const [texts, setTexts] = useState(["Think.", "Create.", "Learn."]);
  const [textIndex, setTextIndex] = useState(texts.length - 1);
  const [time, setTime] = useState(new Date());
  const [morph, setMorph] = useState(0);
  const [cooldown, setCooldown] = useState(0.25);
  const morphTime = 1; // Add morphTime variable

  useEffect(() => {
    const animate = () => {
      requestAnimationFrame(animate);

      const newTime = new Date();
      const dt = (newTime - time) / 1000;
      setTime(newTime);

      setCooldown((prevCooldown) => prevCooldown - dt); // Update cooldown using the previous value

      if (cooldown <= 0) {
        doMorph();
      } else {
        doCooldown();
      }
    };

    animate();

    return () => {
      cancelAnimationFrame(animate);
    };
  }, [texts, textIndex, time, morph, cooldown]);

  const doMorph = () => {
    setMorph((prevMorph) => prevMorph - cooldown); // Update morph using the previous value
    setCooldown(0);

    let fraction = morph / morphTime;

    if (fraction > 1) {
      setCooldown(0.25); // Reset the cooldown
      fraction = 1;
      setTextIndex((prevTextIndex) => (prevTextIndex + 1) % texts.length); // Update textIndex
    }

    setMorph(fraction);
  };

  const setMorphStyles = (fraction) => {
    // Use css() function to generate styles
    elts.text2.current.style.filter = css`
      blur(${Math.min(8 / fraction - 8, 100)}px)
    `;
    elts.text2.current.style.opacity = `${Math.pow(fraction, 0.4) * 100}`;

    fraction = 1 - fraction;
    elts.text1.current.style.filter = css`
      blur(${Math.min(8 / fraction - 8, 100)}px)
    `;
    elts.text1.current.style.opacity = `${Math.pow(fraction, 0.4) * 100}`;

    elts.text1.current.textContent = texts[textIndex % texts.length];
    elts.text2.current.textContent = texts[(textIndex + 1) % texts.length];
  };

  const doCooldown = () => {
    setMorph(0);

    elts.text2.current.style.filter = ""; // Use current property to access the ref
    elts.text2.current.style.opacity = "100%";

    elts.text1.current.style.filter = ""; // Use current property to access the ref
    elts.text1.current.style.opacity = "0%";
  };

  const elts = {
    text1: React.useRef(),
    text2: React.useRef(),
  };

  useEffect(() => {
    setMorphStyles(morph);
  }, [morph]);

  return (
    <div>
      <span
        ref={elts.text1}
        className="text-3xl font-bold text-center"
      ></span>
      <span
        ref={elts.text2}
        className="text-3xl font-bold text-center"
      ></span>
    </div>
  );
}

export default MorphingText;