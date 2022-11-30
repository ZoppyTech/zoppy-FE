import { TaskContactTypes, TaskStatus, TaskTypes } from 'src/shared/constants/task.constants';

export class SocialMediaRequest {
    public declare taskType?: TaskTypes;
    public declare contactType?: TaskContactTypes;
    public declare description?: string;
    public declare status: TaskStatus;
}
