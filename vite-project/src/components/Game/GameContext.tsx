import { GameState, PlayerColor } from "../Types";
import React, { createContext, useReducer, PropsWithChildren } from "react";
import fields from "../Data";

export interface GameContextProps {
  state: GameState;
  dispatch: React.Dispatch<ReducerAction>;
}
const defaultGameState: GameState = {
  currentPlayer: 0,
  gameRunning: false,
  startMoney: 2000,
  moneyPerRound: 250,
  fields: fields,
  playerDone: false,
  playerRolled: false,
  message: "",
  
  players: [
    {
      playerId: 0,
      name: "Player 0",
      money: 2000,
      position: 0,
      color: PlayerColor.RED,
    },
  ],
};

type ReducerAction =
  | { type: "START_GAME" }
  | { type: "END_GAME" }
  | { type: "ADD_PLAYER"; name: string; id: number }
  | { type: "EDIT_PLAYER"; name: string; id: number }
  | { type: "REMOVE_PLAYER"; id: number }
  | { type: "CHANGE_START_MONEY"; startMoney: number }
  | { type: "CHANGE_MONEY_PER_ROUND"; moneyPerRound: number }
  | { type: "NEXT_PLAYER" }
  | { type: "ROLL_DICE" }
  | { type: "BUY_FIELD"; playerId: number; fieldId: number }
  | { type: "UPGRADE_FIELD"; playerId: number; fieldId: number }
  | { type: "PAY_RENT"; playerId: number; fieldId: number }
  | { type: "TAX"; playerId: number; fieldId: number }
  | { type: "TAVERN"; playerId: number; fieldId: number }
  | { type: "LOAD"; newState: GameState }
  | { type: "TATRY"; playerId: number; fieldId: number }
  | { type: "BANKROT"; playerId: number }
  | { type: "CHANCE"; playerId: number; fieldId: number };

