import { TaskEntity } from 'src/shared/models/entities/task.entity';
import { SalesPanelRequest } from 'src/shared/models/requests/social-media/sales-panel.request';
import { DateUtil } from 'src/shared/utils/date.util';

export class SalesPanelMapper {
    public static mapDays(tasks: TaskEntity[], filter: SalesPanelRequest): Day[] {
        const days: Day[] = [
            {
                date: filter.minDate,
                dayName: DateUtil.getDayName(filter.minDate.getDay()),
                tasks: this.filterTasks(tasks, filter.minDate)
            },
            {
                date: DateUtil.addDays(filter.minDate, 1),
                dayName: DateUtil.getDayName(DateUtil.addDays(filter.minDate, 1).getDay()),
                tasks: this.filterTasks(tasks, DateUtil.addDays(filter.minDate, 1))
            },
            {
                date: DateUtil.addDays(filter.minDate, 2),
                dayName: DateUtil.getDayName(DateUtil.addDays(filter.minDate, 2).getDay()),
                tasks: this.filterTasks(tasks, DateUtil.addDays(filter.minDate, 2))
            },
            {
                date: DateUtil.addDays(filter.minDate, 3),
                dayName: DateUtil.getDayName(DateUtil.addDays(filter.minDate, 3).getDay()),
                tasks: this.filterTasks(tasks, DateUtil.addDays(filter.minDate, 3))
            },
            {
                date: DateUtil.addDays(filter.minDate, 4),
                dayName: DateUtil.getDayName(DateUtil.addDays(filter.minDate, 4).getDay()),
                tasks: this.filterTasks(tasks, DateUtil.addDays(filter.minDate, 4))
            },
            {
                date: DateUtil.addDays(filter.minDate, 5),
                dayName: DateUtil.getDayName(DateUtil.addDays(filter.minDate, 5).getDay()),
                tasks: this.filterTasks(tasks, DateUtil.addDays(filter.minDate, 5))
            },
            {
                date: DateUtil.addDays(filter.minDate, 6),
                dayName: DateUtil.getDayName(DateUtil.addDays(filter.minDate, 6).getDay()),
                tasks: this.filterTasks(tasks, DateUtil.addDays(filter.minDate, 6))
            }
        ];
        return days;
    }

    public static filterTasks(tasks: TaskEntity[], date: Date): TaskEntity[] {
        return tasks.filter((task: TaskEntity) => {
            return task.scheduledDate.getDate() === date.getDate() && task.scheduledDate.getMonth() === date.getMonth();
        });
    }
}

export interface Day {
    date: Date;
    dayName: string;
    tasks: TaskEntity[];
}
