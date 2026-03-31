import { useState } from "react";
type Props = {
  setResults: (cards: string[]) => void;
};

const app_name = '142.93.241.208';

function buildPath(route:string) : string
{
    if (import.meta.env.MODE != 'development') 
    {
        return 'http://' + app_name + ':5000/' + route;
    }
    else
    {        
        return 'http://localhost:5000/' + route;
    }
}


function SearchBar(props: Props) {
  const { setResults } = props;

  const [search, setSearch] = useState("");

  async function doSearch() {
  const obj = { search: search };

  const js = JSON.stringify(obj);

  try {
    const response = await fetch(buildPath('api/searchcards'), {
      method: "POST",
      body: js,
      headers: { "Content-Type": "application/json" },
    });

    const res = await response.json();

    setResults(res.results);

    console.log(res);
  } catch (e: any) {
    alert(e.toString());
  }
}

  return (
    <div>
      <input
        placeholder="Search Cards"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <button onClick={doSearch}>Search</button>
    </div>
  );
}

export default SearchBar;