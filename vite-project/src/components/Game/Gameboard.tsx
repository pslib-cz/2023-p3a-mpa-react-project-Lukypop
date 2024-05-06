import { cloneElement, useContext } from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { GameContext, GameContextProps } from "./GameContext.tsx";
import Field from "./Field.tsx";
import styles from "./GameBoard.module.css";

const Gameboard = () => {
  const [hamburger, setHamburger] = useState<boolean>(false);
  const context = useContext<GameContextProps>(GameContext);

  const handleDiceRoll = () => {
    if (context.state.playerRolled === true) {
      context.dispatch({ type: "NEXT_PLAYER" });
    } else context.dispatch({ type: "ROLL_DICE" });
  };

  let buttonChoser = <div></div>;
  const currentPlayer = context.state.players.find(
    (b) => b.playerId === context.state.currentPlayer
  );
  if (
    currentPlayer !== undefined &&
    context.state.playerDone === false &&
    context.state.playerRolled === true
  ) {
    const currentPlayerField = context.state.fields.find(
      (a) => a.FieldId === currentPlayer?.position
    );
    if (currentPlayerField && currentPlayerField.type === "TAX") {
      context.dispatch({
        type: "TAX",
        playerId: currentPlayer.playerId,
        fieldId: currentPlayerField.FieldId,
      });
    } else if (currentPlayerField && currentPlayerField.type === "TAVERN") {
      context.state.message = "Když už jseš tady, tak si přece musíš dát alespoň jednu štamprli! (Bez pití neodejdeš!)";
      buttonChoser = (
        <div>
          <button
            style={{ width: "100%", height: "100%" }}
            onClick={() => {
              context.dispatch({
                type: "TAVERN",
                playerId: currentPlayer.playerId,
                fieldId: currentPlayerField.FieldId,
              });
            }}
          >
            Opít se
          </button>
        </div>
      );
    } else if (currentPlayerField && currentPlayerField.type === "TATRY") {
      buttonChoser = (
        <div>
          <button
            style={{ width: "100%", height: "100%" }}
            onClick={() => {
              context.dispatch({
                type: "TATRY",
                playerId: currentPlayer.playerId,
                fieldId: currentPlayerField.FieldId,
              });
            }}
          >
            Zařídit ztrátu
          </button>
        </div>
      );
    } else if (currentPlayerField && currentPlayerField.type === "CHANCE") {
      if (currentPlayerField && currentPlayerField.type === "CHANCE") {
        buttonChoser = (
          <div>
            <button
              style={{ width: "100%", height: "100%" }}
              onClick={() => {
                context.dispatch({
                  type: "CHANCE",
                  playerId: currentPlayer.playerId,
                  fieldId: currentPlayerField.FieldId,
                });
              }}
            >
              Šance
            </button>
          </div>
        );
      }
    } else if (currentPlayerField && currentPlayerField.type === "SHEEP") {
      if (currentPlayerField.ownership === null) {
        if (currentPlayer.money >= currentPlayerField.price) {
          buttonChoser = (
            <div>
              <button
                style={{ width: "100%", height: "100%" }}
                onClick={() => {
                  context.dispatch({
                    type: "BUY_FIELD",
                    playerId: currentPlayer.playerId,
                    fieldId: currentPlayerField.FieldId,
                  });
                }}
              >
                Koupit pole
              </button>
            </div>
          );
        }
      } else if (
        currentPlayerField.ownership === currentPlayer.playerId &&
        currentPlayerField.timesUpgraded < 6
      ) {
        buttonChoser = (
          <div>
            <button
              onClick={() => {
                context.dispatch({
                  type: "UPGRADE_FIELD",
                  playerId: currentPlayer.playerId,
                  fieldId: currentPlayerField.FieldId,
                });
                currentPlayerField.timesUpgraded += 1;
              }}
            >
              Vylepšit pole
            </button>
          </div>
        );
      } else {
        context.dispatch({
          type: "PAY_RENT",
          playerId: currentPlayer.playerId,
          fieldId: currentPlayerField.FieldId,
        });
      }
    } else {
    }
  }
  if (context.state.players.find((a) => a.money < 0)) {
    context.state.players
      .filter((a) => a.money <= 0)
      .map((b) => context.dispatch({ type: "BANKROT", playerId: b.playerId }));
  }
  if (context.state.players.length === 1) {
    context.dispatch({ type: "END_GAME" });
  }

  console.log(context.state);
  return (
    <>
      <div className={styles["page"]}>
        <div className={styles["prices"]}>
          <h4 className={styles["help"]}>NÁPOVĚDA</h4>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <table>
              <thead>
                <tr>
                  <th>Strana</th>
                  <th>Cena</th>
                  <th>Nájem</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1/4</td>
                  <td>100</td>
                  <td>25</td>
                </tr>
                <tr>
                  <td>2/4</td>
                  <td>200</td>
                  <td>50</td>
                </tr>
                <tr>
                  <td>3/4</td>
                  <td>300</td>
                  <td>100</td>
                </tr>
                <tr>
                  <td>4/4</td>
                  <td>400</td>
                  <td>200</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p style={{ textAlign: "center", marginTop: 0 }}>
            Cena nájmu se znásobuje podle počtu vylepšení!{" "}
          </p>
        </div>
        <div className={styles["gameboard"]}>
          {context.state.fields.map((field, index) => {
            const gridSomething = `${field.y} / ${field.x}`;

            return (
              <div id="policko" style={{ gridArea: gridSomething }}>
                <Field
                  key={index}
                  field={field}
                  currentColors={context.state.players
                    .filter((a) => a.position === field.FieldId)
                    .map((b) => b.color)}
                />
              </div>
            );
          })}
          <div style={{ gridArea: "5/7/7/5" }}>
            <button
              style={{ width: "100%", height: "100%" }}
              onClick={handleDiceRoll}
            >
              {context.state.playerRolled ? "PASS TURN" : "ROLL DICE"}
            </button>
          </div>
          <div style={{ gridArea: "9/7/8/5" }}>{buttonChoser}</div>
          <div
            className=""
            style={{
              gridArea: "4/2/5/10",
              textAlign: "center",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <p style={{ width: 400, margin: 0 }}>{context.state.message}</p>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          {context.state.players.map((player) => {
            console.log(player.color);
            if (player.playerId === context.state.currentPlayer) {
              return (
                <div
                  className={styles["playerprofile"]}
                  style={{ backgroundColor: "gray" }}
                >
                  <div
                    style={{
                      backgroundColor: player.color,
                      width: "50px",
                      height: "50px",
                      borderRadius: 50,
                    }}
                  ></div>
                  <div>
                    <p style={{ margin: 0 }}>{player.name}</p>
                    <p style={{ margin: 0 }}>{player.money}</p>
                  </div>
                </div>
              );
            }
            return (
              <div className={styles["playerprofile"]}>
                <div
                  style={{
                    backgroundColor: player.color,
                    width: "50px",
                    height: "50px",
                    borderRadius: 50,
                  }}
                ></div>
                <div>
                  <p style={{ margin: 0 }}>{player.name}</p>
                  <p style={{ margin: 0 }}>{player.money}</p>
                </div>
              </div>
            );
          })}
        </div>

        {hamburger ? (
          <div className={styles["hamburger"]}>
            <div onClick={() => setHamburger(false)}>x</div>
            <div>
              <Link to="/">Zpět</Link>
            </div>
            <div>
              <Link to="/Rules">Pravidla</Link>
            </div>
            <div>
              <Link to="/Settings">Zpět do nastavení</Link>
            </div>
          </div>
        ) : (
          <div
            className={styles["hamburger"]}
            onClick={() => setHamburger(true)}
          >
            ☰
          </div>
        )}
      </div>
    </>
  );
};
export default Gameboard;

/*
                    else if(index > 0 && index < 10 || index > 29) {
                         return(<div className={styles["gameboard--1by2"]}><Field key={index} field={field} currentColors={context.state.players.filter(a => a.position === field.FieldId).map(b => b.color)}/></div>)
                    }      
                    else if(index%2 === 0 && index > 10 && index < 30 || index%2 === 1 && index > 10 && index < 30) {
                        return(<div className={styles["gameboard--2by1"]}><Field key={index} field={field} currentColors={context.state.players.filter(a => a.position === field.FieldId).map(b => b.color)}/></div>)
                    }*/
