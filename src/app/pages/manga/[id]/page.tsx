'use client'

import { fetchMangaById, getMangaCover } from "@/app/api/routes";
import Nav from "@/components/Nav";
import Loading from "@/components/Loading";
import MangaCard from "@/components/MangaCard";
import { MangaPageValues } from "@/types/mangaTypes";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

function MangaPage() {
  const { id: rawId } = useParams();
  const id = typeof rawId === 'string' ? rawId : '';
  const [manga, setManga] = useState<MangaPageValues | null>(null);
  const [coverURl, setCoverURL] = useState<string>('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getManga = async (id: string) => {
      setLoading(true);
      try {
        const fetchedManga = await fetchMangaById(id);
        if (fetchedManga) {
          setManga(fetchedManga.data);
        }
      } catch (error) {
        console.error("Erro ao buscar mangá:", error);
      } finally {
        setLoading(false);
      }
    };

    const getCover = async (id: string) => {
      setLoading(true)
      try {
        const coverURL = await getMangaCover(id);
        if (coverURL) {
          setCoverURL(coverURL);
        }
      } catch (error) {
        console.error("Erro ao buscar capa:", error);
      } finally {
        setLoading(false)
      }
    };

    if (id) {
      getManga(id);
      getCover(id);
    }
  }, [id]);

  return (
    <div className="flex flex-col flex-grow pb-2">
      <Nav mangaID={id} pageType="manga"/>
      {loading ? (
        <Loading />
      ) : manga ? (
        <div className="flex flex-col md:flex-row md:space-x-6 items-center md:items-start md:justify-center px-4">
          <MangaCard
            coverUrl={coverURl}
            id={id}
            title={manga.attributes.title?.altTitles?.en || 'Manga Cover'}
            cardClass="min-w-[280px] max-w-96 w-4/5 md:w-2/5"
          />

          <div className="p-4 w-full md:w-2/3 rounded-lg max-w-3xl">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4 text-center">
              {manga.attributes?.title?.en || 'Title not available'}
            </h2>

            <div className="grid grid-cols-2 gap-4 max-w-xl">
              <p className="text-gray-700 dark:text-gray-300">
                <strong>Status:</strong> {manga.attributes.status || 'Status not available'}
              </p>
              <p className="text-gray-700 dark:text-gray-300">
                <strong>Year:</strong> {manga.attributes.year || 'Year not available'}
              </p>
              <p className="text-gray-700 dark:text-gray-300">
                <strong>Author:</strong> {'Author not available'}
              </p>
            </div>

            <div className="flex flex-wrap gap-2 py-2">
              <strong className="text-sm md:text-md text-gray-700 dark:text-gray-300">Tags: </strong>
              {manga?.attributes?.tags && manga.attributes.tags.length > 0 ? (
                manga.attributes.tags.map((tag, index) => (
                  <span key={tag.id} className="cursor-pointer text-xs md:text-sm">
                    {tag.attributes.name.en}
                    {manga.attributes.tags && index < manga.attributes.tags.length - 1 ? ',' : '.'}
                  </span>
                ))
              ) : (
                <span>No tags available</span>
              )}
            </div>

            <div className="mt-4">
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">Description</h3>
              <p className="text-gray-700 dark:text-gray-300 text-justify">
                {manga.attributes?.description?.en || 'Description not available'}
              </p>
            </div>
          </div>
        </div>
      ) : (
        <p className="text-center text-gray-700 dark:text-gray-300">Manga not found</p>
      )}
    </div>
  );
}

export default MangaPage;
