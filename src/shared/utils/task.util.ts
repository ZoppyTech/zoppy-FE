import { TaskConstants, TaskContactTypes, TaskStatus, TaskTypes } from '../constants/task.constants';

export class TaskUtil {
    public static getTypeLabel(type: TaskTypes): string {
        switch (type) {
            case TaskConstants.TYPES.OBSERVATION:
                return 'Observação';
            case TaskConstants.TYPES.SALE:
                return 'Venda';
            case TaskConstants.TYPES.TASK:
                return 'Tarefa';
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
}
