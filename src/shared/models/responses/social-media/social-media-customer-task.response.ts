import { FormGroup } from '@angular/forms';
import { TaskContactTypes, TaskStatus, TaskTypes } from '@ZoppyTech/utilities';

export interface SocialMediaCustomerTaskResponse {
    userName: string;
    taskId?: string;
    wcOrderId?: string;
    type: TaskTypes;
    contactType?: TaskContactTypes;
    description?: string;
    status?: TaskStatus;
    createdAt: Date;
    order?: SocialMediaCustomerOrderResponse;
    npsRating?: WcNpsResponse;
}

export interface SocialMediaCustomerOrderResponse {
    total: number;
    wcCouponCode: string;
    products?: SocialMediaCustomerProductResponse[];
}

export interface SocialMediaCustomerProductResponse {
    name: string;
    quantity: number;
    price: string;
    specification: string;
    usedGiftback: boolean;
    isCrm: string;
}

export interface WcNpsResponse {
    id: number;
    total: number;
    commentary: string;
    supportGrade: number;
    productGrade: number;
    recommendationGrade: number;
    answered: boolean;
    customerId: string;
    sellerId: string;
    createdAt: Date;
    updatedAt: Date;
    formStarSupport: FormGroup;
    formStarProduct: FormGroup;
}
