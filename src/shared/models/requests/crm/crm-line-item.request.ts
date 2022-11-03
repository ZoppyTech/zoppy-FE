export interface CrmLineItemRequest {
    id?: string;
    quantity: number;
    wcProductId: number;
    wcOrderId: number;
    orderId: string;
    productId: string;
    name: string;
}
