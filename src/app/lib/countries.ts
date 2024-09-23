
export interface Country {
    name: string;
    code: string;
    grades: Array<Grade>;
}

export interface Grade {
    grade: string;
    index: string;
}

export const COUNTRIES: Country[] = [
    { name: 'France', 
      code: 'FR', 
      grades: [
        {grade: "20 - 16", index: "A"}, 
        {grade: "16 - 14", index: "B"}, 
        {grade: "14-12", index: "C"} ,
        {grade: "12-10", index: "D"},
        {grade: "12-10", index: "E"}
        ]
    },

    { name: 'Spain', 
      code: 'ES', 
      grades: [
        {grade: "10 - 9.00", index: "A"}, 
        {grade: "8.99 - 8.00", index: "B"}, 
        {grade: "7.99 - 7.00", index: "C"}, 
        {grade: "6.99 - 6.00", index: "D"}, 
        {grade: "5.99 - 5.00", index: "E"}] 
    },

    { name: 'Slovenia', 
        code: 'SI',  
        grades: [
            {grade: "5", index: "A"}, 
            {grade: "4", index: "B"}, 
            {grade: "3", index: "C"},
            {grade: "2", index: "D"},
            {grade: "1", index: "E"}] 
        },
    
    { name: 'Ireland', 
        code: 'IE',  
        grades: [
            {grade: "First Class Honours / (100% or 70%)", index: "A"}, 
            {grade: "Upper Second Class Honours / (60% - 69%)", index: "B"}, 
            {grade: "Lower Second Class Honours / (50% - 59%)", index: "C"},
            {grade: "Third Class Honours / (45% - 49%)", index: "D"},
            {grade: "Compensating Fail / (40% - 44%)", index: "E"}] 
        },
    
        { name: 'Denmark', 
            code: 'DK',  
            grades: [
                {grade: "12", index: "A"}, 
                {grade: "10", index: "B"}, 
                {grade: "7", index: "C"},
                {grade: "4", index: "D"},
                {grade: "2", index: "E"}] 
            }
];