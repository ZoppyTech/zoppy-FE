import { MessageConfigConstants, MessageConfigTemplate } from '../constants/message-config.constants';
import { TaskConstants, TaskContactTypes, TaskStatus, TaskTypes } from '../constants/task.constants';
import { TaskEntity } from '../models/entities/task.entity';

export class TaskUtil {
    public static getTypeLabel(type: TaskTypes): string {
        switch (type) {
            case TaskConstants.TYPES.OBSERVATION:
                return 'Observação';
            case TaskConstants.TYPES.SALE:
                return 'Contato';
            case TaskConstants.TYPES.TASK:
                return 'Tarefa';
            case TaskConstants.TYPES.BIRTHDAY:
                return 'Aniversário';
            case TaskConstants.TYPES.AFTER_SALE:
                return 'Pós venda';
            case TaskConstants.TYPES.CANT_LOSE:
                return 'Reaquecimento';
            default:
                return 'Nenhum';
        }
    }

    public static getContactTypeLabel(type: TaskContactTypes): string {
        switch (type) {
            case TaskConstants.CONTACT_TYPES.CALL:
                return 'Contato via ligação';
            case TaskConstants.CONTACT_TYPES.WHATSAPP:
                return 'Contato via whatsapp';
            case TaskConstants.CONTACT_TYPES.STORE:
                return 'Visita na loja';
            case TaskConstants.CONTACT_TYPES.OTHER:
                return 'Outro';
            default:
                return 'Nenhum';
        }
    }

    public static getStatusLabel(status: TaskStatus): string {
        switch (status) {
            case TaskConstants.STATUS.NEGATIVE:
                return 'icon-mood_bad';
            case TaskConstants.STATUS.WARN:
                return 'icon-sentiment_neutral';
            case TaskConstants.STATUS.SUCCESS:
                return 'icon-mood';
        }
        return '';
    }

    public static getTaskIsConcluded(task: TaskEntity): boolean {
        return task.status === TaskConstants.STATUS.SUCCESS || !!task.contactType;
    }

    public static getMessageTemplate(type: TaskTypes): MessageConfigTemplate {
        switch (type) {
            case TaskConstants.TYPES.BIRTHDAY:
                return MessageConfigConstants.BIRTHDAY_MESSAGE as MessageConfigTemplate;
            case TaskConstants.TYPES.CANT_LOSE:
                return MessageConfigConstants.AFTER_SALE_MESSAGE as MessageConfigTemplate;
            default:
                return MessageConfigConstants.AFTER_SALE_MESSAGE as MessageConfigTemplate;
        }
    }
}
