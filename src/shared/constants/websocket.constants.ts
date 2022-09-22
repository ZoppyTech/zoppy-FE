export class WebSocketConstants {
    public static CHAT_EVENTS = {
        CREATE: 'CREATE_MESSAGE',
        UPDATE: 'UPDATE_MESSAGE',
        RECEIVE: 'RECEIVE_MESSAGE',
        DELETE: 'DELETE_MESSAGE',
        GET_ALL: 'GET_ALL_MESSAGE'
    };

    public static CHAT_ACTIONS = {
        CREATE: 'create',
        UPDATE: 'update',
        RECEIVE: 'receive'
    };
}
