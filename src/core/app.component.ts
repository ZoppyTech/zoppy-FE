import { Component, OnInit } from '@angular/core';
import { ConfirmActionService } from '@ZoppyTech/confirm-action';
import { ToastService } from '@ZoppyTech/toast';
import { Pallete, VisualIdentityService } from '@ZoppyTech/visual-identity';
import { BroadcastService } from 'src/shared/services/broadcast/broadcast.service';
import { StyleUtil } from 'src/shared/utils/style.util';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    public constructor(
        public visualIdentityService: VisualIdentityService,
        public toast: ToastService,
        public confirmAction: ConfirmActionService
    ) {}

    public ngOnInit() {
        StyleUtil.setBaseColorPallete(this.visualIdentityService);
        BroadcastService.subscribe(this, 'send-error', (err: Error) => {
            this.toast.error(err.message, err.title);
        });
        BroadcastService.subscribe(this, 'send-success', (err: Error) => {
            this.toast.success(err.message, err.title);
        });
    }
}

interface Error {
    message: string;
    title: string;
}
