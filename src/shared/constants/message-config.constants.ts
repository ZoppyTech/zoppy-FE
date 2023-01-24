export class MessageConfigConstants {
    public static CANT_LOSE_CLIENT_MESSAGE = 'CANT_LOSE_CLIENT_MESSAGE';
    public static AFTER_SALE_MESSAGE = 'AFTER_SALE_MESSAGE';
    public static BIRTHDAY_MESSAGE = 'BIRTHDAY_MESSAGE';
    public static BIRTHDAY_MONTH_MESSAGE = 'BIRTHDAY_MONTH_MESSAGE';
    public static NPS_RATING_MESSAGE = 'NPS_RATING_MESSAGE';
}

export type MessageConfigTemplate =
    | 'CANT_LOSE_CLIENT_MESSAGE'
    | 'AFTER_SALE_MESSAGE'
    | 'BIRTHDAY_MESSAGE'
    | 'BIRTHDAY_MONTH_MESSAGE'
    | 'NPS_RATING_MESSAGE';
