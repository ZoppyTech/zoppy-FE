import { TaskTypes } from '../constants/task.constants';

export class TaskUtil {
    public static getTypeLabel(type: TaskTypes): string {
        switch (type) {
            case 'observation':
                return 'Observação';
            case 'sale':
                return 'Venda';
            case 'task':
                return 'Tarefa';
            default:
                return 'Nenhum';
        }
    }
}
