import Image from "next/image";
import React from "react";

interface MangaCardProps {
  id: string;
  title: string;
  coverUrl: string | null;
}

const MangaCard: React.FC<MangaCardProps> = ({ id, title, coverUrl }) => {
  return (
    <div key={id} className="flex-shrink-0">
      {coverUrl && (
        <Image
          src={coverUrl}
          alt={`Capa de ${title}`}
          width={250}
          height={300}
          priority
          className="object-cover w-full h-full rounded-lg shadow-lg"
        />
      )}
    </div>
  );
};

export default MangaCard;
