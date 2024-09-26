import { Manga, MangaResponse, CoverResponse, MangaRelationship, MangaListProps, MangaData } from '@/types/mangaTypes';
import axios from 'axios';

export const baseUrl = 'https://api.mangadex.org';
const uploadUrl = 'https://uploads.mangadex.org';

export const searchManga = async (params: MangaListProps = {}): Promise<Manga[]> => {
  try {
    const queryParams: any = {
      limit: params.limit || 15,
      title: params.title || undefined,
      includedTags: params.tags || undefined,/* 
      order: params.sortBy || { latestUploadedChapter: 'desc' } */
    };
  
    const response = await axios.get<MangaResponse>(`${baseUrl}/manga`, {
      params: queryParams,
    });

    if (response.data.data.length === 0) {
      throw new Error('Nenhum mangá encontrado com esse título.');
    }

    const mangaList: Manga[] = response.data.data.map((manga) => ({
      id: manga.id,
      title: manga.attributes.title.en || 'Título desconhecido',
      coverUrl: null,
    }));

    return mangaList;
  } catch (error) {
    console.error('Erro ao buscar mangá:', error);
    throw new Error('Erro ao buscar mangá.');
  }
};

export const getMangaCover = async (mangaId: string): Promise<string | null> => {
  try {
    const mangaResponse = await axios.get<{ data: { relationships: MangaRelationship[] } }>(`${baseUrl}/manga/${mangaId}`);
    const mangaData = mangaResponse.data.data;

    const coverArt = mangaData.relationships.find((rel) => rel.type === 'cover_art');
    const coverId = coverArt?.id;

    if (!coverId) {
      throw new Error('Capa não encontrada para este mangá.');
    }

    const coverResponse = await axios.get<CoverResponse>(`${baseUrl}/cover/${coverId}`);
    const coverData = coverResponse.data.data.attributes;
    return `${uploadUrl}/covers/${mangaId}/${coverData.fileName}`;
  } catch (error) {
    console.error('Erro ao buscar capa do mangá:', error);
    return null;
  }
};

export const fetchMangaById = async (id: string) => {
  try {
    const response = (await axios.get<{data: MangaData}>(`${baseUrl}/manga/${id}`));

    if (response.status !== 200) {
      throw new Error('Erro ao buscar o mangá');
    }

    const manga = response.data;
    return manga;
  } catch (error) {
    console.error('Erro:', error);
    return null;
  }
};
