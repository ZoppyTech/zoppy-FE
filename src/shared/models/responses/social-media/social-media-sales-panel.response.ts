import { TaskEntity } from '../../entities/task.entity';

export class SocialMediaSalesPanelResponse {
    public declare tasks: TaskView[];
}

export interface TaskView extends TaskEntity {
    route: string;
    concluded: boolean;
    loading: boolean;
    loadingWpp?: boolean;
    success: boolean;
}
