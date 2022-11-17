export class CrmProductResponse {
    public declare id: string;
    public declare name: string;
    public declare wcId: number;
    public declare type: string;
    public declare status: string;
    public declare price: number;
    public declare quantity: number;
    public declare categories: any[];
    public declare createdAt: Date;
    public declare updatedAt: Date;
    public declare deletedAt: Date;
    public declare categoriesFormatted: string;
    public declare priceCurrency: string;
}
