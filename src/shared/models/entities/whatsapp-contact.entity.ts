import { UserEntity } from './user.entity';

export class WhatsappContactEntity {
    public declare id: string;
    public declare firstName: string;
    public declare lastName: string;
    public declare countryCode: string;
    public declare subdivisionCode: string;
    public declare phone: string;
    public declare isBlocked: boolean;
    public declare gdprTermsSentAt: Date;
    public declare createdAt: Date;
    public declare updatedAt: Date;
    public declare deletedAt: Date;
    public declare companyId: string;
    public declare Address?: WppAddressEntity;
}

export class WppAddressEntity {
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
    public declare Customer?: WppCustomerEntity;
}

export class WppCustomerEntity {
    public declare id: string;
    public declare wcId: number;
    public declare email: string;
    public declare firstName: string;
    public declare lastName: string;
    public declare username: string;
    public declare avatarUrl: string;
    public declare totalSpent: number;
    public declare createdAt: Date;
    public declare updatedAt: Date;
    public declare deletedAt: Date;
    public declare companyId: string;
    public declare billingId: string;
    public declare shippingId: string;
    public declare recency: number;
    public declare frequency: number;
    public declare amount: number;
    public declare position: string;
    public declare user?: UserEntity;
}
