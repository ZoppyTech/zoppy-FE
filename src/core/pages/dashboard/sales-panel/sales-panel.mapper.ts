import { DateUtil, StringUtil, TaskConstants } from '@ZoppyTech/utilities';
import { TaskEntity } from 'src/shared/models/entities/task.entity';
import { SalesPanelRequest } from 'src/shared/models/requests/social-media/sales-panel.request';
import { TaskView } from 'src/shared/models/responses/social-media/social-media-sales-panel.response';
import { Navigation } from 'src/shared/utils/navigation';
import { TaskUtil } from 'src/shared/utils/task.util';

export class SalesPanelMapper {
    public static mapDays(filter: SalesPanelRequest, isMobile: boolean): Day[] {
        let days: Day[] = isMobile
            ? [
                  {
                      date: filter.minDate,
                      dayName: DateUtil.getDayName(filter.minDate.getDay()),
                      filter: { ...filter, minDate: filter.minDate, maxDate: filter.minDate },
                      isToday: false,
                      loading: false,
                      id: StringUtil.generateUuid()
                  }
              ]
            : [
                  {
                      date: filter.minDate,
                      dayName: DateUtil.getDayName(filter.minDate.getDay()),
                      filter: { ...filter, minDate: filter.minDate, maxDate: filter.minDate },
                      isToday: false,
                      loading: false,
                      id: StringUtil.generateUuid()
                  },
                  {
                      date: DateUtil.addDays(filter.minDate, 1),
                      dayName: DateUtil.getDayName(DateUtil.addDays(filter.minDate, 1).getDay()),
                      filter: { ...filter, minDate: DateUtil.addDays(filter.minDate, 1), maxDate: DateUtil.addDays(filter.minDate, 1) },
                      isToday: false,
                      loading: false,
                      id: StringUtil.generateUuid()
                  },
                  {
                      date: DateUtil.addDays(filter.minDate, 2),
                      dayName: DateUtil.getDayName(DateUtil.addDays(filter.minDate, 2).getDay()),
                      filter: { ...filter, minDate: DateUtil.addDays(filter.minDate, 2), maxDate: DateUtil.addDays(filter.minDate, 2) },
                      isToday: false,
                      loading: false,
                      id: StringUtil.generateUuid()
                  },
                  {
                      date: DateUtil.addDays(filter.minDate, 3),
                      dayName: DateUtil.getDayName(DateUtil.addDays(filter.minDate, 3).getDay()),
                      filter: { ...filter, minDate: DateUtil.addDays(filter.minDate, 3), maxDate: DateUtil.addDays(filter.minDate, 3) },
                      isToday: false,
                      loading: false,
                      id: StringUtil.generateUuid()
                  },
                  {
                      date: DateUtil.addDays(filter.minDate, 4),
                      dayName: DateUtil.getDayName(DateUtil.addDays(filter.minDate, 4).getDay()),
                      filter: { ...filter, minDate: DateUtil.addDays(filter.minDate, 4), maxDate: DateUtil.addDays(filter.minDate, 4) },
                      isToday: false,
                      loading: false,
                      id: StringUtil.generateUuid()
                  },
                  {
                      date: DateUtil.addDays(filter.minDate, 5),
                      dayName: DateUtil.getDayName(DateUtil.addDays(filter.minDate, 5).getDay()),
                      filter: { ...filter, minDate: DateUtil.addDays(filter.minDate, 5), maxDate: DateUtil.addDays(filter.minDate, 5) },
                      isToday: false,
                      loading: false,
                      id: StringUtil.generateUuid()
                  },
                  {
                      date: DateUtil.addDays(filter.minDate, 6),
                      dayName: DateUtil.getDayName(DateUtil.addDays(filter.minDate, 6).getDay()),
                      filter: { ...filter, minDate: DateUtil.addDays(filter.minDate, 6), maxDate: DateUtil.addDays(filter.minDate, 6) },
                      isToday: false,
                      loading: false,
                      id: StringUtil.generateUuid()
                  }
              ];
        days = days.map((day: Day) => {
            day.date.setHours(0, 0, 0, 0);
            const today: Date = new Date();
            today.setHours(0, 0, 0, 0);
            day.isToday = day.date.toDateString() === today.toDateString();
            return day;
        });
        return days;
    }

    public static mapTask(task: TaskView): TaskView {
        task.route = `${Navigation.routes.customerSocialMedia}/${task.customer.id}`;
        task.concluded = TaskUtil.getTaskIsConcluded(task);
        task.success = task.status === TaskConstants.STATUS.SUCCESS;
        return task;
    }
}

export interface Day {
    date: Date;
    dayName: string;
    id: string;
    isToday: boolean;
    isSelected?: boolean;
    filter: SalesPanelRequest;
    loading: boolean;
}
