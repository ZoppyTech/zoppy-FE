import { ZoppyFilter } from '../../filter';
import { ViewCustomerEntity } from '../../entities/view-customer.entity';

export class RfmRequest extends ZoppyFilter<ViewCustomerEntity> {
    public declare position: string;
    public declare startPeriod: Date;
    public declare finishPeriod: Date;
}
