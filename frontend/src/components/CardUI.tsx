type Props = {
  cards: string[];
};

function CardUI({ cards }: Props) {
  return (
    <div>
      {cards.length === 0 ? (
        <p>No cards yet</p>
      ) : (
        cards.map((c, i) => <p key={i}>{c}</p>)
      )}
    </div>
  );
}

export default CardUI;