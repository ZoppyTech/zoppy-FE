import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'static-loading',
    templateUrl: './static-loading.component.html',
    styleUrls: ['./static-loading.component.scss']
})
export class StaticLoadingComponent implements OnInit {
    @Input() public label: string = 'Carregando...';
    @Input() public isLoading: boolean = false;
    @Input() public style: StaticLoading = StaticLoading.Dark;
    @Input() public onlyLoading: boolean = false;
    public selectedLoading: string = '';
    private darkLoading: string = `https://zoppy-public-dev.s3.amazonaws.com/imgs/loading.svg`;
    private lightLoading: string = `https://zoppy-public-dev.s3.amazonaws.com/imgs/loading-white.svg`;

    public constructor() {
        this.setStyle();
    }

    public ngOnInit(): void {
        console.log('init');
    }

    private setStyle(): void {
        if (this.style === StaticLoading.Dark) {
            this.selectedLoading = this.darkLoading;
            return;
        }
        this.selectedLoading = this.lightLoading;
    }
}

export enum StaticLoading {
    Dark = 'dark',
    Light = 'light'
}
