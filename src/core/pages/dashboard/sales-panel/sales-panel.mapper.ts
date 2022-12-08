import { MatrixRfmConstants } from 'src/shared/constants/matrix-rfm.constants';
import { TaskConstants } from 'src/shared/constants/task.constants';
import { TaskEntity } from 'src/shared/models/entities/task.entity';
import { SalesPanelRequest } from 'src/shared/models/requests/social-media/sales-panel.request';
import { SocialMediaMatrixRfmResponse } from 'src/shared/models/responses/social-media/social-media-matrix-rfm.response';
import { TaskView } from 'src/shared/models/responses/social-media/social-media-sales-panel.response';
import { DateUtil } from 'src/shared/utils/date.util';
import { MatrixRfmUtil } from 'src/shared/utils/matrix-rfm.util';
import { Navigation } from 'src/shared/utils/navigation';

export class SalesPanelMapper {
    public static mapDays(tasks: TaskEntity[], filter: SalesPanelRequest): Day[] {
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
            day.isToday = day.date.getDate() === new Date().getDate();
            return day;
        });
        return days;
    }

    public static mapRfm(items: SocialMediaMatrixRfmResponse[]): Rfm[] {
        const response: Rfm[] = [];
        for (const state in MatrixRfmConstants.STATE) {
            response.push({
                title: MatrixRfmUtil.getLabel(MatrixRfmConstants.STATE[state]),
                users: items.filter((item: SocialMediaMatrixRfmResponse) => item.matrixRFM?.position === MatrixRfmConstants.STATE[state])
            });
        }
        return response;
    }

    private static filterTasks(tasks: TaskEntity[], date: Date): TaskView[] {
        const taskResponses: TaskView[] = tasks.filter((task: TaskEntity) => {
            return task.scheduledDate.getDate() === date.getDate() && task.scheduledDate.getMonth() === date.getMonth();
        }) as TaskView[];

        taskResponses.forEach((taskResponse: TaskView) => {
            taskResponse.route = `${Navigation.routes.customerSocialMedia}/${taskResponse.customer.id}`;
            taskResponse.concluded = taskResponse.status === TaskConstants.STATUS.SUCCESS;
        });
        return taskResponses;
    }
}

export interface Day {
    date: Date;
    dayName: string;
    isToday: boolean;
    tasks: TaskView[];
}

export interface Rfm {
    title: string;
    users: SocialMediaMatrixRfmResponse[];
}
