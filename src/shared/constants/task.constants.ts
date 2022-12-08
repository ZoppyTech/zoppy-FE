export class TaskConstants {
    public static TYPES: any = {
        OBSERVATION: 'observation',
        SALE: 'sale',
        TASK: 'task',
        BIRTHDAY: 'birthday',
        AFTER_SALE: 'after_sale',
        CANT_LOSE: 'cant_lose'
    };

    public static CONTACT_TYPES: any = {
        CALL: 'call',
        WHATSAPP: 'whatsapp',
        STORE: 'store',
        OTHER: 'other'
    };

    public static STATUS: any = {
        SUCCESS: 'success',
        WARN: 'warn',
        NEGATIVE: 'negative'
    };
}

export type TaskTypes = 'observation' | 'sale' | 'task' | 'birthday' | 'after_sale' | 'cant_lose';
export type TaskContactTypes = 'call' | 'whatsapp' | 'store' | 'other';
export type TaskStatus = 'success' | 'warn' | 'negative';
