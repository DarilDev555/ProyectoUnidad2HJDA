export interface Usuario{
    gender: string;
    name: {
        title: string;
        first: string;
        last: string;
    };
    location: {
        city: string;
        state: string;
        country: string;
        postcode: number;
    };
    email: string;
    login: {
        username: string;
        password: string;
    };
    dob: {
        date: string;
        age: number;
    };
    registered: {
        date: string;
        age: number;
    };
    phone: string;
    cell: string;
    picture: {
        large: string;
        medium: string;
        thumbnail: string;
    };
    nat: string ;
    // AU, BR, CA, CH, DE, DK, ES, FI, 
    // FR, GB, IE, IN, IR, MX, NL, NO,
    //  NZ, RS, TR, UA, US
}