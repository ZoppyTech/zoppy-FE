export interface CrmAddressRequest {
    id?: string;
    wcId?: number;
    firstName?: string;
    lastName?: string;
    companyName?: string;
    address1?: string;
    address2?: string;
    city?: string;
    state?: string;
    postcode?: string;
    country?: string;
    email?: string;
    phone?: string;
    birthDate?: Date;
    gender?: string;
}
