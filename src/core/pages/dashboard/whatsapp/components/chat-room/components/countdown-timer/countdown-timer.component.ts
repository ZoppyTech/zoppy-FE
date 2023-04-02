import { AfterViewInit, Component, Input, OnDestroy, OnInit } from '@angular/core';

@Component({
    selector: 'countdown-timer',
    templateUrl: './countdown-timer.component.html',
    styleUrls: ['./countdown-timer.component.scss']
})
export class CountdownTimerComponent implements OnInit, AfterViewInit, OnDestroy {
    @Input() public timestamp: string | null = null;
    public targetTime: Date = new Date();
    public difference: number = 0;

    public hours: string = '00';
    public minutes: string = '00';
    public seconds: string = '00';

    public timerInterval: any = null;

    public ngOnInit(): void {
        if (!this.timestamp) this.timestamp = '0';
        this.targetTime = new Date(Number.parseInt(this.timestamp));
    }

    public ngAfterViewInit() {
        this.timerInterval = setInterval(() => {
            this.difference = this.targetTime.getTime() - Date.now();
            if (this.difference <= 0) {
                clearInterval(this.timerInterval);
                return;
            }
            this.tickTock();
        }, 1000);
    }

    public tickTock() {
        const interval: Date = new Date(this.targetTime.getTime() - Date.now());
        this.hours = (interval.getHours() + '').padStart(2, '0');
        this.minutes = (interval.getMinutes() + '').padStart(2, '0');
        this.seconds = (interval.getSeconds() + '').padStart(2, '0');
    }

    public ngOnDestroy(): void {
        clearInterval(this.timerInterval);
    }
}
