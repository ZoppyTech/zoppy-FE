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

    public close(executeCallback: boolean = false): void {
        if (this.callback && executeCallback) this.callback();
        this.callback = null;
        this.isOpen = false;
        this.name = '';
        this.data = {};
    }
}

export class Modal {
    public static IDENTIFIER: Record<ModalId, string> = {
        INFO: 'info'
    };
}

export type ModalId = 'INFO';
