export interface Login {
    email: string;
    password: string;
}

export interface Register {
    msg:  string;
    data: DataRegister;
}

export interface DataRegister {
    roleName:    any;
    accountsID:  number;
    fullName:    string;
    email:       string;
    password:    string;
    phoneNumber: string;
    image:       string;
    roleID:      number;
    role:        null;
    id : any
}

export interface RegisterInput {
    fullname: string;
     email: string; 
     password: string; 
     phonenumber: string;
     filefrom: string;
}


