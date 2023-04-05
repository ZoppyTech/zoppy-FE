import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class ModalService {
    public data: any = {};
    public isOpen: boolean = false;
    public name: string = '';
    public identifiers: Record<ModalId, string> = Modal.IDENTIFIER;
    public callback: any = null;

    public constructor() {
        console.log('instantiate');
    }

    public open(name: string, data: any, callback: any = null): void {
        this.isOpen = true;
        this.name = name;
        this.data = data;
        this.callback = callback;
    }

    public close(executeCallback: boolean = false, callbackResponse?: any): void {
        if (this.callback && executeCallback) this.callback(callbackResponse);
        this.callback = null;
        this.isOpen = false;
        this.name = '';
        this.data = {};
    }
}

export class Modal {
    public static IDENTIFIER: Record<ModalId, string> = {
        INFO: 'info',
        CHAT_CONTACT: 'chat_contact',
        INPUT_INFO: 'input_info',
        SALES_PANEL_CONTACT: 'sales_panel_contact',
        NEW_TASK: 'new_task',
        MESSAGE_CONFIG_PARAMS: 'message_config_params',
        MEDIA_VIEWER_MODAL: 'media_viewer_modal',
        UPLOAD_IMAGE_MEDIA_PREVIEW_MODAL: 'upload_image_media_preview_modal',
        UPLOAD_DOCUMENT_MEDIA_PREVIEW_MODAL: 'upload_document_media_preview_modal',
        CHAT_CONVERSATION_TRANSFER_MODAL: 'chat_conversation_transfer_modal'
    };
}

export type ModalId =
    | 'INFO'
    | 'CHAT_CONTACT'
    | 'INPUT_INFO'
    | 'SALES_PANEL_CONTACT'
    | 'NEW_TASK'
    | 'MESSAGE_CONFIG_PARAMS'
    | 'MEDIA_VIEWER_MODAL'
    | 'UPLOAD_IMAGE_MEDIA_PREVIEW_MODAL'
    | 'UPLOAD_DOCUMENT_MEDIA_PREVIEW_MODAL'
    | 'CHAT_CONVERSATION_TRANSFER_MODAL';
