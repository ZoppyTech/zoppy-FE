import { WcCustomerEntity } from './wc-customer.entity';

export class WcAddressEntity {
    public declare id: string;
    public declare firstName: string;
    public declare lastName: string;
    public declare companyName: string;
    public declare address1: string;
    public declare address2: string;
    public declare city: string;
    public declare state: string;
    public declare postcode: string;
    public declare country: string;
    public declare email: string;
    public declare phone: string;
    public declare birthDate: Date;
    public declare gender: string;
    public declare latitude: number;
    public declare longitude: number;
    public declare createdAt: Date;
    public declare updatedAt: Date;
    public declare deletedAt: Date;
    public declare companyId: string;
}
