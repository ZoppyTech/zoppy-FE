import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
import { PublicService } from 'src/shared/services/public/public.service';

@Component({
    selector: 'app-blacklist',
    templateUrl: './blacklist.component.html',
    styleUrls: ['./blacklist.component.scss']
})
export class BlacklistComponent implements OnInit {
    public email: string = '';

    public constructor(private readonly publicService: PublicService, private readonly route: ActivatedRoute) {}

    public ngOnInit() {
        this.route.paramMap.subscribe(async (paramMap: any) => {
            this.email = paramMap.get('email');
            await this.publicService.blacklist(this.email);
        });
    }

    public goTo(state: string): void {
        switch (state) {
            case 'whatsapp':
                window.open(environment.support);
                break;
            case 'linkedin':
                window.open('https://www.linkedin.com/company/zoppytech');
                break;
            case 'instagram':
                window.open('https://www.instagram.com/zoppytech/');
                break;
        }
    }
}
