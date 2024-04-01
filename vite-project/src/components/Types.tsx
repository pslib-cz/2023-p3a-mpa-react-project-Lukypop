type SHEEP = {
    FieldId: number;
    type: "SHEEP";

    name: string;
    waitTime: number; //pokud se s ovcí něco stane tak nějaký čas nepřináší peníze
    price: number;
    rent: number; 
    racingLevel: number; //domečky
    color: string; //color of the field
};

type TAX = { 
    FieldId: number;
    type: "TAX";

    name: string;
    price: number;
};

type PIMP = { //je to jako nádraží ale pasák
    FieldId: number;
    type: "PIMP";

    name: string;
    price: number;
    rent: number;
};

type CHANCE = {
    FieldId: number;
    type: "CHANCE";

    name: string;
    chanceId: number;
};
type START = {
    FieldId: number;
    type: "START";

    name: string;
};
type TATRY = {
    FieldId: number;
    type: "TATRY";

    name: string;
};
type TAVERN = { //pošle hráče na náhodné pole, protože se opil :(
    FieldId: number;
    type: "TAVERN";

    name: string;
};
type FREE_PARKING = {
    FieldId: number;
    type: "FREE_PARKING";

    name: string;
};




export type Field = SHEEP | TAX | PIMP | CHANCE | START | TATRY | TAVERN | FREE_PARKING ;
