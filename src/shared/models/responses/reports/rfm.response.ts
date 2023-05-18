import { ZoppyFilter } from './../../filter';
import { ViewCustomerEntity } from '../../entities/view-customer.entity';

export class RfmResponse {
    public declare grade: RfmGrade;
    public declare customers: ZoppyFilter<ViewCustomerEntity>;
    public declare salesByState: Record<string, number>;
    public declare gender: Gender;
}
export class RfmGrade {
    public declare cantLose: number;
    public declare atRisk: number;
    public declare loyal: number;
    public declare champion: number;
    public declare needAttention: number;
    public declare possibleLoyal: number;
    public declare sleeping: number;
    public declare almostSleeping: number;
    public declare promising: number;
    public declare new: number;
    public declare total: number;
}

export class Gender {
    public declare male: number;
    public declare female: number;
    public declare other: number;
}
