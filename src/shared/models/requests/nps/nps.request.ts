export interface NpsRequest {
    id?: string;
    total?: number;
    commentary?: string;
    supportGrade?: number;
    productGrade?: number;
    recommendationGrade?: number;
    answered?: boolean;
    accessToken?: string;
    customerId?: string;
    sellerId?: string;
    sentAt?: Date;
}
