import { searchManga, getMangaCover } from "@/app/api/routes";
import React from "react";
import MangaCard from "./MangaCard";
import { MangaListProps } from "@/types/mangaTypes";
import Link from "next/link";

const MangaList = async (params: MangaListProps = {}) => {
  const mangaList = await searchManga({
    limit: params.limit,
    title: params.title,
    tags: params.tags,
    sortBy: params.sortBy
  });

  return (
    <div className="flex space-x-4 overflow-x-scroll p-4 bg-background">
      {Array.isArray(mangaList) && mangaList.length > 0 ? (
        await Promise.all(
          mangaList.map(async ({ id, title }) => {
            const coverUrl = await getMangaCover(id);
            return (
              <Link key={id} href={`/pages/manga/${id}`} className="flex-shrink-0 w-[250px]">
                <MangaCard id={id} title={title} coverUrl={coverUrl} cardClass={params.cardClass} />
              </Link>
            );
          })
        )
      ) : (
        <span>Erro ao carregar a lista de mangás</span>
      )}
    </div>
  );
};

export default MangaList;
