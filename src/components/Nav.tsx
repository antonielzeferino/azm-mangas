'use client'

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import SaveIcon from "@/public/favorite-icon.png";
import SavedIcon from "@/public/favorited-icon.png";

interface NavProps {
  mangaID?: string;
  pageType: 'home' | 'manga' | 'favorites';
}

const Nav = ({ mangaID, pageType }: NavProps) => {
  const router = useRouter();
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    if (mangaID) {
      const favMangas = localStorage.getItem("favMangas");
      if (favMangas && favMangas.includes(mangaID)) {
        setIsSaved(true);
      }
    }
  }, [mangaID]);

  const handleBackClick = () => {
    router.back();
  };

  const handleSaveClick = () => {
    if (!mangaID) return;

    const favMangas = localStorage.getItem("favMangas");
    let favList = favMangas ? JSON.parse(favMangas) : [];

    if (isSaved) {
      favList = favList.filter((id: string) => id !== mangaID);
    } else {
      favList.push(mangaID);
    }

    localStorage.setItem("favMangas", JSON.stringify(favList));
    setIsSaved(!isSaved);
  };

  const handleNavigateToFavorites = () => {
    router.push('/pages/mangaList');
  };

  return (
    <nav className="flex justify-between p-2 w-full">
      {pageType === 'manga' && (
        <>
          <button onClick={handleBackClick}>
            <span className="text-lg">{"< Back"}</span>
          </button>
          <button onClick={handleSaveClick}>
            <Image
              src={isSaved ? SavedIcon : SaveIcon}
              alt="save icon"
              width={40}
              height={40}
              priority
              className={`transition-transform duration-300 ${!isSaved && "dark:filter dark:invert dark:sepia dark:saturate-100"
                }`}
            />
          </button>
        </>
      )}

      {pageType === 'home' && (
        <button
          onClick={handleNavigateToFavorites}
          className="z-10 w-full flex justify-end gap-3 items-center"
        >
          <span className="text-white" >Favoritos</span>
          <Image
            src={SaveIcon}
            alt="Go to Favorites"
            width={30}
            height={30}
            priority
            className=" bg-white bg-opacity-10 rounded-lg"
          />
        </button>
      )}

      {pageType === 'favorites' && (
        <button onClick={handleBackClick}>
          <span className="text-lg">{"< Back"}</span>
        </button>
      )}
    </nav>
  );
};

export default Nav;
