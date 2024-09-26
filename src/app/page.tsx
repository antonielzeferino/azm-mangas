import MangaList from "@/components/MangaList";
import { mangaTagsID } from "@/data/mangaTagsID";

export default function Home() {

  return (
    <main className="py-4">
      <h2 className="px-4">Mangás Populares</h2>
      <MangaList limit={10} tags={[mangaTagsID.Comedy]}/>
      <MangaList limit={20} tags={[mangaTagsID.Adventure]}/>
    </main>
  );
}