const gameReducer = (state: GameState, action: ReducerAction): GameState => {
  const colors = ["RED", "GREEN", "YELLOW", "BLUE"] as PlayerColor[];

  switch (action.type) {
    case "ADD_PLAYER":
      const color = colors[state.players.length];
      return {
        ...state,
        players: [
          ...state.players,
          {
            playerId: action.id,
            name: action.name,
            money: state.startMoney,
            position: 0,
            color: color,
          },
        ],
      };
    case "EDIT_PLAYER":
      return {
        ...state,
        players: state.players.map((player) => {
          if (player.playerId === action.id) {
            return {
              ...player,
              name: action.name,
            };
          }
          return player;
        }),
      };
    case "REMOVE_PLAYER":
      return {
        ...state,
        players: state.players.filter(
          (player) => player.playerId !== action.id
        ),
      };
    case "CHANGE_START_MONEY":
      return {
        ...state,
        players: state.players.map((player) => {
          return {
            ...player,
            money: action.startMoney,
          };
        }),
        startMoney: action.startMoney,
      };
    case "CHANGE_MONEY_PER_ROUND":
      return {
        ...state,
        moneyPerRound: action.moneyPerRound,
      };

    case "LOAD":
      return action.newState;

    case "START_GAME":
      return {
        ...state,
        gameRunning: true,
      };
    case "END_GAME":
      return state; //TODO//////////////////////////////////////////////////////////////////////////////////////////////////
    case "NEXT_PLAYER":
      if (
        state.fields.find(
          (field) =>
            field.FieldId ===
            state.players.find((p) => p.playerId === state.currentPlayer)
              ?.position
        )?.type === "TAVERN"
      ) {
        return state;
      }

      return {
        ...state,
        message: "",	
        playerDone: false,
        playerRolled: false,
        currentPlayer: (state.currentPlayer + 1) % state.players.length,
      };
    case "BUY_FIELD":
      if (state.playerDone) {
        return state;
      }
      const field = state.fields.find(
        (field) => field.FieldId === action.fieldId
      );
      const player = state.players.find(
        (player) => player.playerId === action.playerId
      );
      if (field === undefined || player === undefined) {
        return state;
      }
      if (field.type !== "SHEEP") {
        return state;
      }

      return {
        ...state,
        playerDone: true,
        players: state.players.map((player) => {
          if (player.playerId === action.playerId) {
            return {
              ...player,

              money: player.money - field.price,
            };
          }
          return player;
        }),
        fields: state.fields.map((field) => {
          if (field.FieldId === action.fieldId) {
            return {
              ...field,
              ownership: player.playerId,
            };
          }
          return field;
        }),
      };
    case "UPGRADE_FIELD":
      if (state.playerDone) {
        return state;
      }
      const field2 = state.fields.find(
        (field) => field.FieldId === action.fieldId
      );
      const player2 = state.players.find(
        (player) => player.playerId === action.playerId
      );
      if (field2?.type !== "SHEEP") {
        return state;
      }

      if (
        field2 === undefined ||
        player2 === undefined ||
        player2.money < field2.price
      ) {
        return state;
      }

      return {
        ...state,
        playerDone: true,
        players: state.players.map((player) => {
          if (player.playerId === action.playerId) {
            return {
              ...player,
              money: player.money - field2.price,
            };
          }
          return player;
        }),
        fields: state.fields.map((field) => {
          if (field.FieldId === action.fieldId) {
            return {
              ...field,
              multiplayer: field2.multiplayer + 1,
            };
          }
          return field;
        }),
      };
    case "PAY_RENT":
      if (state.playerDone) {
        return state;
      }
      const field1 = state.fields.find(
        (field) => field.FieldId === action.fieldId
      );
      const player1 = state.players.find(
        (player) => player.playerId === action.playerId
      );
      if (field1 === undefined || player1 === undefined) {
        return state;
      }
      if (field1.type !== "SHEEP") {
        return state;
      }
      const owner = state.players.find(
        (player) => player.playerId === field1?.ownership
      );
      if (owner === undefined) {
        return state;
      }
      return {
        ...state,
        playerDone: true,

        players: state.players.map((player) => {
          if (player.playerId === action.playerId) {
            return {
              ...player,
              money: player.money - field1.rent * field1.multiplayer,
            };
          }
          if (player.playerId === owner.playerId) {
            return {
              ...player,
              money: player.money + field1.rent * field1.multiplayer,
            };
          }
          return player;
        }),
      };
    case "ROLL_DICE":
      const diceRoll =
        Math.floor(Math.random() * 6) + 1 + (Math.floor(Math.random() * 6) + 1);
      return {
        ...state,
        playerRolled: true,
        players: state.players.map((player) => {
          if (player.playerId === state.currentPlayer) {
            return {
              ...player,
              position: (player.position + diceRoll) % 36,
              money:
                player.money +
                (player.position + diceRoll >= 36 ? state.moneyPerRound : 0),
            };
          }
          return player;
        }),
      };
    case "TAX":
      if (state.playerDone) {
        return state;
      }
      const field3 = state.fields.find(
        (field) => field.FieldId === action.fieldId
      );
      const player3 = state.players.find(
        (player) => player.playerId === action.playerId
      );

      if (field3 === undefined || player3 === undefined) {
        return state;
      }

      if (field3.type !== "TAX") {
        return state;
      }
      return {
        ...state,
        playerDone: true,
        players: state.players.map((player) => {
          if (player.playerId === action.playerId) {
            return {
              ...player,
              money: player.money - field3.price,
            };
          }
          return player;
        }),
      };
    case "TAVERN":
      if (state.playerDone) {
        return state;
      }
      const field4 = state.fields.find(
        (field) => field.FieldId === action.fieldId
      );
      const player4 = state.players.find(
        (player) => player.playerId === action.playerId
      );

      if (field4 === undefined || player4 === undefined) {
        return state;
      }

      if (field4.type !== "TAVERN") {
        return state;
      }
      return {
        ...state,
        message: `Hráč ${player4.name} se opil a probudil se na náhodném poli!`,
        players: state.players.map((player) => {
          if (player.playerId === action.playerId) {
            return {
              ...player,
              position: Math.floor(Math.random() * 36),
            };
          }
          return player;
        }),
      };
    case "TATRY":
      if (state.playerDone) {
        return state;
      }
      const field5 = state.fields.find(
        (field) => field.FieldId === action.fieldId
      );
      const player5 = state.players.find(
        (player) => player.playerId === action.playerId
      );

      if (field5 === undefined || player5 === undefined) {
        return state;
      }

      if (field5.type !== "TATRY") {
        return state;
      }
      const ownedfields = state.fields.filter(
        (field) => field.type === "SHEEP" && field.ownership != null
      );
      const randomField =
        ownedfields[Math.floor(Math.random() * ownedfields.length)];
      if (randomField === undefined) {
        return {
          ...state,
          message: `Není žádná ovce, která by se mohla propadnout státu!`,
        };
      }
      return {
        ...state,
        message: `V Tatrách se ztratil(a) ${randomField.name}! Ať ti je země lehká...`,
        fields: state.fields.map((field) => {
          if (field.FieldId === randomField.FieldId) {
            return {
              ...field,
              ownership: null,
              timesUpgraded: 0,
              multiplayer: 1,
            };
          }
          return field;
        }),
        playerDone: true,
      };
    case "BANKROT":
      return {
        ...state,
        message: `Hráč ${
          state.players.find((p) => p.playerId === action.playerId)?.name
        } je na mizině!`,
        fields: state.fields.map((field) => {
          if (field.type == "SHEEP" && field.ownership === action.playerId) {
            return {
              ...field,
              ownership: null,
              timesUpgraded: 0,
              multiplayer: 1,
            };
          }
          return field;
        }),
        players: state.players.filter(
          (player) => player.playerId !== action.playerId
        ),
      };
    case "CHANCE":
      if (state.playerDone) {
        return state;
      }
      
      const player6 = state.players.find(
        (player) => player.playerId === action.playerId
      );
      const chanceCards = 16;
      switch (Math.floor(Math.random() * chanceCards)) {
        case 0:
          return {
            ...state,
            message: `Hráč ${player6?.name} našel 100 korun!`,
            players: state.players.map((player) => {
              if (player.playerId === action.playerId) {
                return {
                  ...player,
                  money: player.money + 100,
                };
              }
              return player;
            }),
            playerDone: true,
          };
        case 1:
          //přemístí hráče do hospody
          return {
            ...state,
            message: `Hráč ${player6?.name} se opil a probudil se na náhodném poli!`,
            players: state.players.map((player) => {
              if (player.playerId === action.playerId) {
                return {
                  ...player,
                  position: Math.floor(Math.random() * 36),
                };
              }
              return player;
            }),
            playerDone: true,
          };
        case 2:
          //přemístí hráče na start
          return {
            ...state,
            message: `Hráč ${player6?.name} se vrátil na start!`,
            players: state.players.map((player) => {
              if (player.playerId === action.playerId) {
                return {
                  ...player,
                  position: 0,
                };
              }
              return player;
            }),
            playerDone: true,
          };
        case 3:
          //hráč prohrál peníze na tipáči ačkoliv to byla tutovka -300
          return {
            ...state,
            message: `Hráč ${player6?.name} prohrál 300 korun na tipáči! (Byla to však tutovka!)`,
            players: state.players.map((player) => {
              if (player.playerId === action.playerId) {
                return {
                  ...player,
                  money: player.money - 300,
                };
              }
              return player;
            }),
            playerDone: true,
          };
        case 4:
          //stát ti zabavil ovci, odeber ovci z contextu která má hráčuv ownerhip
          const ownedfields1 = state.fields.filter(
            (field) => field.type === "SHEEP" && field.ownership != null
          );
          const randomField2 =
            ownedfields1[Math.floor(Math.random() * ownedfields1.length)];
          if (randomField2 === undefined) {
            return {
              ...state,
              message: `Není žádná ovce, která by se mohla propadnout státu!`,
            };
          }
          return {
            ...state,
            message: `Stát ti zabavil ${randomField2.name}!`,
            fields: state.fields.map((field) => {
              if (field.FieldId === randomField2.FieldId) {
                return {
                  ...field,
                  ownership: null,
                  timesUpgraded: 0,
                  multiplayer: 1,
                };
              }
              return field;
            }),
            playerDone: true,
          };
        case 5:
          //chábr v hospodě ti opil ovci - 1 vylepšení , pokud ovce nemá upgrade vypiš: JMÉNO-OVCE se opila úplně na plech naštesí u ní nebylo co ztratit (vylepšení)
          const ownedfields2 = state.fields.filter(
            (field) => field.type === "SHEEP" && field.ownership != null
          );
          const randomField3 =
            ownedfields2[Math.floor(Math.random() * ownedfields2.length)];
          if (randomField3 === undefined) {
            return {
              ...state,
              message: `Není žádná ovce, kterou by ti mohl chábros v hospodě nalejt!`,
            };
          }
          if (randomField3.type !== "SHEEP") {
            return state;
          }

          if (randomField3.timesUpgraded > 0) {
            return {
              ...state,
              message: `Chábr v hospodě ti opil ovečku ${randomField3.name}!`,
              fields: state.fields.map((field) => {
                if (field.FieldId === randomField3.FieldId) {
                  return {
                    ...field,
                    timesUpgraded: randomField3.timesUpgraded - 1,
                  };
                }
                return field;
              }),
              playerDone: true,
            };
          }

          if (randomField3.timesUpgraded === 0) {
            return {
              ...state,
              message: `${randomField3.name} se opila úplně na plech, naštěstí u ní nebylo co ztratit!`,
              playerDone: true,
            };
          } else {
            return state;
          }
        case 6:
          //přijel finančák a zkontroloval ti účet, pokud máš víc jak 500 korun, odeber 500 korun
          return {
            ...state,
            message: `Finančák ti zkontroloval účet! (Pokud máš víc jak 500 korun, rozluč se s 500 korunama!)`,
            players: state.players.map((player) => {
              if (player.playerId === action.playerId && player.money > 500) {
                return {
                  ...player,
                  money: player.money - 500,
                };
              }
              return player;
            }),
            playerDone: true,
          };
        case 7:
          //bačo ti splatil dlouhodbý dluh 150 korun
          return {
            ...state,
            message: `Bačo ti splatil dlouhodbý dluh 150 korun!`,
            players: state.players.map((player) => {
              if (player.playerId === action.playerId) {
                return {
                  ...player,
                  money: player.money + 150,
                };
              }
              return player;
            }),
            playerDone: true,
          };
        case 8: //dostal jsi příspěvek z fondu na slovenské metro 300 korun
          return {
            ...state,
            message: `Dostal jsi příspěvek z fondu na slovenské metro 300 korun!`,
            players: state.players.map((player) => {
              if (player.playerId === action.playerId) {
                return {
                  ...player,
                  money: player.money + 300,
                };
              }
              return player;
            }),
            playerDone: true,
          };
        case 9: //vyhrál jsi v soutěži o nejlepšího pastevce 50 korun
          return {
            ...state,
            message: `Vyhrál jsi v soutěži o nejlepšího pastevce 50 korun!`,
            players: state.players.map((player) => {
              if (player.playerId === action.playerId) {
                return {
                  ...player,
                  money: player.money + 50,
                };
              }
              return player;
            }),
            playerDone: true,
          };
        case 10: //tutovka padla na tipáči, vyhrál jsi 500 korun, ale připíše se ti jenom 150 (zbytek jsi pozval kluky na pivko)
          return {
            ...state,
            message: `Tutovka padla na tipáči, vyhrál jsi 150 korun!`,
            players: state.players.map((player) => {
              if (player.playerId === action.playerId) {
                return {
                  ...player,
                  money: player.money + 150,
                };
              }
              return player;
            }),
            playerDone: true,
          };
        case 11: //dostal jsi dárek od babičky 50 korun
          return {
            ...state,
            message: `Dostal jsi dárek od babičky 50 korun!`,
            players: state.players.map((player) => {
              if (player.playerId === action.playerId) {
                return {
                  ...player,
                  money: player.money + 50,
                };
              }
              return player;
            }),
            playerDone: true,
          };
        case 12: //koupil jsi pochybné akcie za 250 korun, ale zjistil jsi, že jsou falešné
          return {
            ...state,
            message: `Koupil jsi pochybné akcie za 250 korun, ale zjistil jsi, že jsou falešné!`,
            players: state.players.map((player) => {
              if (player.playerId === action.playerId) {
                return {
                  ...player,
                  money: player.money - 250,
                };
              }
              return player;
            }),
            playerDone: true,
          };
        case 13: //dostal jsi dědictví 400 korun
          return {
            ...state,
            message: `Dostal jsi dědictví 400 korun!`,
            players: state.players.map((player) => {
              if (player.playerId === action.playerId) {
                return {
                  ...player,
                  money: player.money + 400,
                };
              }
              return player;
            }),
            playerDone: true,
          };
        case 14: //nechal jsi peměženku na lavičce, našel jsi ji, ale chybí ti 50 korun
          return {
            ...state,
            message: `Nechal jsi peněženku na lavičce, našel jsi ji, ale chybí ti 50 korun!`,
            players: state.players.map((player) => {
              if (player.playerId === action.playerId) {
                return {
                  ...player,
                  money: player.money - 50,
                };
              }
              return player;
            }),
            playerDone: true,
          };
        case 15: //vyhrál jsi v loterii 1000 korun, cítíš se jako kdyby nanjednou svět byl v tvých rukou
          return {
            ...state,
            message: `Vyhrál jsi v loterii 1000 korun, cítíš se jako kdyby najednou svět byl v tvých rukou!`,
            players: state.players.map((player) => {
              if (player.playerId === action.playerId) {
                return {
                  ...player,
                  money: player.money + 1000,
                };
              }
              return player;
            }),
            playerDone: true,
          };
        case 16: //brat ti chce ukázat berana, přemísti se na políčko s FieldId35
          return {
            ...state,
            message: `Brat ti chce ukázat berana, běž ho navštívit !`,
            players: state.players.map((player) => {
              if (player.playerId === action.playerId) {
                return {
                  ...player,
                  position: 35,
                };
              }
              return player;
            }),
            playerDone: true,
         
        };
        default:
            return state;
      }

    default:
        return state;}
}


export const GameContext = createContext<{
  state: GameState;
  dispatch: React.Dispatch<ReducerAction>;
}>({ state: defaultGameState, dispatch: () => {} });

export const GameProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [state, dispatch] = useReducer(gameReducer, defaultGameState);

  return (
    <GameContext.Provider value={{ state, dispatch }}>
      {children}
    </GameContext.Provider>
  );
};
