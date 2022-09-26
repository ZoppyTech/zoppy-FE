export class WhatsappConstants {
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

    public static MessageTemplates = {
        GREETINGS_TO_USER: 'greetings_to_user',
        SEND_GIFTBACK: 'send_giftback',
        WELCOME_TO_THE_COMPANY: 'welcome_to_the_company',
        OUT_OF_BUSINESS_HOURS: 'out_of_business_hours',
        WAITING_A_FEW_MINUTES: 'waiting_a_few_minutes',
        SAMPLE_ISSUE_RESOLUTION: 'issue_resolution'
    };
}
