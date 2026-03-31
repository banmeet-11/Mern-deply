import { useState } from "react";

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

function AddCard() {
  const [card, setCard] = useState("");

  async function doAddCard() {
    const obj = { card: card };

    const js = JSON.stringify(obj);

    try {
      const response = await fetch(buildPath('api/addcard'), {
        method: "POST",
        body: js,
        headers: { "Content-Type": "application/json" },
      });

      const res = await response.json();

      console.log(res);
    } catch (e: any) {
      alert(e.toString());
    }
  }

  return (
    <div>
      <input
        placeholder="Add Card"
        value={card}
        onChange={(e) => setCard(e.target.value)}
      />
      <button onClick={doAddCard}>Add</button>
    </div>
  );
}

export default AddCard;