import { Component, OnInit } from '@angular/core';
import { ConfirmActionService } from '@lucarrloliveira/confirm-action';
import { ToastService } from '@lucarrloliveira/toast';
import { Pallete, VisualIdentityService } from '@lucarrloliveira/visual-identity';
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
    }
}
