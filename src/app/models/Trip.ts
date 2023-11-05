import { number } from "yup";





export interface Trip {
    data: DatumTrip[];
}

export interface DatumTrip {
    id:                   number;
    tripName:             string;
    detail:               string;
    amount:               number;
    price:                number;
    dateTimeStart:        Date;
    dateTimeEnd:          Date;
    imageTrip:            string;
    file:                 string;
    classTripId:          number;
    classTrip:            ClassTrip;
    typeID:               number;
    type:                 null;
    vehicleID:            number;
    vehicle:              Vehicle;
    addMultipleLocations: AddMultipleLocation[];
}

export interface AddMultipleLocation {
    id:         number;
    locationID: number;
    location:   Location;
    tripID:     number;
    trip:       null;
}

export interface Location {
    id:           number;
    locationName: string;
    details:      string;
    district:     string;
    subDistrict:  string;
    image:        string;
    typeID:       number;
    type:         null;
}

export interface ClassTrip {
    id:   number;
    name: string;
}

export interface Vehicle {
    id:                  number;
    vehicleName:         string;
    tel:                 string;
    vehicleRegistration: string;
    company:             string;
    driverName:          string;
    numberOFSeats:       number;
    status:              boolean;
    imageDriver:         string;
    imageVehicle:        string;
}


export interface TripParams{
    classId: number;
}