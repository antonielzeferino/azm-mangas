import MangaList from "@/components/MangaList";

export default function Home() {

  return (
    <main className="py-4">
      <h2 className="px-4">Mangás Populares</h2>
      <MangaList limit={10}/>
      <MangaList limit={2}/>
    </main>
  );
}
