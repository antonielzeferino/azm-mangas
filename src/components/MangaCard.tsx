import Image from "next/image";
import React from "react";

interface MangaCardProps {
  id: string;
  title: string;
  coverUrl: string | null;
  cardClass?: string
}


const MangaCard: React.FC<MangaCardProps> = ({ id, title, coverUrl, cardClass}) => {

  const cardStyle = cardClass ? cardClass : 'w-[150px] h-[220px] md:w-[250px] md:h-[300px]';

  return (
    <div key={id} className={`flex-shrink-0 ${cardStyle}`}>
      {coverUrl && (
        <Image
          src={coverUrl || 'nada'}
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
