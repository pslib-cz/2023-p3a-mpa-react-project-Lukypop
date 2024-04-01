export type SHEEP = {
    FieldId: number;
    type: "SHEEP";

    name: string;
    waitTime: number; //pokud se s ovcí něco stane tak nějaký čas nepřináší peníze
    price: number;
    rent: number; 
    racingLevel: number; //domečky
    color: string; //color of the field
};

export type TAX = { 
    FieldId: number;
    type: "TAX";

    name: string;
    price: number;
};

export type PIMP = { //je to jako nádraží ale pasák
    FieldId: number;
    type: "PIMP";

    name: string;
    price: number;
    rent: number;
};

export type CHANCE = {
    FieldId: number;
    type: "CHANCE";

    name: string;
};
export type START = {
    FieldId: number;
    type: "START";

    name: string;
};
export type TATRY = {
    FieldId: number;
    type: "TATRY";

    name: string;
};
export type TAVERN = { //pošle hráče na náhodné pole, protože se opil :(
    FieldId: number;
    type: "TAVERN";

    name: string;
};
export type FREE_PARKING = {
    FieldId: number;
    type: "FREE_PARKING";

    name: string;
};




export type FieldType = SHEEP | TAX | PIMP | CHANCE | START | TATRY | TAVERN | FREE_PARKING ;
