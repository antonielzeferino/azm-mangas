import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import SaveIcon from "@/public/favorite-icon.png";
import SavedIcon from "@/public/favorited-icon.png";

interface NavProps {
  mangaID?: string;
}

function Nav({ mangaID }: NavProps) {
  const router = useRouter();
  const pathName = usePathname();
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    const favMangas = localStorage.getItem("favMangas");
    if (favMangas && mangaID && favMangas.includes(mangaID)) {
      setIsSaved(true);
    }
  }, [mangaID]);

  const handleBackClick = () => {
    try {
      router.back();
    } catch (error) {
      router.push('/')
    }
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

  return (
    <nav className="flex justify-between p-2">
      <button onClick={handleBackClick}>{'<'} Back</button>
      {pathName.includes("/pages/manga") && (
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
      )}
    </nav>
  );
}

export default Nav;
