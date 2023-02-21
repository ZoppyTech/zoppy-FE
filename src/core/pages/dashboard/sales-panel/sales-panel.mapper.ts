import { DateUtil } from '@ZoppyTech/utilities';
import { TaskEntity } from 'src/shared/models/entities/task.entity';
import { SalesPanelRequest } from 'src/shared/models/requests/social-media/sales-panel.request';
import { TaskView } from 'src/shared/models/responses/social-media/social-media-sales-panel.response';
import { Navigation } from 'src/shared/utils/navigation';
import { TaskUtil } from 'src/shared/utils/task.util';

export class SalesPanelMapper {
    public static mapDays(tasks: TaskEntity[], filter: SalesPanelRequest, isMobile: boolean): Day[] {
        let days: Day[] = [
            {
                date: filter.minDate,
                dayName: DateUtil.getDayName(filter.minDate.getDay()),
                tasks: this.filterTasks(tasks, filter.minDate),
                isToday: false
            },
            {
                date: DateUtil.addDays(filter.minDate, 1),
                dayName: DateUtil.getDayName(DateUtil.addDays(filter.minDate, 1).getDay()),
                tasks: this.filterTasks(tasks, DateUtil.addDays(filter.minDate, 1)),
                isToday: false
            },
            {
                date: DateUtil.addDays(filter.minDate, 2),
                dayName: DateUtil.getDayName(DateUtil.addDays(filter.minDate, 2).getDay()),
                tasks: this.filterTasks(tasks, DateUtil.addDays(filter.minDate, 2)),
                isToday: false
            },
            {
                date: DateUtil.addDays(filter.minDate, 3),
                dayName: DateUtil.getDayName(DateUtil.addDays(filter.minDate, 3).getDay()),
                tasks: this.filterTasks(tasks, DateUtil.addDays(filter.minDate, 3)),
                isToday: false
            },
            {
                date: DateUtil.addDays(filter.minDate, 4),
                dayName: DateUtil.getDayName(DateUtil.addDays(filter.minDate, 4).getDay()),
                tasks: this.filterTasks(tasks, DateUtil.addDays(filter.minDate, 4)),
                isToday: false
            },
            {
                date: DateUtil.addDays(filter.minDate, 5),
                dayName: DateUtil.getDayName(DateUtil.addDays(filter.minDate, 5).getDay()),
                tasks: this.filterTasks(tasks, DateUtil.addDays(filter.minDate, 5)),
                isToday: false
            },
            {
                date: DateUtil.addDays(filter.minDate, 6),
                dayName: DateUtil.getDayName(DateUtil.addDays(filter.minDate, 6).getDay()),
                tasks: this.filterTasks(tasks, DateUtil.addDays(filter.minDate, 6)),
                isToday: false
            }
        ];
        days = days.map((day: Day) => {
            day.date.setHours(0, 0, 0, 0);
            const today: Date = new Date();
            today.setHours(0, 0, 0, 0);
            day.isToday = day.date.toDateString() === today.toDateString();
            if (isMobile) day.isSelected = day.date.toDateString() === filter.minDate.toDateString();
            return day;
        });
        return days;
    }

    private static filterTasks(tasks: TaskEntity[], date: Date): TaskView[] {
        const taskResponses: TaskView[] = tasks.filter((task: TaskEntity) => {
            return task.scheduledDate.getDate() === date.getDate() && task.scheduledDate.getMonth() === date.getMonth();
        }) as TaskView[];

        taskResponses.forEach((taskResponse: TaskView) => {
            taskResponse.route = `${Navigation.routes.customerSocialMedia}/${taskResponse.customer.id}`;
            taskResponse.concluded = TaskUtil.getTaskIsConcluded(taskResponse);
        });
        return taskResponses;
    }
}

export interface Day {
    date: Date;
    dayName: string;
    isToday: boolean;
    isSelected?: boolean;
    tasks: TaskView[];
}
