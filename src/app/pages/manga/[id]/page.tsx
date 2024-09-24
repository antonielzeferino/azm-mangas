'use client'

import { fetchMangaById, getMangaCover } from "@/app/api/routes";
import Header from "@/components/Header";
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
        console.log(fetchedManga?.data.id);
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
      try {
        const coverURL = await getMangaCover(id);
        if (coverURL) {
          setCoverURL(coverURL);
        }
      } catch (error) {
        console.error("Erro ao buscar capa:", error);
      }
    };

    if (id) {
      getManga(id);
      getCover(id);
    }
  }, [id]);

  return (
    <div className="px-4 py-2">
      <Header />
      {loading ? (
        <Loading />
      ) : manga ? (
        <div className="md:flex">
          <MangaCard 
            coverUrl={coverURl}
            id={id}
            title={manga.attributes.title?.altTitles?.en || 'manga cover'}
          />
          <div className="p-2">
            <p>Título: {manga.attributes?.title?.en || 'Titulo não disponivel'}</p>
            <p>Status: {manga.attributes.status || ' Status indisponivel'}</p>
            <p>Ano de Lançamento: {manga.attributes.year || 'Valor Indisponivel'}</p>
            <p>Descrição: {manga.attributes?.description?.en || 'Descrição não disponível'}</p>
          </div>
        </div>
      ) : (
        <p>Mangá não encontrado</p>
      )}
    </div>
  );
}

export default MangaPage;
