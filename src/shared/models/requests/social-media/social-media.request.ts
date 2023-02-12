import { TaskTypes, TaskContactTypes, TaskStatus } from '@ZoppyTech/utilities';

export class SocialMediaRequest {
    public declare taskType?: TaskTypes;
    public declare contactType?: TaskContactTypes;
    public declare description?: string;
    public declare status?: TaskStatus;
    public declare scheduledDate?: Date;
}
