import { UserEntity } from './user.entity';
import { WcAddressEntity } from './wc-address.entity';

export class WcCustomerEntity {
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
    public declare address: WcAddressEntity;
    public declare user: UserEntity;
}
