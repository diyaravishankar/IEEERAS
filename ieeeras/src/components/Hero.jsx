import React, { useState, useEffect } from "react";
import { classNames } from "@emotion/react";

const MorphingText = () => {
  const [texts, setTexts] = useState(["Think.", "Create.", "Learn."]);
  const [textIndex, setTextIndex] = useState(texts.length - 1);
  const [time, setTime] = useState(new Date());
  const [morph, setMorph] = useState(0);
  const [cooldown, setCooldown] = useState(0.25);
  useEffect(() => {
    const animate = () => {
      requestAnimationFrame(animate);

      const newTime = new Date();
      const dt = (newTime - time) / 1000;
      setTime(newTime);

      cooldown -= dt;

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
    morph -= cooldown;
    setCooldown(0);

    let fraction = morph / morphTime;

    if (fraction > 1) {
      setCooldown(cooldownTime);
      fraction = 1;
    }

    setMorph(fraction);
  };

  const setMorphStyles = (fraction) => {
    elts.text2.current.style.filter = blur(${Math.min(8 / fraction - 8, 100)}px);
    elts.text2.current.style.opacity = ${Math.pow(fraction, 0.4) * 100}%;

    fraction = 1 - fraction;
    elts.text1.current.style.filter = blur(${Math.min(8 / fraction - 8, 100)}px);
    elts.text1.current.style.opacity = ${Math.pow(fraction, 0.4) * 100}%;

    elts.text1.current.textContent = texts[textIndex % texts.length];
    elts.text2.current.textContent = texts[(textIndex + 1) % texts.length];
  };

  const doCooldown = () => {
    setMorph(0);

    elts.text2.style.filter = "";
    elts.text2.style.opacity = "100%";

    elts.text1.style.filter = "";
    elts.text1.style.opacity = "0%";
  };

  const elts = {
    text1: React.useRef(),
    text2: React.useRef(),
  };

  return (
    <div>
      <span
        ref={elts.text1}
        className={classNames("text-3xl font-bold text-center")}
      ></span>
      <span
        ref={elts.text2}
        className={classNames("text-3xl font-bold text-center")}
      ></span>
    </div>
  );
};

export default MorphingText;