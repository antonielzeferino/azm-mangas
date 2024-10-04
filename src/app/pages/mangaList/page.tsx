'use client'

import React, { useEffect, useState } from "react";
import { MangaData } from "@/types/mangaTypes";
import { fetchMangaById, getMangaCover } from "@/app/api/routes";
import Loading from "@/components/Loading";
import MangaCard from "@/components/MangaCard";
import Nav from "@/components/Nav";
import Link from "next/link";

const FavMangaList: React.FC = () => {
  const [mangas, setMangas] = useState<MangaData[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [coverURLs, setCoverURLs] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    const getFavMangas = async () => {
      const mangasID = localStorage.getItem('favMangas');
      if (mangasID) {
        const parsedMangasID = JSON.parse(mangasID) as string[];
        setLoading(true);
        try {
          const fetchedMangas = await Promise.all(
            parsedMangasID.map(async (id) => {
              const fetchedManga = await fetchMangaById(id);
              return fetchedManga?.data;
            })
          );
          const validMangas = fetchedMangas.filter((manga): manga is MangaData => !!manga);
          setMangas(validMangas);

          const covers = await Promise.all(
            parsedMangasID.map(async (id) => {
              const coverURL = await getMangaCover(id);
              return { id, coverURL };
            })
          );

          const coverURLsMap: { [key: string]: string } = {};
          covers.forEach((cover) => {
            if (cover.coverURL) {
              coverURLsMap[cover.id] = cover.coverURL;
            }
          });
          setCoverURLs(coverURLsMap);
        } catch (error) {
          console.error("Erro ao buscar mangás ou capas:", error);
        } finally {
          setLoading(false);
        }
      }
    };

    getFavMangas();
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="pb-4">
      <Nav pageType="favorites" />
      {mangas.length > 0 ? (
        <ul 
          className="flex flex-wrap justify-evenly gap-y-4"
        >
          {mangas.map((manga) => (
            <li key={manga.id}>
              <div>
                <Link href={`/pages/manga/${manga.id}`} className="flex-shrink-0 w-auto">
                  {coverURLs[manga.id] && (
                    <MangaCard
                      coverUrl={coverURLs[manga.id]}
                      id={manga.id}
                      title={manga.attributes.title?.en || 'Manga Cover'}
                      cardClass="min-w-[280px] max-w-96 w-4/5 md:w-2/5"
                    />
                  )}
                </Link>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>Sem mangás favoritos.</p>
      )}
    </div>
  );
};

export default FavMangaList;
