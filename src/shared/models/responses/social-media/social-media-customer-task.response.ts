import { TaskContactTypes, TaskStatus, TaskTypes } from 'src/shared/constants/task.constants';

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
}

export interface SocialMediaCustomerOrderResponse {
    total: number;
    wcCouponCode: string;
    products?: SocialMEdiaCustomerProductResponse[];
}

export interface SocialMEdiaCustomerProductResponse {
    name: string;
    quantity: number;
    price: string;
    specification: string;
    usedGiftback: boolean;
    isCrm: string;
}
