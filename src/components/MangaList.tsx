import { searchManga, getMangaCover } from "@/app/api/routes";
import React from "react";
import MangaCard from "./MangaCard";
import { MangaSearchParams } from "@/types/mangaTypes";
import Link from "next/link";

const MangaList = async (params: MangaSearchParams = {}) => {
  const mangaList = await searchManga({
    limit: params.limit,
    tags: params.tags,
    title: params.title,
    sortBy: params.sortBy
  });

  return (
    <div className="flex space-x-4 overflow-x-scroll p-4 dark:bg-red-50">
      {Array.isArray(mangaList) && mangaList.length > 0 ? (
        await Promise.all(
          mangaList.map(async ({ id, title }) => {
            const coverUrl = await getMangaCover(id);
            return (
              <Link href={`/pages/manga/${id}`} className="flex-shrink-0 max-w-96 w-1/3 sm:w-1/5 h-full">
                <MangaCard key={id} id={id} title={title} coverUrl={coverUrl}/>
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
