import { AfterViewInit, Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'countdown-timer',
    templateUrl: './countdown-timer.component.html',
    styleUrls: ['./countdown-timer.component.scss']
})
export class CountdownTimerComponent implements OnInit {
    @Input() public timestamp: string = '0';
    public date: any;
    public now: any;
    //public targetDate: any = Date.now();
    public targetTime: any = Date.now();
    public difference: number = 0;

    public hours: number = 0;
    public minutes: number = 0;
    public seconds: number = 0;

    public timerInterval: any = null;

    public ngOnInit(): void {
        debugger;
        const timestamp: number = Number.parseInt(this.timestamp + '000');
        this.targetTime = new Date(timestamp);
    }

    public ngAfterViewInit() {
        this.timerInterval = setInterval(() => {
            debugger;
            this.tickTock();
            // this.difference = this.targetTime - this.now;
            // this.difference = this.difference / (1000 * 60 * 60 * 24);
            this.difference = this.targetTime - Date.now();
            if (this.difference <= 0) {
                clearInterval(this.timerInterval);
            }
        }, 1000);
    }

    public tickTock() {
        debugger;
        this.date = new Date();
        this.now = this.date.getTime();
        this.hours = 23 - this.date.getHours();
        this.minutes = 60 - this.date.getMinutes();
        this.seconds = 60 - this.date.getSeconds();
    }
}
