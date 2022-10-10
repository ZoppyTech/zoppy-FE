import { MatrixRFMResponse } from './matrix-rfm.response';

export class ReportCustomerResponse {
    public declare name: string;
    public declare email: string;
    public declare phone: string;
    public declare phoneMasked: string;
    public matrixRFM?: MatrixRFMResponse = new MatrixRFMResponse();
}
