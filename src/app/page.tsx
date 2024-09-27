import Hero from "@/components/hero/Hero";
import MangaList from "@/components/MangaList";
import { mangaTagsID } from "@/data/mangaTagsID";

export default function Home() {

  return (
    <main>
      <Hero />
      <div className="px-4">
        <br />
        <h2 className="my-2 border-l-4 px-2 md:text-2xl border-orange-400">Romance Comedy</h2>
        <MangaList limit={10} tags={[mangaTagsID.Comedy, mangaTagsID.Romance]} />
        <br />
        <h2 className="my-2 border-l-4 px-2 md:text-2xl border-orange-400">Adventure</h2>
        <MangaList limit={20} tags={[mangaTagsID.Adventure]} />
        <br />
        <h2 className="my-2 border-l-4 px-2 md:text-2xl border-orange-400">Magic</h2>
        <MangaList limit={20} tags={[mangaTagsID.Magic]} />
      </div>
    </main>
  );
}
