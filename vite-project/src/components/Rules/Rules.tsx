import { Link } from "react-router-dom";
import ShowMore from "./ShowMore";
import { useState } from "react";
const Rules = () => {
    const [showMore, setShowMore] = useState(false);
  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <h1>Pravidla</h1>
        <div style={{ width: "550px" }}>
          <h2>Stručný popis</h2>
          <p>
            Tato hra se odehrává v dalekých Tatrách, kde jsou podmínky opravdu
            velmi nepříznivé. Pasáci se sice většinou mají rádi, avšak večer se
            samo jídlo na stůl nepřinese a nezaplatí. Tvým úkolem je nakoupit za
            své peníze ovce, kterými naprosto zdemovovat a zařídit bankrot svým
            protihráčům nehledě na to, co jsou zač.
          </p>
          <h2>Pravidla</h2>
          <p>
            Kdo je na řadě (šedě zvýrazněno na pravé straně), hodí kostkou a
            posune se dopředu ve směru hodinových ručiček. Políčko, které hráč
            obsadil určuje, co hráč musí udělat. Dvě i více figurek může být
            současně na stejném políčku. Podle políčka, které hráč obsadil, může
            mít jednu z následujících možností:
            <ul>
              <li>Zakoupit ovci</li>
              <li>Vylepšit vaší již zakoupenou ovci</li>
              <li>Zaplatit nájem za cizí ovci</li>
              <li>Bezplatně se procházet po pasece</li>
              <li>Zaplatit daně</li>
              <li>Zkusit štestí na šanci</li>
              <li>Opít se v hospodě</li>
              <li>Zařídit zmizení ovce</li>
            </ul>
          </p>
        </div>

        <button style={{ width: "160px", marginBottom: '.5em' }}>
          <Link
            style={{ textDecoration: "none", color: "white" }}
            to="/Settings"
          >
            Nastavení
          </Link>
        </button>
        {showMore ? <button style={{ width: "160px" }} onClick={() => {setShowMore(false)}}>Zbytek pravidel</button> : <div><button style={{ width: "160px" }} onClick={() => {setShowMore(true)}}>Skrýt zbytek</button><ShowMore/></div>}
      </div>
    </>
  );
};
export default Rules;
