'use client'

import { useEffect, useState } from "react";
import { heroData } from "@/data/heroData";
import Image from "next/image";
import style from "./hero.module.css";

const Hero = () => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [fade, setFade] = useState<boolean>(true);

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * heroData.length);
    setCurrentIndex(randomIndex);

    const interval = setInterval(() => {
      setFade(false);

      setTimeout(() => {
        let newIndex;
        do {
          newIndex = Math.floor(Math.random() * heroData.length);
        } while (newIndex === currentIndex);
        
        setCurrentIndex(newIndex);
        setFade(true);
      }, 1000);

    }, 30 * 1000);

    return () => clearInterval(interval);
  }, [currentIndex]);

  return (
    <div className="w-full h-[25vh] md:h-[70vh] relative overflow-hidden bg-gray-400">
      <Image
        src={heroData[currentIndex].src}
        alt={heroData[currentIndex].alt}
        layout="fill"
        objectFit="cover"
        priority
        className={`${fade ? style.fadeIn : style.fadeOut}`}
      />
      <div className="relative top-7 left-2 md:top-[30%] md:left-20">
        <h1 className={`${style.heroH1} text-2xl md:text-7xl`}>AZM MANGAS</h1>
        <h2 className={`${style.heroH2} text-md md:text-3xl`}>
          Discover a new world of entertainment
        </h2>
      </div>
    </div>
  );
};

export default Hero;
