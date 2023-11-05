import { OrderStatus } from "./OrderTrip";

export interface Payment {

    Image: any;
    status: boolean;
    OrDerTripId: number;

}


export interface PaymentUpdate {
    id: number;
    orderStatus: OrderStatus;
    status: boolean;
    orderId : number;

}


