import Hero from "@/components/hero/Hero";
import MangaList from "@/components/MangaList";
import Nav from "@/components/Nav";
import { mangaTagsID } from "@/data/mangaTagsID";

export default function Home() {

  return (
    <>
      <main className="pb-4">
        <Hero />
        <Nav pageType="home"/>
        <div className="px-4 mt-[18vh] md:mt-[60vh]">
          <br />
          <h2 className="my-2 border-l-4 px-2 md:text-2xl border-orange-400">Drama</h2>
          <MangaList limit={30} tags={[mangaTagsID.Drama]}/>
          <br />
          <h2 className="my-2 border-l-4 px-2 md:text-2xl border-orange-400">Adventure</h2>
          <MangaList limit={30} tags={[mangaTagsID.Adventure]} />
          <br />
          <h2 className="my-2 border-l-4 px-2 md:text-2xl border-orange-400">Magic</h2>
          <MangaList limit={30} tags={[mangaTagsID.Magic]} />
        </div>
      </main>
    </>
  );
}
