import { WcAddressEntity } from '../../entities/wc-address.entity';
import { WcCustomerEntity } from '../../entities/wc-customer.entity';
import { ReportCustomerResponse } from '../reports/report-customer..response';

export class SocialMediaMatrixRfmResponse extends ReportCustomerResponse {
    public declare lastInteractionDate: Date;
    public declare customerId: string;
    public declare addressId: string;
    public declare customer: WcCustomerEntity;
    public declare address: WcAddressEntity;
    public declare loading?: boolean;
}
