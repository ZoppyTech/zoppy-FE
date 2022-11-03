export class WcOrderEntityEntity {
    public declare id: string;
    public declare wcId: number;
    public declare wcCustomerId: number;
    public declare wcCouponCode: string;
    public declare completedAt: Date;
    public declare status: string;
    public declare total: number;
    public declare isCrm: boolean;
    public declare totalLineItemsQuantity: number;
    public declare totalDiscount: number;
    public declare createdAt: Date;
    public declare updatedAt: Date;
    public declare deletedAt: Date;
    public declare companyId: string;
    public declare billingId: string;
    public declare userId: string;
}
