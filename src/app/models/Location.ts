export interface LocationTrip {
    data: Datum[];
}

export interface Datum {
    id:any;
    typeName: any;
    locationID:   number;
    locationName: string;
    details:      string;
    district:     string;
    subDistrict:  string;
    image:        string;
    typeID:       number;
    type:         null;
}
