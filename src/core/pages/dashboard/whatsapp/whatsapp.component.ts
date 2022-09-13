import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-whatsapp',
    templateUrl: './whatsapp.component.html',
    styleUrls: ['./whatsapp.component.scss']
})
export class WhatsappComponent implements OnInit {
    public constructor() {
        //no content
    }

    public ngOnInit(): void {
        console.log('init');
    }
}
