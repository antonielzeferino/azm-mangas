'use client'

import { useEffect, useState } from "react";
import { heroData } from "@/data/heroData";
import Image from "next/image";
import style from "./hero.module.css";

const Hero = () => {
  const [currentIndex, setCurrentIndex] = useState<number>(3);
  const [fade, setFade] = useState<boolean>(true);
  const [isFading, setIsFading] = useState<boolean>(false);

  const changeImage = () => {
    if (isFading) return; 

    setIsFading(true); 
    setFade(false); 

    setTimeout(() => {
      let newIndex;
      do {
        newIndex = Math.floor(Math.random() * heroData.length);
      } while (newIndex === currentIndex);

      setCurrentIndex(newIndex); 
      setFade(true); 
      setIsFading(false);
    }, 1000);
  };

  useEffect(() => {
    const interval = setInterval(changeImage, 5 * 60 * 1000); 
    return () => clearInterval(interval);
  }, []); 

  return (
    <div
      className="w-full h-[25vh] md:h-[70vh] absolute overflow-hidden bg-gray-400 border-b-4 border-foreground"
      onDoubleClick={changeImage} 
    >
      <Image
        src={heroData[currentIndex].src}
        alt={heroData[currentIndex].alt}
        layout="fill"
        priority
        className={`${fade ? style.fadeIn : style.fadeOut} object-fill`}
      />
      <div className="w-max h-full flex justify-center items-start m-auto md:ps-[12%] md:m-0 flex-col">
        <h1 className={`${style.heroH1} text-3xl md:text-7xl`}>AZM MANGAS</h1>
        <h2 className={`${style.heroH2} text-md md:text-3xl`}>
          Discover a new world of entertainment
        </h2>
      </div>
    </div>
  );
};

export default Hero;
