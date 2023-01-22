import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
    selector: 'congratulations',
    templateUrl: './congratulations.component.html',
    styleUrls: ['./congratulations.component.scss']
})
export class CongratulationsComponent {
    public readonly CONGRATULATIONS_IMAGE_DIR: string = './../../../../../assets/imgs/nps-congratulations.png';
    public constructor() {}

    public ngOnInit(): void {
        console.log('init');
    }
}
