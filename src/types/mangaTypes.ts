export interface Manga {
  id: string;
  title: string;
  coverUrl: string | null
}

interface MangaAttibutes {
  title: {
    en: string;
  }
  description: {
    en: string;
  };
}

export interface MangaResponse {
  data: MangaData[];
}

export interface MangaRelationship {
  id: string;
  type: string;
}

export interface CoverResponse {
  data: CoverData;
}

export interface MangaSearchParams {
  limit?: number;
  title?: string;
  tags?: string[];  
  sortBy?: 'popularity'| 'newest'| 'highestRated'| 'mostRead'
}

export interface MangaData {
  id: string;
  attributes: MangaAttibutes;
  tags: MangaTags;
  relationships: MangaRelationship[];
}  

interface MangaTags {
  id: string;
  attributes: MangaAttibutes;
}

interface CoverAtributes {
  fileName: string;
}

interface CoverData {
  attributes: CoverAtributes;
}
export interface MangaPageValues {
  id: string;
  attributes: {
    title?: {
      en?: string;
      altTitles?: {
        en?: string;
      };
    };
    description?: {
      en?: string;
    };
    publicationDemographic?: string; 
    status?: string; 
    year?: number;
    tags?: Array<{
      id: string;
      attributes: {
        name: {
          en: string;
        };
      };
    }>; 
  };
}
