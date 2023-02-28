import { EventEmitter, Injectable } from '@angular/core';
import { Subscription } from 'rxjs';

interface IEmitters {
    [globalEvent: string]: EventEmitter<any>;
}

type GlobalEventType = 'refresh-report' | 'reload-dashboard';

@Injectable({
    providedIn: 'root'
})
export class BroadcastService {
    private static emitters: IEmitters = {};
    private static listeners: { key: string; subscription: Subscription }[] = [];

    public static emit(globalEvent: GlobalEventType, parameter: any = null): void {
        const emitter: any = this.get(globalEvent);
        emitter.emit(parameter);
    }

    public static subscribe(context: any, globalEvent: GlobalEventType, callback: any): void {
        const key: any = context.constructor.name;
        const emitter: any = this.get(globalEvent);
        const subscription: any = emitter.subscribe(callback);
        this.listeners.push({ key, subscription });
    }

    public static dispose(context: any): void {
        const key: any = context.constructor.name;
        this.listeners.filter((listener: any) => listener.key === key).forEach((listener: any) => listener.subscription.unsubscribe());
    }

    private static get(globalEvent: GlobalEventType): EventEmitter<any> {
        if (!this.emitters[globalEvent]) this.emitters[globalEvent] = new EventEmitter<any>();
        return this.emitters[globalEvent];
    }
}
