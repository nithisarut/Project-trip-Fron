export interface Car {
    data: Datum[];
}

export interface Datum {
    vehicleID:           number;
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
