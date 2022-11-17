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
        INPUT_INFO: 'input_info'
    };
}

export type ModalId = 'INFO' | 'CHAT_CONTACT' | 'INPUT_INFO';
