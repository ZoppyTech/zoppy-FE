import { MatrixRFMResponse } from './matrix-rfm.response';

export class ReportCustomerResponse {
    public declare id: string;
    public declare name: string;
    public declare email: string;
    public declare phone: string;
    public declare phoneMasked: string;
    public declare age: number;
    public declare gender: string;
    public declare city: string;
    public declare postcode: string;
    public declare state: string;
    public lat?: number;
    public lng?: number;
    public declare avgTicket: number;
    public declare lastPurchaseDate: Date;
    public matrixRFM?: MatrixRFMResponse = new MatrixRFMResponse();
}
