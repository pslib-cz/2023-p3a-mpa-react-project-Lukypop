export interface IFieldType {
    FieldId: number,
    type: string,
    x: number,
    y: number
}
export interface SHEEP extends IFieldType {
    type: "SHEEP",

    name: string,
    waitTime: number;
    price: number;
    rent: number; 
    racingLevel: number; 
    color: string; 
};

export interface TAX extends IFieldType { 
    type: "TAX";

    name: string;
    price: number;
};

export interface PIMP extends IFieldType { //je to jako nádraží ale pasák
    FieldId: number;
    type: "PIMP";

    name: string;
    price: number;
    rent: number;
};

export interface CHANCE extends IFieldType {
    FieldId: number;
    type: "CHANCE";

    name: string;
};
export interface START extends IFieldType {
    FieldId: number;
    type: "START";

    name: string;
};
export interface TATRY extends IFieldType {
    FieldId: number;
    type: "TATRY";

    name: string;
};
export interface TAVERN extends IFieldType  { //pošle hráče na náhodné pole, protože se opil :(
    FieldId: number;
    type: "TAVERN";

    name: string;
};
export interface FREE_PARKING extends IFieldType  {
    FieldId: number;
    type: "FREE_PARKING";

    name: string;
};

export type GameState = {
    gameRunning: boolean,
    fields: FieldType[];
    players: Player[];
    startMoney: number;
    moneyPerRound: number;
};   
export type Player = {
    playerId: number;
    name: string;
    money: number;
    position: number;
    color: PlayerColor;
};

export enum PlayerColor {
    GREEN = "GREEN",
    RED = "RED",
    BLUE = "BLUE",
    YELLOW = "YELLOW"
}




export type FieldType = SHEEP | TAX | PIMP | CHANCE | START | TATRY | TAVERN | FREE_PARKING ;
