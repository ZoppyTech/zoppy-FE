export class WhatsappConstants {
    public static TEMPLATE_PARAMETERS_REGEX: RegExp = new RegExp('({{[0-9]+}})+', 'gmi');

    public static ACCOUNT_SCENARIO = {
        IDLE: 'idle',
        ACQUISITION: 'acquisition',
        VALIDATION: 'validation',
        INTEGRATED: 'integrated',
        REVOKED: 'revoked'
    };

    public static ToastTitles = {
        Error: 'Whatsapp Erro!',
        Success: 'Sucesso!'
    };

    public static ToastMessages = {
        ContactsSyncSuccessfully: 'Contatos sincronizados!'
    };

    public static MessageStatus = {
        Deleted: 'deleted',
        Delivered: 'delivered',
        Failed: 'failed',
        Read: 'read',
        Sent: 'sent',
        Warning: 'warning'
    };

    public static MessageType = {
        Text: 'text',
        Template: 'template'
    };

    public static MessageOrigin = {
        BusinessInitiated: 'business_initiated',
        UserInitiated: 'user_initiated'
    };

    public static BUSINESS_PHONE_PERMISSIONS = {
        ALL: '*',
        ONLY_SEND: 'ONLY_SEND',
        ONLY_RECEIVE: 'ONLY_RECEIVE'
    };

    public static MESSAGE_TEMPLATES_VISIBILITY = {
        ALL: '*',
        SYSTEM: 'SYSTEM',
        USER: 'USER'
    };

    public static MessageTemplates = {
        GREETINGS_TO_USER: 'greetings_to_user',
        WELCOME_TO_THE_COMPANY: 'welcome_to_the_company',
        OUT_OF_BUSINESS_HOURS: 'out_of_business_hours',
        WAITING_A_FEW_MINUTES: 'waiting_a_few_minutes',
        ISSUE_RESOLUTION: 'issue_resolution',
        GIFTBACK_SEND: 'giftback_send',
        GIFTBACK_MISSED_REMINDER: 'giftback_missed_reminder',
        GIFTBACK_MISSED_CLOSE_REMINDER: 'giftback_missed_close_reminder',
        NEW_CONTACT_PHONE_NUMBER_TO_ASK_QUESTIONS: 'new_contact_phone_number_to_ask_questions',
        GDPR_TERMS_NOTIFICATION: 'gdpr_terms_notification'
    };
}
