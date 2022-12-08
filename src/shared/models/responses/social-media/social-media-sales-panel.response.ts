import { TaskEntity } from '../../entities/task.entity';
import { SocialMediaMatrixRfmResponse } from './social-media-matrix-rfm.response';

export class SocialMediaSalesPanelResponse {
    public declare tasks: TaskView[];
    public declare rfm: SocialMediaMatrixRfmResponse[];
}

export interface TaskView extends TaskEntity {
    route: string;
    concluded: boolean;
    loading: boolean;
}
