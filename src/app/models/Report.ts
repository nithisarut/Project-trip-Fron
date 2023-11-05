

export interface ReportData {
    totalPrice: number;
    trip:       Trip[];
}

export interface Trip {
    percent:  number;
    price:    number;
    fullTime: Date;
    day:      number;
    month:    number;
    year:     number;
}
