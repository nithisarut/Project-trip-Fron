export interface AddMultipleLocations {
    msg:  string;
    data: Data;
}

export interface Data {
    id:         number;
    locationID: number;
    location:   Location;
    tripID:     number;
    trip:       Trip;
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

export interface Trip {
    id:            number;
    tripName:      string;
    detail:        string;
    amount:        number;
    price:         number;
    dateTimeStart: Date;
    dateTimeEnd:   Date;
    imageTrip:     string;
    statusID:      number;
    status:        null;
    vehicleID:     number;
    vehicle:       null;
}
