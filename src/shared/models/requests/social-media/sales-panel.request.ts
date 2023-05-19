import { TaskEntity } from '../../entities/task.entity';
import { ZoppyFilter } from '../../filter';
import { TaskView } from '../../responses/social-media/social-media-sales-panel.response';

export class SalesPanelRequest extends ZoppyFilter<TaskView> {
    public declare minDate: Date;
    public declare maxDate: Date;
}
