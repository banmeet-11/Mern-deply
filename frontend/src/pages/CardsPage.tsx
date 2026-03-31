import PageTitle from "../components/PageTitle";
import LoggedInName from "../components/LoggedInName";
import SearchBar from "../components/SearchBar";
import CardUI from "../components/CardUI";
import AddCard from "../components/AddCard";
import { useState } from "react";

function CardsPage() {
  const [cards, setCards] = useState<string[]>([]);
  return (
    <div>
      <PageTitle />
      <LoggedInName />
      <SearchBar setResults={setCards} />
      <CardUI cards={cards} />
      <AddCard />
    </div>
  );
}

export default CardsPage;