import { TaskContactTypes, TaskStatus, TaskTypes } from 'src/shared/constants/task.constants';
import { WcCustomerEntity } from './wc-customer.entity';

export class TaskEntity {
    public declare id: string;
    public declare type: TaskTypes;
    public declare contactType: TaskContactTypes;
    public declare description: string;
    public declare status: TaskStatus;
    public declare scheduledDate: Date;
    public declare createdAt: Date;
    public declare updatedAt: Date;
    public declare deletedAt: Date;
    public declare companyId: string;
    public declare orderId: string;
    public declare userId: string;
    public declare customerId: string;
    public declare customer: WcCustomerEntity;
}
