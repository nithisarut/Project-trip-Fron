export interface OrderRequest {
    id:           number;
    name:         string;
    tel:          string;
    contactTime:  Date | null;
    amountAdult:  number;
    amountKid:    number;
    total:        number;
    singleStay:   number;
    stay2Persons: number;
    stay3Persons: number;
    accountsId:   number;
    tripId:       number;
    trip:         Trip | null;
    orderStatus : OrderStatus 
}

export interface Trip {
    id:            number;
    tripName:      string;
    detail:        string;
    amount:        number;
    price:         number;
    file:          string;
    dateTimeStart: Date;
    dateTimeEnd:   Date;
    imageTrip:     string;
    vehicleID:     number;
    vehicle:       null;
    classTripId:   number;
    classTrip:     null;
}

export enum  OrderStatus {
    WaitingForPayment ,
    PendingApproval,
    SuccessfulPayment,

  }