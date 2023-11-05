import axios, { AxiosError, AxiosResponse } from "axios";

axios.defaults.baseURL = import.meta.env.VITE_APP_BACKEND_URL;


const sleep = () => new Promise(resolve => setTimeout(resolve, 100));

const responseBody = (response: AxiosResponse) => response.data; //ให้ส่งข้อมูลออกไป

axios.interceptors.response.use(async response => {
    if (import.meta.env.NODE_ENV === 'development') await sleep();


    return response
}, (error: AxiosError) => {
    return Promise.reject(error.response) //ส่งไปให้ catch(error) นำไปใช้ได้เลย
});

const createFormData = (item: any) => {
    let formData = new FormData();
    for (const key in item) formData.append(key, item[key]);
    return formData;
};

const requests = {
    get: (url: string) => axios.get(url).then(responseBody),
    post: (url: string, body: {}) => axios.post(url, body).then(responseBody),
    put: (url: string, body: {}) => axios.post(url, body).then(responseBody),
    delete: (url: string) => axios.post(url).then(responseBody),

}

const Account = {
    login: (value: any) => requests.post('Accounts/Login', value),
    register: (value: any) => requests.post('Accounts/RegisterAccount', value),
    getAccountId: (id: any) => requests.get(`Accounts/GetAccountByID/${id}`),
    getAccount: () => requests.get('Accounts/GetAccount'),
    updateAccount: (value: any, id: any) => requests.post(`Accounts/UpdateAccount?id=${id}`, createFormData(value)),
    
};
const Trip = {
    createtrip: (value: any) => {

        let formData = new FormData();
        for (const key in value) key !== "Location" && formData.append(key, value[key]);
        for (let i = 0; i < value.Location.length; i++) formData.append("Location", value.Location[i]);
        return requests.post('Trips', formData)

    },
    details: (id: any) => requests.get(`Trips/${id}`),
    gettrip: (params : any) => requests.get(`Trips/GetTrip?ClassTripId=${params.classId}`),
    getNewtrip: () => requests.get('Trips/GetTripNew'),
    deleteTrip: (id: any) => requests.post(`Trips/DeleteTrip?id=${id}`,{}),
    updateTrip: (body: any) => requests.post('/Trips/putUpdateTrip', createFormData(body))
};

const Car = {
    createCar: (value: any) => requests.post('Vehicles/AddVehicle', createFormData(value)),
    getcar: () => requests.get('Vehicles/GetVehicle'),
    detailscar: (id: any) => requests.get(`Vehicles/${id}`),
    deleteCar: (id: any) => requests.post(`Vehicles/DeleteVehicle?id=${id}`,{}),
    updateCar: (value: any) =>
        requests.post('Vehicles/UpdateVehiclet', createFormData(value))

};

const Type = {
    getType: () => requests.get('Types/GetAllType')
}

const Location = {
    createLocation: (value: any) => requests.post('Locations/AddLocation', createFormData(value)),
    getlocation: (search = "") =>
        requests.get(`Locations/GetLocationWiteType?searchName=${search}`),

    detailslocation: (id: any) => requests.get(`Locations/${id}`),
    deleteLocation: (id: any) => requests.post(`Locations/DeleteLocation?id=${id}`,{}),
    updateLocation: (value: any) => requests.post('Locations/UpdateLocation', createFormData(value))
};

const Role = {
    getbyrole: (id: any) => requests.get(`Roles/${id}`)
}

const ClassTrip = {
    getClassTrip: () => requests.get('ClassTrip/GetClassTrip')
}


const AddMultipleLocations = {
    getAddMultipleLocations: (id: any) => requests.get(`AddMultipleLocationsService/${id}`)
}


const OrderTrip = {
    createOrderTrip: (value: any) => requests.post('OrderTrips', createFormData(value)),
    getByIdOrderAccount: (id: any) => requests.get(`OrderTrips/GetByIdOrderAccount/${id}`)
}

const Images = {
    getByIdImages: (id: any) => requests.get(`Images/${id}`),
    createImages: (value: any) =>{
        let formData = new FormData();
        for (const key in value.ImageSum) formData.append("ImageSum", value.ImageSum[key]);
        formData.append("LocationId", value.LocationId);
        return requests.post('Images/AddImage', formData);
    },
}

const Payment = {
    createPayment : (value: any) => requests.post('Payment/AddPayment', createFormData(value)),
    getPayment : () => requests.get('Payment/GetPayment'),
    updatePayment : (value: any) => requests.post('Payment/UpdatePayment', createFormData(value)),
    deletePayment : (id: any) => requests.post(`Payment/DeletePayment?id=${id}`,{}),
}

const Report = {
    getReport: (date?: any) => {
        console.log(date)
        if (date)
            return requests.get(`Report/GetReport?dateStart=${date.start}&dateEnd=${date.end}`);
        return requests.get(`Report/GetReport`);
        
    }
}


const agent = {
    Account,
    Trip,
    Car,
    Location,
    Role,
    Type,
    AddMultipleLocations,
    ClassTrip,
    OrderTrip,
    Images,
    Payment,
    Report,
};

export default agent;
