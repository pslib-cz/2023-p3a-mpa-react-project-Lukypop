export enum Shape {
    Circle = 'CIRCLE',
    Square = 'SQUARE',
    Triangle = 'TRIANGLE',  
    Star = 'STAR',
    Diamond = 'DIAMOND', 
    Heart = 'HEART'
}
export type PassagerType = {
    type: Shape;
    image: string;
}