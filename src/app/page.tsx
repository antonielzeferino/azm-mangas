import MangaList from "@/components/MangaList";

export default function Home() {

  return (
    <main className="py-4">
      <h2 className="px-4">Mangás Populares</h2>
      <MangaList limit={10} tags={['Action', 'Oneshot']} sortBy="Newest"/>
      <MangaList limit={20} tags={["Comedy"]} sortBy={"HighestRated"}/>
    </main>
  );
}
